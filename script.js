// ESTADO GLOBAL DA APLICAÇÃO
let currentUser = "";
let teams = JSON.parse(localStorage.getItem('stars_teams')) || [];
let players = JSON.parse(localStorage.getItem('stars_players')) || [];
let logs = JSON.parse(localStorage.getItem('stars_logs')) || [];

let editingTeamId = null;
let editingPlayerId = null;

let matchState = {
    running: false,
    timer: null,
    time: 0,
    homeTeam: null,
    awayTeam: null,
    scoreHome: 0,
    scoreAway: 0,
    homeSubsLeft: 5,
    awaySubsLeft: 5,
    homePausesLeft: 3,
    awayPausesLeft: 3,
    subTeamTarget: null
};

let draftState = {
    active: false,
    starters: [],
    bench: [],
    currentPosIndex: 0,
    positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CAM', 'ST', 'ST', 'LW']
};

const PROFANE_WORDS = ['merda', 'porra', 'caralho', 'puta', 'cu', 'bosta', 'fdp', 'pqp', 'fuck', 'shit', 'asshole'];

// INICIALIZAÇÃO
window.onload = () => {
    updateDashboardStats();
    renderTeams();
    renderPlayers();
    populateTeamDropdowns();
    renderLogs();
};

// CADASTRO OBRIGATÓRIO DE TÉCNICO & VALIDAÇÕES
function registerCoach() {
    const inputName = document.getElementById('input-coach-name').value.trim();
    const errorBox = document.getElementById('register-error');

    if (!inputName) {
        errorBox.innerText = "Por favor, insira um nome válido para o técnico.";
        errorBox.style.display = 'block';
        return;
    }

    // Verificar se contém palavras ofensivas
    const lowerName = inputName.toLowerCase();
    const hasProfanity = PROFANE_WORDS.some(word => lowerName.includes(word));
    if (hasProfanity) {
        errorBox.innerText = "🚨 Nome ofensivo não permitido! Escolha outro nome.";
        errorBox.style.display = 'block';
        return;
    }

    currentUser = inputName;
    document.getElementById('current-user-display').innerText = currentUser;
    document.getElementById('modal-register-user').classList.remove('active');
    addAuditLog(`Técnico registrado no sistema: ${currentUser}`);
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

function updateDashboardStats() {
    document.getElementById('count-teams').innerText = teams.length;
    document.getElementById('count-players').innerText = players.length;
    document.getElementById('count-matches').innerText = logs.filter(l => l.type === 'match').length;
}

function addAuditLog(msg, type='info') {
    const entry = { user: currentUser || 'Sistema', text: msg, date: new Date().toLocaleTimeString(), type };
    logs.unshift(entry);
    localStorage.setItem('stars_logs', JSON.stringify(logs));
    renderLogs();
}

function renderLogs() {
    const container = document.getElementById('audit-logs-list');
    if(!container) return;
    container.innerHTML = logs.map(l => `
        <div class="ticker-item">
            <span>📝</span>
            <div><strong>[${l.date}] ${l.user}:</strong> ${l.text}</div>
        </div>
    `).join('');
}

// UPLOAD DE IMAGEM LOCAL
function handleFileUpload(event, targetInputId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(targetInputId).value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// GERENCIAMENTO DE TIMES
function saveTeam(e) {
    e.preventDefault();
    const id = editingTeamId || Date.now().toString();
    const teamData = {
        id,
        name: document.getElementById('team-name').value,
        code: document.getElementById('team-code').value.toUpperCase(),
        logo: document.getElementById('team-logo-url').value || 'https://via.placeholder.com/100',
        formation: document.getElementById('team-formation').value,
        author: currentUser
    };

    const idx = teams.findIndex(t => t.id === id);
    if(idx >= 0) {
        teams[idx] = teamData;
        addAuditLog(`Editou o clube: ${teamData.name}`);
    } else {
        teams.push(teamData);
        addAuditLog(`Criou o clube: ${teamData.name}`);
    }

    localStorage.setItem('stars_teams', JSON.stringify(teams));
    resetTeamForm();
    renderTeams();
    populateTeamDropdowns();
    updateDashboardStats();
}

function editTeam(id) {
    const t = teams.find(item => item.id === id);
    if(!t) return;
    editingTeamId = t.id;
    document.getElementById('team-id').value = t.id;
    document.getElementById('team-name').value = t.name;
    document.getElementById('team-code').value = t.code;
    document.getElementById('team-logo-url').value = t.logo;
    document.getElementById('team-formation').value = t.formation;
    document.getElementById('team-form-title').innerText = "EDITAR CLUBE";
    document.getElementById('cancel-team-edit').style.display = 'inline-block';
}

function resetTeamForm() {
    editingTeamId = null;
    document.getElementById('form-team').reset();
    document.getElementById('team-form-title').innerText = "GERENCIAR CLUBE";
    document.getElementById('cancel-team-edit').style.display = 'none';
}

function renderTeams() {
    const grid = document.getElementById('teams-grid');
    grid.innerHTML = teams.map(t => {
        const teamPlayersCount = players.filter(p => p.teamId === t.id).length;
        return `
            <div class="pitch-card" style="text-align:center;">
                <img src="${t.logo}" style="width:60px; height:60px; object-fit:contain; margin:0 auto 0.5rem">
                <div style="font-weight:700; font-family:var(--font-sub); font-size:1.2rem">${t.name} (${t.code})</div>
                <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:0.5rem">${teamPlayersCount}/30 Atletas • ${t.formation}</div>
                <button class="btn btn-secondary" style="padding:0.3rem 0.8rem; font-size:0.85rem;" onclick="editTeam('${t.id}')">✏️ Editar</button>
            </div>
        `;
    }).join('');
}

// GERENCIAMENTO DE ATLETAS (LIMITE DE 30 POR TIME)
function savePlayer(e) {
    e.preventDefault();
    const teamId = document.getElementById('player-team-select').value;
    const currentTeamPlayers = players.filter(p => p.teamId === teamId && p.id !== editingPlayerId);
    
    if (currentTeamPlayers.length >= 30) {
        alert("🚨 Este clube já atingiu o limite máximo de 30 atletas cadastrados!");
        return;
    }

    const id = editingPlayerId || Date.now().toString();
    const playerData = {
        id,
        name: document.getElementById('player-name').value,
        teamId,
        ovr: parseInt(document.getElementById('player-ovr').value),
        pos: document.getElementById('player-pos').value,
        foot: document.getElementById('player-foot').value,
        skills: parseInt(document.getElementById('player-skills').value),
        photo: document.getElementById('player-photo-url').value || 'https://via.placeholder.com/90',
        author: currentUser
    };

    const idx = players.findIndex(p => p.id === id);
    if(idx >= 0) {
        players[idx] = playerData;
        addAuditLog(`Editou o atleta: ${playerData.name}`);
    } else {
        players.push(playerData);
        addAuditLog(`Cadastrou o atleta: ${playerData.name}`);
    }

    localStorage.setItem('stars_players', JSON.stringify(players));
    resetPlayerForm();
    renderPlayers();
    renderTeams();
    updateDashboardStats();
}

function editPlayer(id) {
    const p = players.find(item => item.id === id);
    if(!p) return;
    editingPlayerId = p.id;
    document.getElementById('player-id').value = p.id;
    document.getElementById('player-name').value = p.name;
    document.getElementById('player-team-select').value = p.teamId;
    document.getElementById('player-ovr').value = p.ovr;
    document.getElementById('player-pos').value = p.pos;
    document.getElementById('player-foot').value = p.foot || 'Direita';
    document.getElementById('player-skills').value = p.skills || 3;
    document.getElementById('player-photo-url').value = p.photo;
    document.getElementById('player-form-title').innerText = "EDITAR ATLETA";
    document.getElementById('cancel-player-edit').style.display = 'inline-block';
}

function resetPlayerForm() {
    editingPlayerId = null;
    document.getElementById('form-player').reset();
    document.getElementById('player-form-title').innerText = "CADASTRAR ATLETA";
    document.getElementById('cancel-player-edit').style.display = 'none';
}

function renderPlayers() {
    const grid = document.getElementById('players-grid');
    grid.innerHTML = players.map(p => `
        <div class="fut-card" onclick="editPlayer('${p.id}')" title="Clique para editar">
            <div class="fut-ovr">${p.ovr}</div>
            <div class="fut-pos">${p.pos}</div>
            <img src="${p.photo}" class="fut-img">
            <div class="fut-name">${p.name}</div>
        </div>
    `).join('');
}

function populateTeamDropdowns() {
    const options = teams.map(t => `<option value="${t.id}">${t.name} (${t.code})</option>`).join();
    const selPlayer = document.getElementById('player-team-select');
    const selHome = document.getElementById('select-home-team');
    const selAway = document.getElementById('select-away-team');
    
    if(selPlayer) selPlayer.innerHTML = options;
    if(selHome) selHome.innerHTML = options;
    if(selAway) selAway.innerHTML = options;
    updateMatchTeams();
}

function updateMatchTeams() {
    const hId = document.getElementById('select-home-team').value;
    const aId = document.getElementById('select-away-team').value;
    matchState.homeTeam = teams.find(t => t.id === hId);
    matchState.awayTeam = teams.find(t => t.id === aId);

    if(matchState.homeTeam) document.getElementById('match-home-logo').src = matchState.homeTeam.logo;
    if(matchState.awayTeam) document.getElementById('match-away-logo').src = matchState.awayTeam.logo;
}

// MOTOR DE SIMULAÇÃO DE PARTIDA
function toggleSimulation() {
    if(!matchState.homeTeam || !matchState.awayTeam) {
        alert("Selecione os dois times para iniciar a partida!");
        return;
    }
    if(matchState.running) return;
    matchState.running = true;
    document.getElementById('btn-start-sim').style.display = 'none';
    document.getElementById('btn-pause-sim').style.display = 'inline-flex';
    
    const speed = parseInt(document.getElementById('sim-speed').value);
    matchState.timer = setInterval(stepMatch, speed);
}

function pauseSimulation() {
    matchState.running = false;
    clearInterval(matchState.timer);
    document.getElementById('btn-start-sim').style.display = 'inline-flex';
    document.getElementById('btn-pause-sim').style.display = 'none';
}

function stepMatch() {
    matchState.time += 1;
    document.getElementById('match-time').innerText = `${String(matchState.time).padStart(2,'0')}:00`;

    // Movimentação realista no campo 2D
    const ball = document.getElementById('match-ball');
    const randX = Math.random() * 84 + 8;
    const randY = Math.random() * 80 + 10;
    ball.style.left = `${randX}%`;
    ball.style.top = `${randY}%`;

    const rand = Math.random();
    if(rand < 0.04) {
        // GOL
        const isHome = Math.random() > 0.5;
        if(isHome) matchState.scoreHome++; else matchState.scoreAway++;
        document.getElementById('score-home').innerText = matchState.scoreHome;
        document.getElementById('score-away').innerText = matchState.scoreAway;
        const teamName = isHome ? matchState.homeTeam.name : matchState.awayTeam.name;
        
        triggerGoalAnimation(teamName);
        addTicker(`⚽ GOL DO ${teamName.toUpperCase()}! (${matchState.time}')`);
    } else if(rand < 0.055) {
        // Pênalti Raro
        pauseSimulation();
        populatePenaltyTaker();
        document.getElementById('modal-penalty').classList.add('active');
    }

    if(matchState.time >= 90) {
        pauseSimulation();
        addTicker(`🏁 FIM DE JOGO! Placar Final: ${matchState.homeTeam.name} ${matchState.scoreHome} x ${matchState.scoreAway} ${matchState.awayTeam.name}`);
        addAuditLog(`Partida realizada: ${matchState.homeTeam.name} ${matchState.scoreHome} x ${matchState.scoreAway} ${matchState.awayTeam.name}`, 'match');
    }
}

function triggerGoalAnimation(teamName) {
    document.getElementById('goal-scorer-info').innerText = `Equipe: ${teamName}`;
    const overlay = document.getElementById('goal-animation-overlay');
    overlay.classList.add('active');
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 2200);
}

function addTicker(text) {
    const list = document.getElementById('match-ticker');
    list.innerHTML = `<div class="ticker-item"><span>⏱️</span> ${text}</div>` + list.innerHTML;
}

function populatePenaltyTaker() {
    const team = Math.random() > 0.5 ? matchState.homeTeam : matchState.awayTeam;
    const teamPlayers = players.filter(p => p.teamId === team.id);
    const sel = document.getElementById('penalty-taker-select');
    sel.innerHTML = teamPlayers.length > 0 
        ? teamPlayers.map(p => `<option value="${p.name}">${p.name} (OVR: ${p.ovr})</option>`).join('')
        : `<option value="Craque">Craque do Time</option>`;
}

function executePenalty() {
    document.getElementById('modal-penalty').classList.remove('active');
    const isHome = Math.random() > 0.3; // 70% de chance de converter pênalti
    if(isHome) matchState.scoreHome++; else matchState.scoreAway++;
    document.getElementById('score-home').innerText = matchState.scoreHome;
    document.getElementById('score-away').innerText = matchState.scoreAway;
    addTicker(`⚽ Pênalti cobrado com sucesso! (${matchState.time}')`);
    toggleSimulation();
}

// SISTEMA DE SUBSTITUIÇÕES CORRIGIDO
function openSubModal(teamSide) {
    if(matchState.running) {
        alert("Você precisa pausar a partida para realizar substituições!");
        return;
    }
    
    const team = teamSide === 'home' ? matchState.homeTeam : matchState.awayTeam;
    if(!team) {
        alert("Selecione os times antes!");
        return;
    }

    if(teamSide === 'home' && matchState.homePausesLeft <= 0) {
        alert("Limite de 3 pausas esgotado para o mandante!");
        return;
    }
    if(teamSide === 'away' && matchState.awayPausesLeft <= 0) {
        alert("Limite de 3 pausas esgotado para o visitante!");
        return;
    }

    if(teamSide === 'home' && matchState.homeSubsLeft <= 0) {
        alert("Limite de 5 substituições esgotado para o mandante!");
        return;
    }
    if(teamSide === 'away' && matchState.awaySubsLeft <= 0) {
        alert("Limite de 5 substituições esgotado para o visitante!");
        return;
    }

    matchState.subTeamTarget = teamSide;
    const teamPlayers = players.filter(p => p.teamId === team.id);

    document.getElementById('sub-out-select').innerHTML = teamPlayers.length > 0 
        ? teamPlayers.map(p => `<option value="${p.id}">${p.name} (${p.pos} - ${p.ovr})</option>`).join('')
        : `<option value="">Nenhum atleta cadastrado</option>`;

    document.getElementById('sub-in-select').innerHTML = teamPlayers.length > 0 
        ? teamPlayers.map(p => `<option value="${p.id}">${p.name} (${p.pos} - ${p.ovr})</option>`).join('')
        : `<option value="">Nenhum atleta cadastrado</option>`;

    document.getElementById('modal-sub').classList.add('active');
}

function closeSubModal() {
    document.getElementById('modal-sub').classList.remove('active');
}

function confirmSub() {
    if(matchState.subTeamTarget === 'home') {
        matchState.homePausesLeft--;
        matchState.homeSubsLeft--;
        document.getElementById('home-pauses-left').innerText = matchState.homePausesLeft;
        document.getElementById('home-subs-left').innerText = matchState.homeSubsLeft;
    } else {
        matchState.awayPausesLeft--;
        matchState.awaySubsLeft--;
        document.getElementById('away-pauses-left').innerText = matchState.awayPausesLeft;
        document.getElementById('away-subs-left').innerText = matchState.awaySubsLeft;
    }

    addTicker(`🔄 Substituição efetuada na equipe ${matchState.subTeamTarget === 'home' ? matchState.homeTeam.name : matchState.awayTeam.name}`);
    closeSubModal();
}

// MODO DRAFT
function startNewDraft() {
    if(players.length < 5) {
        alert("Cadastre pelo menos 5 atletas no banco de dados para iniciar o Draft!");
        return;
    }
    draftState.starters = [];
    draftState.bench = [];
    draftState.currentPosIndex = 0;
    document.getElementById('draft-tactical-pitch').innerHTML = '<div class="grass-stripes"></div>';
    document.getElementById('draft-bench-display').innerHTML = '';
    showNextDraftPick();
}

function showNextDraftPick() {
    if(draftState.currentPosIndex >= draftState.positions.length) {
        document.getElementById('draft-pick-area').innerHTML = `<h3 style="color:var(--neon-green)">Draft concluído com sucesso! Elenco pronto.</h3>`;
        return;
    }

    const targetPos = draftState.positions[draftState.currentPosIndex];
    let available = players.filter(p => p.pos === targetPos);
    if(available.length === 0) available = players; // fallback

    // Embaralhar e pegar até 5
    const options = available.sort(() => 0.5 - Math.random()).slice(0, 5);

    const container = document.getElementById('draft-pick-area');
    container.innerHTML = options.map(p => `
        <div class="fut-card" onclick="selectDraftPlayer('${p.id}', '${targetPos}')">
            <div class="fut-ovr">${p.ovr}</div>
            <div class="fut-pos">${p.pos}</div>
            <img src="${p.photo}" class="fut-img">
            <div class="fut-name">${p.name}</div>
        </div>
    `).join('');
}

function selectDraftPlayer(playerId, pos) {
    const player = players.find(p => p.id === playerId);
    if(!player) return;

    if(draftState.starters.length < 11) {
        draftState.starters.push(player);
        renderDraftTacticalPitch();
    } else if(draftState.bench.length < 7) {
        draftState.bench.push(player);
        renderDraftBench();
    }

    draftState.currentPosIndex++;
    showNextDraftPick();
}

function renderDraftTacticalPitch() {
    const pitch = document.getElementById('draft-tactical-pitch');
    const coords = [
        {top: '85%', left: '50%'}, // GK
        {top: '65%', left: '15%'}, // LB
        {top: '68%', left: '38%'}, // CB
        {top: '68%', left: '62%'}, // CB
        {top: '65%', left: '85%'}, // RB
        {top: '45%', left: '35%'}, // CM
        {top: '45%', left: '65%'}, // CM
        {top: '30%', left: '50%'}, // CAM
        {top: '15%'}, left: '20%'}, // ST
        {top: '15%', left: '80%'}, // ST
        {top: '30%', left: '15%'}  // LW
    ];

    let html = '<div class="grass-stripes"></div>';
    draftState.starters.forEach((p, idx) => {
        const c = coords[idx] || {top: '50%', left: '50%'};
        html += `
            <div class="tactical-node" style="top: ${c.top}; left: ${c.left};" title="${p.name} (${p.pos})">
                <span style="font-size:0.65rem">${p.pos}</span>
                <span style="font-size:0.75rem; color:var(--neon-green)">${p.ovr}</span>
            </div>
        `;
    });
    pitch.innerHTML = html;
}

function renderDraftBench() {
    const benchDiv = document.getElementById('draft-bench-display');
    document.getElementById('draft-bench-count').innerText = draftState.bench.length;
    benchDiv.innerHTML = draftState.bench.map(p => `
        <div class="fut-card" style="transform:scale(0.75); margin:-15px;">
            <div class="fut-ovr">${p.ovr}</div>
            <div class="fut-pos">${p.pos}</div>
            <img src="${p.photo}" class="fut-img">
            <div class="fut-name">${p.name}</div>
        </div>
    `).join('');
}
