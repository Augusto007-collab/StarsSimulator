<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stars Simulator | EA FC 27 Edition</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        eafc: {
                            dark: '#0a0b10',
                            card: '#12141c',
                            cardHover: '#1a1d28',
                            neon: '#00ffcc',
                            gold: '#ffd700',
                            accent: '#3b82f6',
                            danger: '#ef4444',
                            warning: '#f59e0b',
                            success: '#10b981'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts & FontAwesome -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0a0b10;
            color: #f3f4f6;
            overflow-x: hidden;
        }
        .glass-panel {
            background: rgba(18, 20, 28, 0.82);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .neon-glow {
            box-shadow: 0 0 30px rgba(0, 255, 204, 0.15);
        }
        .gold-glow {
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0a0b10;
        }
        ::-webkit-scrollbar-thumb {
            background: #1f293d;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #00ffcc;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col bg-eafc-dark text-gray-100">

    <header class="glass-panel sticky top-0 z-50 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <div class="bg-gradient-to-tr from-cyan-500 to-emerald-400 p-2.5 rounded-xl text-eafc-dark font-black text-xl tracking-wider shadow-lg flex items-center gap-2">
                <i class="fa-solid fa-futbol"></i> STARS <span class="text-white text-xs bg-black/50 px-2 py-0.5 rounded">FC27</span>
            </div>
            <div class="hidden md:flex items-center space-x-1 text-xs text-gray-400">
                <span class="px-2 py-1 bg-gray-800/80 rounded-md">Simulador de Partidas</span>
                <span class="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md font-semibold">Online v2.7</span>
            </div>
        </div>

        <div id="userNavSection" class="flex items-center space-x-4">
            <!-- Dynamically populated user profile / auth status -->
        </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col">
        
        <!-- App Navigation Tabs (Hidden until authenticated) -->
        <nav id="appNavigation" class="hidden flex-wrap gap-2 mb-6 border-b border-gray-800 pb-4">
            <button onclick="switchTab('dashboard')" id="nav-dashboard" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-2">
                <i class="fa-solid fa-house"></i> Início
            </button>
            <button onclick="switchTab('quickmatch')" id="nav-quickmatch" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-bolt"></i> Partida Rápida
            </button>
            <button onclick="switchTab('draft')" id="nav-draft" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-crown text-amber-400"></i> Modo Draft
            </button>
            <button onclick="switchTab('tournament')" id="nav-tournament" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-trophy text-emerald-400"></i> Campeonatos
            </button>
            <button onclick="switchTab('admin')" id="nav-admin" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-shield-halved"></i> Banco & Admin
            </button>
        </nav>

        <!-- VIEWS CONTAINER -->
        <div class="flex-1 flex flex-col relative">

            <section id="view-auth" class="flex-1 flex items-center justify-center py-12">
                <div class="glass-panel p-8 md:p-10 rounded-3xl max-w-md w-full neon-glow border border-cyan-500/20 relative overflow-hidden">
                    <div class="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="text-center mb-8">
                        <div class="inline-block p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 text-3xl mb-3 border border-cyan-500/20">
                            <i class="fa-solid fa-gamepad"></i>
                        </div>
                        <h2 class="text-2xl font-black tracking-tight text-white">STARS SIMULATOR</h2>
                        <p class="text-xs text-gray-400 mt-1">Insira seu apelido de manager para acessar o simulador FC27</p>
                    </div>

                    <form onsubmit="handleLogin(event)" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Apelido do Manager</label>
                            <input type="text" id="authUsername" required placeholder="Ex: PepManager27" 
                                class="w-full bg-gray-900/90 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition">
                        </div>
                        <button type="submit" class="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-emerald-400 text-eafc-dark font-black rounded-xl hover:opacity-95 transition shadow-lg shadow-cyan-500/20">
                            ENTRAR NO JOGO <i class="fa-solid fa-arrow-right ml-2"></i>
                        </button>
                    </form>
                    <div class="mt-6 text-center text-xs text-gray-500">
                        Seus dados e atletas criados ficam salvos no seu navegador.
                    </div>
                </div>
            </section>

            <section id="view-dashboard" class="view-section hidden flex-1 space-y-6">
                <div class="glass-panel p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div>
                        <span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">Modo Carreira Ativo</span>
                        <h1 id="welcomeUser" class="text-3xl md:text-4xl font-black text-white mt-2">Bem-vindo, Manager!</h1>
                        <p class="text-gray-400 text-sm mt-1">Gerencie seu banco de atletas, dispute campeonatos e teste táticas em tempo real.</p>
                    </div>
                    <div class="flex flex-wrap gap-3 z-10">
                        <button onclick="switchTab('quickmatch')" class="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-eafc-dark font-extrabold rounded-2xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                            <i class="fa-solid fa-bolt"></i> Partida Rápida
                        </button>
                        <button onclick="switchTab('draft')" class="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl transition border border-gray-700 flex items-center gap-2">
                            <i class="fa-solid fa-crown text-amber-400"></i> Modo Draft
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div onclick="switchTab('admin')" class="glass-panel p-6 rounded-3xl hover:border-cyan-500/40 transition cursor-pointer group">
                        <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white">Banco de Atletas</h3>
                        <p class="text-gray-400 text-xs mt-1">Cadastre jogadores com overall, perna boa, estrelas de drible e foto 3x4.</p>
                        <div id="statsTotalPlayers" class="mt-4 text-2xl font-extrabold text-cyan-400">0 Cadastrados</div>
                    </div>
                    <div onclick="switchTab('tournament')" class="glass-panel p-6 rounded-3xl hover:border-emerald-500/40 transition cursor-pointer group">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
                            <i class="fa-solid fa-trophy"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white">Campeonatos</h3>
                        <p class="text-gray-400 text-xs mt-1">Dispute ligas de pontos corridos ou torneios eliminatórios (Mata-Mata).</p>
                        <div class="mt-4 text-2xl font-extrabold text-emerald-400">FC27 Format</div>
                    </div>
                    <div onclick="switchTab('draft')" class="glass-panel p-6 rounded-3xl hover:border-amber-500/40 transition cursor-pointer group">
                        <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
                            <i class="fa-solid fa-crown"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white">Modo Draft</h3>
                        <p class="text-gray-400 text-xs mt-1">Monte seu time perfeito escolhendo 1 entre 5 opções por posição.</p>
                        <div class="mt-4 text-2xl font-extrabold text-amber-400">11 Titulares + 7 Reservas</div>
                    </div>
                </div>
            </section>

            <section id="view-admin" class="view-section hidden flex-1 space-y-6">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 class="text-2xl font-extrabold text-white">Banco de Dados & Administração</h2>
                        <p class="text-xs text-gray-400">Cadastre os clubes, overall, posições e fotos 3x4 transparentes dos atletas.</p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadDefaultDemoData()" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-bold rounded-xl border border-gray-700 text-gray-300 transition flex items-center gap-1.5">
                            <i class="fa-solid fa-database text-cyan-400"></i> Carregar Elenco Padrão (Demo)
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Formulário de Cadastro -->
                    <div class="glass-panel p-6 rounded-3xl space-y-4">
                        <h3 class="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <i class="fa-solid fa-user-plus text-cyan-400"></i> Novo Atleta
                        </h3>
                        <form onsubmit="handleSavePlayer(event)" class="space-y-3">
                            <div>
                                <label class="block text-xs font-semibold text-gray-400 mb-1">Nome do Atleta</label>
                                <input type="text" id="pName" required placeholder="Ex: Vinícius Júnior" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                            </div>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-xs font-semibold text-gray-400 mb-1">Time / Clube</label>
                                    <input type="text" id="pTeam" required placeholder="Ex: Real Madrid" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-gray-400 mb-1">Overall (OVR)</label>
                                    <input type="number" id="pOvr" min="40" max="99" value="85" required class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-3">
                                <div>
                                    <label class="block text-xs font-semibold text-gray-400 mb-1">Posição</label>
                                    <select id="pPos" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                                        <option value="GOL">GOL (Goleiro)</option>
                                        <option value="ZAG">ZAG</option>
                                        <option value="LE">LE</option>
                                        <option value="LD">LD</option>
                                        <option value="VOL">VOL</option>
                                        <option value="MC">MC</option>
                                        <option value="ME">ME</option>
                                        <option value="MD">MD</option>
                                        <option value="MAT">MAT</option>
                                        <option value="ATA">ATA</option>
                                        <option value="CA">CA</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-gray-400 mb-1">Perna Boa</label>
                                    <select id="pFoot" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                                        <option value="Direita">Direita</option>
                                        <option value="Esquerda">Esquerda</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-gray-400 mb-1">Drible (1-5)</label>
                                    <select id="pSkills" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                                        <option value="1">1 ★</option>
                                        <option value="2">2 ★</option>
                                        <option value="3">3 ★</option>
                                        <option value="4">4 ★</option>
                                        <option value="5" selected>5 ★</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-400 mb-1">Foto 3x4 (URL com Fundo Transparente)</label>
                                <input type="url" id="pPhoto" placeholder="https://exemplo.com/foto_transparente.png" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 outline-none">
                                <p class="text-[10px] text-gray-500 mt-1">Dica: Use links diretos de imagens PNG transparentes. Caso vazio, geramos um card estilizado FC27.</p>
                            </div>
                            <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-400 text-eafc-dark font-black rounded-xl text-sm transition hover:opacity-95 shadow-lg shadow-cyan-500/20 mt-2">
                                CADASTRAR ATLETA
                            </button>
                        </form>
                    </div>

                    <!-- Lista de Atletas -->
                    <div class="glass-panel p-6 rounded-3xl lg:col-span-2 flex flex-col h-[540px]">
                        <div class="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                                <i class="fa-solid fa-database text-emerald-400"></i> Atletas Cadastrados (<span id="playerCount">0</span>)
                            </h3>
                            <button onclick="clearAllPlayers()" class="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1">
                                <i class="fa-solid fa-trash-can"></i> Limpar Tudo
                            </button>
                        </div>
                        <div id="playerListContainer" class="flex-1 overflow-y-auto space-y-2.5 pr-2">
                            <!-- Populated via JS -->
                        </div>
                    </div>
                </div>
            </section>

            <section id="view-quickmatch" class="view-section hidden flex-1 space-y-6">
                <div class="glass-panel p-8 md:p-10 rounded-3xl space-y-6 max-w-xl mx-auto w-full">
                    <div class="text-center">
                        <span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">Partida Exibição</span>
                        <h2 class="text-2xl font-black text-white mt-2">CONFIGURAR PARTIDA RÁPIDA</h2>
                        <p class="text-xs text-gray-400 mt-1">Selecione os dois times do seu banco de dados para iniciar o confronto ao vivo.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="block text-xs font-semibold uppercase tracking-wider text-cyan-400">Time da Casa (Mandante)</label>
                            <select id="qmHomeTeam" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan-400 outline-none">
                                <!-- Populated via JS -->
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-xs font-semibold uppercase tracking-wider text-amber-400">Time Visitante</label>
                            <select id="qmAwayTeam" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm focus:border-amber-400 outline-none">
                                <!-- Populated via JS -->
                            </select>
                        </div>
                    </div>

                    <div class="pt-4">
                        <button onclick="startQuickMatch()" class="w-full py-4 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 text-eafc-dark font-black text-base rounded-2xl hover:opacity-95 transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3">
                            <i class="fa-solid fa-play"></i> INICIAR PARTIDA AO VIVO
                        </button>
                    </div>
                </div>
            </section>

            <section id="view-draft" class="view-section hidden flex-1 space-y-6">
                <div id="draftSetupScreen" class="glass-panel p-8 md:p-10 rounded-3xl max-w-xl mx-auto text-center space-y-6">
                    <div class="w-20 h-20 bg-amber-500/10 text-amber-400 rounded-3xl flex items-center justify-center mx-auto text-4xl border border-amber-500/20 gold-glow">
                        <i class="fa-solid fa-crown"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-black text-white">MODO DRAFT EA FC 27</h2>
                        <p class="text-xs text-gray-400 mt-1">Monte seu elenco definitivo escolhendo 11 titulares e 7 reservas posição por posição. A cada etapa, o sistema sorteia 5 atletas daquela posição específica para você escolher o melhor!</p>
                    </div>
                    <button onclick="initDraft()" class="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-eafc-dark font-black rounded-2xl hover:opacity-95 transition shadow-lg shadow-amber-500/20">
                        INICIAR NOVO DRAFT <i class="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                </div>

                <div id="draftActiveScreen" class="hidden space-y-6">
                    <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
                        <div>
                            <span id="draftStepIndicator" class="text-xs font-bold text-amber-400 uppercase tracking-wider">Passo 1 de 18</span>
                            <h3 id="draftStepTitle" class="text-lg font-bold text-white">Escolha o Titular para: Goleiro (GOL)</h3>
                        </div>
                        <div id="draftRosterSummary" class="text-xs text-gray-400 font-semibold">
                            Selecionados: 0 / 18
                        </div>
                    </div>

                    <div id="draftOptionsGrid" class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <!-- Populated via JS -->
                    </div>
                </div>
            </section>

            <section id="view-tournament" class="view-section hidden flex-1 space-y-6">
                <div id="tourneySetupScreen" class="glass-panel p-8 md:p-10 rounded-3xl max-w-xl mx-auto text-center space-y-6">
                    <div class="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto text-4xl border border-emerald-500/20">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-black text-white">MODO CAMPEONATO FC 27</h2>
                        <p class="text-xs text-gray-400 mt-1">Crie ligas de pontos corridos ou torneios eliminatórios (Mata-Mata) utilizando os clubes cadastrados no seu banco.</p>
                    </div>
                    <div class="space-y-3">
                        <select id="tourneyType" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-emerald-400">
                            <option value="points">Pontos Corridos (Liga)</option>
                            <option value="cup">Mata-Mata (Eliminatórias)</option>
                        </select>
                        <button onclick="startTournament()" class="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-400 text-eafc-dark font-black rounded-2xl hover:opacity-95 transition shadow-lg shadow-emerald-500/20">
                            CRIAR E DISPUTAR CAMPEONATO
                        </button>
                    </div>
                </div>

                <div id="tourneyDashboard" class="hidden space-y-6">
                    <!-- Tournament table or matches rendered here -->
                </div>
            </section>

            <section id="view-match" class="view-section hidden flex-1 flex flex-col space-y-4">
                <!-- Placar Header -->
                <div class="glass-panel p-4 rounded-2xl flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span id="matchHomeName" class="font-black text-lg text-white">Time Casa</span>
                        <span id="matchHomeScore" class="text-2xl font-black px-3.5 py-1 bg-gray-900 rounded-xl text-cyan-400 border border-cyan-500/30">0</span>
                    </div>
                    <div class="text-center">
                        <div id="matchClock" class="text-xl font-black text-amber-400 tracking-wider">00'</div>
                        <div id="matchStatusText" class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">1º Tempo</div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span id="matchAwayScore" class="text-2xl font-black px-3.5 py-1 bg-gray-900 rounded-xl text-amber-400 border border-amber-500/30">0</span>
                        <span id="matchAwayName" class="font-black text-lg text-white">Time Fora</span>
                    </div>
                </div>

                <!-- Campo e Timeline -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
                    <!-- Campo 2D Interativo -->
                    <div class="glass-panel p-4 rounded-2xl lg:col-span-2 flex flex-col items-center justify-center relative overflow-hidden h-[440px] md:h-[520px]">
                        <!-- Campo de Futebol SVG Style -->
                        <div class="absolute inset-4 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 rounded-2xl border-2 border-emerald-700/60 overflow-hidden shadow-inner flex flex-col justify-between p-4">
                            <!-- Linhas do gramado -->
                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div class="w-36 h-36 rounded-full border-2 border-emerald-600/40"></div>
                                <div class="absolute w-full h-[1px] bg-emerald-600/40"></div>
                            </div>
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 border-b-2 border-x-2 border-emerald-600/40 rounded-b-2xl"></div>
                            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 border-t-2 border-x-2 border-emerald-600/40 rounded-t-2xl"></div>

                            <!-- Canvas de Jogadores 2D Animados -->
                            <div id="pitchCanvas" class="relative w-full h-full">
                                <!-- Populated via JS -->
                            </div>
                        </div>

                        <!-- Botões Táticos e Substituições -->
                        <div class="absolute bottom-6 z-10 flex gap-3">
                            <button onclick="openTacticsModal()" class="px-4 py-2.5 bg-gray-900/90 hover:bg-gray-800 text-white font-bold rounded-xl text-xs border border-gray-700 shadow-lg flex items-center gap-2 transition">
                                <i class="fa-solid fa-chess-board text-cyan-400"></i> Táticas & Formação
                            </button>
                            <button onclick="openSubsModal()" class="px-4 py-2.5 bg-gray-900/90 hover:bg-gray-800 text-white font-bold rounded-xl text-xs border border-gray-700 shadow-lg flex items-center gap-2 transition">
                                <i class="fa-solid fa-right-left text-emerald-400"></i> Subs (<span id="subCountDisplay">3</span>/3 pausas)
                            </button>
                        </div>
                    </div>

                    <!-- Timeline de Eventos -->
                    <div class="glass-panel p-4 rounded-2xl flex flex-col h-[440px] md:h-[520px]">
                        <h3 class="text-sm font-bold text-white border-b border-gray-800 pb-2 mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-clock-rotate-left text-cyan-400"></i> Narrativa & Eventos AO VIVO
                        </h3>
                        <div id="matchEventsList" class="flex-1 overflow-y-auto space-y-2.5 pr-2 text-xs">
                            <!-- Populated via JS -->
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <!-- MODAL DE TÁTICAS & FORMAÇÃO / ARRASTAR JOGADORES -->
    <div id="tacticsModal" class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="glass-panel p-6 md:p-8 rounded-3xl max-w-xl w-full space-y-4 border border-cyan-500/30">
            <div class="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 class="text-lg font-bold text-white"><i class="fa-solid fa-chess-board text-cyan-400 mr-2"></i> Tática & Formação Personalizada</h3>
                <button onclick="closeTacticsModal()" class="text-gray-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-400 mb-1">Formação Padrão FC27</label>
                    <select id="tacticalFormationSelect" onchange="changeFormation(this.value)" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400">
                        <option value="4-3-3">4-3-3 (Ofensivo Equilibrado)</option>
                        <option value="4-4-2">4-4-2 (Linha Dupla Tradicional)</option>
                        <option value="3-5-2">3-5-2 (Domínio de Meio-Campo)</option>
                        <option value="5-3-2">5-3-2 (Tranca Defensiva)</option>
                    </select>
                </div>
                <div class="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-xs text-cyan-300 leading-relaxed">
                    <i class="fa-solid fa-circle-info mr-1"></i> No FC27, jogadores fora de posição ou formações muito desorganizadas aumentam drasticamente a chance de sofrer gols nos contra-ataques! (Goleiro travado por regulamentação).
                </div>
            </div>
            <div class="flex justify-end pt-2">
                <button onclick="closeTacticsModal()" class="px-6 py-2.5 bg-cyan-500 text-eafc-dark font-extrabold rounded-xl text-xs">APLICAR TÁTICA</button>
            </div>
        </div>
    </div>

    <!-- MODAL DE SUBSTITUIÇÕES -->
    <div id="subsModal" class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="glass-panel p-6 md:p-8 rounded-3xl max-w-lg w-full space-y-4 border border-emerald-500/30">
            <div class="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 class="text-lg font-bold text-white"><i class="fa-solid fa-right-left text-emerald-400 mr-2"></i> Banco de Substituições</h3>
                <button onclick="closeSubsModal()" class="text-gray-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div class="space-y-3">
                <p class="text-xs text-gray-400">Restam <span id="modalSubsPauses" class="font-bold text-white">3</span> pausas e <span id="modalSubsChanges" class="font-bold text-white">5</span> trocas permitidas nesta partida.</p>
                <div id="subsListContainer" class="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
                    <!-- Populated via JS -->
                </div>
            </div>
            <div class="flex justify-end pt-2">
                <button onclick="closeSubsModal()" class="px-6 py-2.5 bg-emerald-500 text-eafc-dark font-extrabold rounded-xl text-xs">CONCLUIR</button>
            </div>
        </div>
    </div>

    <!-- MODAL DE PÊNALTI -->
    <div id="penaltyModal" class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 hidden flex items-center justify-center p-4">
        <div class="glass-panel p-8 rounded-3xl max-w-md w-full text-center space-y-6 border border-amber-500/40 gold-glow">
            <div class="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-3xl flex items-center justify-center mx-auto text-3xl border border-amber-500/20">
                <i class="fa-solid fa-futbol animate-bounce"></i>
            </div>
            <div>
                <h2 class="text-2xl font-black text-white">PÊNALTI ASSINALADO!</h2>
                <p class="text-xs text-gray-400 mt-1">Selecione o cobrador oficial para a cobrança decisiva.</p>
            </div>
            <div id="penaltyShootersList" class="space-y-2 max-h-48 overflow-y-auto pr-1">
                <!-- Populated via JS -->
            </div>
        </div>
    </div>

    <script>
        // State Management
        let currentUser = null;
        let playersDB = [];
        let draftState = {
            step: 0,
            positions: ['GOL','ZAG','ZAG','LE','LD','VOL','MC','MAT','ME','MD','ATA','RES1','RES2','RES3','RES4','RES5','RES6','RES7'],
            selectedRoster: []
        };
        let activeMatch = null;
        let matchTimerInterval = null;

        // Default Demo Players (FC27 style)
        const defaultDemoPlayers = [
            { id: '1', name: 'Courtois', team: 'Real Madrid', ovr: 90, pos: 'GOL', foot: 'Esquerda', skills: 1, photo: '' },
            { id: '2', name: 'E. Militão', team: 'Real Madrid', ovr: 86, pos: 'ZAG', foot: 'Direita', skills: 2, photo: '' },
            { id: '3', name: 'W. Saliba', team: 'Arsenal', ovr: 87, pos: 'ZAG', foot: 'Direita', skills: 2, photo: '' },
            { id: '4', name: 'A. Davies', team: 'Bayern', ovr: 88, pos: 'LE', foot: 'Esquerda', skills: 4, photo: '' },
            { id: '5', name: 'T. Alexander-Arnold', team: 'Liverpool', ovr: 86, pos: 'LD', foot: 'Direita', skills: 3, photo: '' },
            { id: '6', name: 'Rodri', team: 'Manchester City', ovr: 91, pos: 'VOL', foot: 'Direita', skills: 3, photo: '' },
            { id: '7', name: 'K. De Bruyne', team: 'Manchester City', ovr: 91, pos: 'MC', foot: 'Direita', skills: 4, photo: '' },
            { id: '8', name: 'J. Bellingham', team: 'Real Madrid', ovr: 90, pos: 'MAT', foot: 'Direita', skills: 4, photo: '' },
            { id: '9', name: 'V. Júnior', team: 'Real Madrid', ovr: 91, pos: 'ME', foot: 'Direita', skills: 5, photo: '' },
            { id: '10', name: 'M. Salah', team: 'Liverpool', ovr: 89, pos: 'MD', foot: 'Esquerda', skills: 4, photo: '' },
            { id: '11', name: 'K. Mbappé', team: 'Real Madrid', ovr: 92, pos: 'ATA', foot: 'Direita', skills: 5, photo: '' },
            { id: '12', name: 'Alisson', team: 'Liverpool', ovr: 89, pos: 'GOL', foot: 'Direita', skills: 1, photo: '' },
            { id: '13', name: 'R. Dias', team: 'Manchester City', ovr: 88, pos: 'ZAG', foot: 'Direita', skills: 2, photo: '' },
            { id: '14', name: 'F. Valverde', team: 'Real Madrid', ovr: 88, pos: 'MC', foot: 'Direita', skills: 3, photo: '' },
            { id: '15', name: 'H. Kane', team: 'Bayern', ovr: 90, pos: 'CA', foot: 'Direita', skills: 3, photo: '' },
            { id: '16', name: 'L. Messi', team: 'Inter Miami', ovr: 88, pos: 'ATA', foot: 'Esquerda', skills: 4, photo: '' },
            { id: '17', name: 'C. Ronaldo', team: 'Al Nassr', ovr: 86, pos: 'CA', foot: 'Direita', skills: 4, photo: '' },
            { id: '18', name: 'B. Saka', team: 'Arsenal', ovr: 87, pos: 'MD', foot: 'Esquerda', skills: 4, photo: '' }
        ];

        // Initialization on Load
        window.onload = function() {
            loadFromLocalStorage();
            checkAuthSession();
        };

        function loadFromLocalStorage() {
            const savedUser = localStorage.getItem('stars_user_fc27');
            if (savedUser) currentUser = savedUser;

            const savedPlayers = localStorage.getItem('stars_players_fc27');
            if (savedPlayers) {
                playersDB = JSON.parse(savedPlayers);
            } else {
                playersDB = [...defaultDemoPlayers];
                savePlayersToStorage();
            }
            updateAdminStats();
        }

        function savePlayersToStorage() {
            localStorage.setItem('stars_players_fc27', JSON.stringify(playersDB));
            updateAdminStats();
        }

        function updateAdminStats() {
            document.getElementById('playerCount').innerText = playersDB.length;
            document.getElementById('statsTotalPlayers').innerText = `${playersDB.length} Cadastrados`;
            populateQuickMatchSelects();
        }

        function checkAuthSession() {
            const nav = document.getElementById('appNavigation');
            const userNav = document.getElementById('userNavSection');
            const authView = document.getElementById('view-auth');

            if (currentUser) {
                authView.classList.add('hidden');
                nav.classList.remove('hidden');
                userNav.innerHTML = `
                    <div class="flex items-center space-x-3 bg-gray-900/80 px-4 py-2 rounded-xl border border-gray-800">
                        <div class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                            ${currentUser.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-bold text-white">${currentUser}</span>
                    </div>
                    <button onclick="handleLogout()" class="text-xs text-red-400 hover:text-red-300 font-semibold px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 transition flex items-center gap-1.5">
                        <i class="fa-solid fa-power-off"></i> Sair
                    </button>
                `;
                document.getElementById('welcomeUser').innerText = `Bem-vindo, ${currentUser}!`;
                switchTab('dashboard');
            } else {
                authView.classList.remove('hidden');
                nav.classList.add('hidden');
                userNav.innerHTML = '';
                document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            }
        }

        function handleLogin(e) {
            e.preventDefault();
            const username = document.getElementById('authUsername').value.trim();
            if (!username) return;
            currentUser = username;
            localStorage.setItem('stars_user_fc27', currentUser);
            checkAuthSession();
        }

        function handleLogout() {
            localStorage.removeItem('stars_user_fc27');
            currentUser = null;
            checkAuthSession();
        }

        // Tab Navigation
        function switchTab(tabId) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('bg-cyan-500/10', 'text-cyan-400', 'border', 'border-cyan-500/30');
                btn.classList.add('bg-gray-900/60', 'text-gray-400');
            });

            const activeView = document.getElementById(`view-${tabId}`);
            if (activeView) activeView.classList.remove('hidden');

            const activeBtn = document.getElementById(`nav-${tabId}`);
            if (activeBtn) {
                activeBtn.classList.remove('bg-gray-900/60', 'text-gray-400');
                activeBtn.classList.add('bg-cyan-500/10', 'text-cyan-400', 'border', 'border-cyan-500/30');
            }

            if (tabId === 'admin') renderPlayerList();
        }

        // Admin: Save Player
        function handleSavePlayer(e) {
            e.preventDefault();
            const newPlayer = {
                id: 'p_' + Date.now(),
                name: document.getElementById('pName').value.trim(),
                team: document.getElementById('pTeam').value.trim(),
                ovr: parseInt(document.getElementById('pOvr').value),
                pos: document.getElementById('pPos').value,
                foot: document.getElementById('pFoot').value,
                skills: parseInt(document.getElementById('pSkills').value),
                photo: document.getElementById('pPhoto').value.trim()
            };
            playersDB.push(newPlayer);
            savePlayersToStorage();
            e.target.reset();
            renderPlayerList();
        }

        function renderPlayerList() {
            const container = document.getElementById('playerListContainer');
            if (playersDB.length === 0) {
                container.innerHTML = `<div class="text-center py-12 text-gray-500 text-xs">Nenhum atleta cadastrado no banco de dados.</div>`;
                return;
            }
            container.innerHTML = playersDB.map(p => `
                <div class="flex items-center justify-between p-3 bg-gray-900/70 border border-gray-800 rounded-xl hover:border-cyan-500/30 transition">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center font-black text-amber-400 text-sm border border-gray-700">
                            ${p.ovr}
                        </div>
                        <div>
                            <div class="text-sm font-bold text-white flex items-center gap-2">
                                ${p.name} <span class="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded">${p.pos}</span>
                            </div>
                            <div class="text-xs text-gray-400">${p.team} • Perna: ${p.foot} • ${p.skills}★ Drible</div>
                        </div>
                    </div>
                    <button onclick="deletePlayer('${p.id}')" class="text-red-400 hover:text-red-300 p-2 transition"><i class="fa-solid fa-trash"></i></button>
                </div>
            `).join('');
        }

        function deletePlayer(id) {
            playersDB = playersDB.filter(p => p.id !== id);
            savePlayersToStorage();
            renderPlayerList();
        }

        function clearAllPlayers() {
            if (confirm('Deseja realmente apagar todos os atletas do banco?')) {
                playersDB = [];
                savePlayersToStorage();
                renderPlayerList();
            }
        }

        function loadDefaultDemoData() {
            playersDB = [...defaultDemoPlayers];
            savePlayersToStorage();
            renderPlayerList();
        }

        // Quick Match Selects
        function populateQuickMatchSelects() {
            const teams = [...new Set(playersDB.map(p => p.team))];
            const homeSelect = document.getElementById('qmHomeTeam');
            const awaySelect = document.getElementById('qmAwayTeam');

            const optionsHTML = teams.length > 0 
                ? teams.map(t => `<option value="${t}">${t}</option>`).join('')
                : `<option value="Time A">Time A</option><option value="Time B">Time B</option>`;

            homeSelect.innerHTML = optionsHTML;
            awaySelect.innerHTML = optionsHTML;
            if (teams.length > 1) awaySelect.selectedIndex = 1;
        }

        // Quick Match Start
        function startQuickMatch() {
            const home = document.getElementById('qmHomeTeam').value;
            const away = document.getElementById('qmAwayTeam').value;

            if (home === away) {
                alert('Selecione times diferentes para realizar a partida.');
                return;
            }

            const homeSquad = playersDB.filter(p => p.team === home).slice(0, 11);
            const awaySquad = playersDB.filter(p => p.team === away).slice(0, 11);

            initMatchSimulation(home, homeSquad.length ? homeSquad : defaultDemoPlayers.slice(0, 11), away, awaySquad.length ? awaySquad : defaultDemoPlayers.slice(11, 22));
        }

        // Draft Mode Logic
        function initDraft() {
            if (playersDB.length < 5) {
                alert('Cadastre pelo menos 5 atletas no banco de dados para iniciar o modo Draft.');
                switchTab('admin');
                return;
            }
            draftState.step = 0;
            draftState.selectedRoster = [];
            document.getElementById('draftSetupScreen').classList.add('hidden');
            document.getElementById('draftActiveScreen').classList.remove('hidden');
            renderDraftStep();
        }

        function renderDraftStep() {
            if (draftState.step >= draftState.positions.length) {
                alert('Draft concluído com sucesso! Iniciando partida com seu elenco montado.');
                initMatchSimulation('Meu Elenco Draft', draftState.selectedRoster.slice(0, 11), 'Adversário CPU', defaultDemoPlayers.slice(0, 11));
                return;
            }

            const targetPos = draftState.positions[draftState.step];
            document.getElementById('draftStepIndicator').innerText = `Passo ${draftState.step + 1} de ${draftState.positions.length}`;
            document.getElementById('draftStepTitle').innerText = `Escolha para a posição: ${targetPos}`;
            document.getElementById('draftRosterSummary').innerText = `Selecionados: ${draftState.selectedRoster.length} / 18`;

            let pool = playersDB.filter(p => p.pos === targetPos || targetPos.startsWith('RES'));
            if (pool.length < 5) pool = [...playersDB]; // fallback

            const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

            const grid = document.getElementById('draftOptionsGrid');
            grid.innerHTML = shuffled.map(p => `
                <div onclick="selectDraftPlayer(${JSON.stringify(p).replace(/"/g, '&quot;')})" class="glass-panel p-6 rounded-3xl border border-gray-800 hover:border-amber-400 transition cursor-pointer group text-center space-y-3">
                    <div class="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 font-black text-2xl flex items-center justify-center mx-auto border border-amber-500/20 group-hover:scale-105 transition">
                        ${p.ovr}
                    </div>
                    <div>
                        <h4 class="font-bold text-white text-sm">${p.name}</h4>
                        <p class="text-xs text-cyan-400">${p.team} • ${p.pos}</p>
                    </div>
                    <div class="text-[10px] text-gray-400">Perna: ${p.foot} | ${p.skills}★ Drible</div>
                </div>
            `).join('');
        }

        function selectDraftPlayer(player) {
            draftState.selectedRoster.push(player);
            draftState.step++;
            renderDraftStep();
        }

        // Tournament Mode Logic
        function startTournament() {
            const type = document.getElementById('tourneyType').value;
            const teams = [...new Set(playersDB.map(p => p.team))];
            if (teams.length < 2) {
                alert('Cadastre pelo menos 2 times no banco para criar um campeonato.');
                switchTab('admin');
                return;
            }
            document.getElementById('tourneySetupScreen').classList.add('hidden');
            document.getElementById('tourneyDashboard').classList.remove('hidden');
            document.getElementById('tourneyDashboard').innerHTML = `
                <div class="glass-panel p-8 rounded-3xl space-y-4 text-center max-w-xl mx-auto">
                    <div class="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-500/20">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white">Campeonato Criado (${type === 'points' ? 'Pontos Corridos' : 'Mata-Mata'})</h3>
                    <p class="text-xs text-gray-400">Clubes participantes: ${teams.join(', ')}</p>
                    <button onclick="switchTab('quickmatch')" class="px-6 py-3 bg-emerald-500 text-eafc-dark font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-500/20">INICIAR CONFRONTO DA RODADA</button>
                </div>
            `;
        }

        // 2D Match Engine & Simulation
        function initMatchSimulation(homeName, homeSquad, awayName, awaySquad) {
            switchTab('match');
            activeMatch = {
                homeName, homeSquad,
                awayName, awaySquad,
                homeScore: 0, awayScore: 0,
                minute: 0,
                status: '1º Tempo',
                subPauses: 3,
                subChanges: 5,
                events: []
            };

            document.getElementById('matchHomeName').innerText = homeName;
            document.getElementById('matchAwayName').innerText = awayName;
            document.getElementById('matchHomeScore').innerText = '0';
            document.getElementById('matchAwayScore').innerText = '0';
            document.getElementById('matchEventsList').innerHTML = '';

            renderPitchPlayers();
            startMatchTimer();
        }

        function renderPitchPlayers() {
            const pitch = document.getElementById('pitchCanvas');
            let html = '';
            for (let i = 0; i < 11; i++) {
                const topHome = [85, 65, 65, 75, 75, 45, 45, 45, 20, 20, 15][i];
                const leftHome = [50, 20, 80, 10, 90, 30, 50, 70, 20, 80, 50][i];

                const topAway = [15, 35, 35, 25, 25, 55, 55, 55, 80, 80, 85][i];
                const leftAway = [50, 20, 80, 10, 90, 30, 50, 70, 20, 80, 50][i];

                html += `<div class="absolute w-6 h-6 rounded-full bg-cyan-400 text-eafc-dark font-black text-[10px] flex items-center justify-center border-2 border-white shadow-lg transition-all duration-1000" style="top: ${topHome}%; left: ${leftHome}%;">H${i+1}</div>`;
                html += `<div class="absolute w-6 h-6 rounded-full bg-amber-400 text-eafc-dark font-black text-[10px] flex items-center justify-center border-2 border-white shadow-lg transition-all duration-1000" style="top: ${topAway}%; left: ${leftAway}%;">A${i+1}</div>`;
            }
            pitch.innerHTML = html;
        }

        function startMatchTimer() {
            if (matchTimerInterval) clearInterval(matchTimerInterval);
            matchTimerInterval = setInterval(() => {
                activeMatch.minute++;
                document.getElementById('matchClock').innerText = `${activeMatch.minute}'`;

                if (activeMatch.minute === 45) {
                    activeMatch.status = 'Intervalo';
                    document.getElementById('matchStatusText').innerText = 'Intervalo';
                } else if (activeMatch.minute === 46) {
                    activeMatch.status = '2º Tempo';
                    document.getElementById('matchStatusText').innerText = '2º Tempo';
                } else if (activeMatch.minute >= 90) {
                    activeMatch.status = 'Fim de Jogo';
                    document.getElementById('matchStatusText').innerText = 'Fim de Jogo';
                    clearInterval(matchTimerInterval);
                    addMatchEvent('🏁 Fim de Partida! Apito final do árbitro.');
                }

                simulateMatchTick();
            }, 1000);
        }

        function simulateMatchTick() {
            const rand = Math.random();
            if (rand < 0.14) {
                // GOL (Goleiro tem chance mínima de marcar com bola rolando)
                const isHome = Math.random() > 0.5;
                if (isHome) activeMatch.homeScore++;
                else activeMatch.awayScore++;

                document.getElementById('matchHomeScore').innerText = activeMatch.homeScore;
                document.getElementById('matchAwayScore').innerText = activeMatch.awayScore;

                const scorer = isHome ? activeMatch.homeSquad[Math.floor(Math.random()*activeMatch.homeSquad.length)]?.name : activeMatch.awaySquad[Math.floor(Math.random()*activeMatch.awaySquad.length)]?.name;
                addMatchEvent(`⚽ GOL! ${scorer || 'Atacante'} marca para o ${isHome ? activeMatch.homeName : activeMatch.awayName}! (${activeMatch.minute}')`);
            } else if (rand < 0.20) {
                // PÊNALTI
                addMatchEvent(`🚨 PÊNALTI assinalado com revisão do VAR! (${activeMatch.minute}')`);
                triggerPenaltyModal();
            } else if (rand < 0.26) {
                // CARTÃO
                const card = Math.random() > 0.25 ? '🟨 Cartão Amarelo' : '🟥 Cartão Vermelho';
                addMatchEvent(`${card} aplicado pelo árbitro. (${activeMatch.minute}')`);
            }
        }

        function addMatchEvent(text) {
            const list = document.getElementById('matchEventsList');
            const item = document.createElement('div');
            item.className = 'p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 text-gray-300';
            item.innerHTML = text;
            list.prepend(item);
        }

        // Penalty Modal Handling
        function triggerPenaltyModal() {
            const modal = document.getElementById('penaltyModal');
            const list = document.getElementById('penaltyShootersList');
            modal.classList.remove('hidden');

            list.innerHTML = activeMatch.homeSquad.map(p => `
                <button onclick="executePenalty('${p.name}')" class="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold border border-gray-700 flex items-center justify-between transition">
                    <span>${p.name} (${p.pos})</span>
                    <span class="text-amber-400">OVR ${p.ovr}</span>
                </button>
            `).join('');
        }

        function executePenalty(playerName) {
            document.getElementById('penaltyModal').classList.add('hidden');
            const success = Math.random() > 0.22; // 78% chance em pênaltis
            if (success) {
                activeMatch.homeScore++;
                document.getElementById('matchHomeScore').innerText = activeMatch.homeScore;
                addMatchEvent(`⚽ Pênalti convertido com categoria por ${playerName}!`);
            } else {
                addMatchEvent(`❌ Defesa incrível do goleiro! ${playerName} perde o pênalti.`);
            }
        }

        // Táticas & Subs Modals
        function openTacticsModal() {
            document.getElementById('tacticsModal').classList.remove('hidden');
        }
        function closeTacticsModal() {
            document.getElementById('tacticsModal').classList.add('hidden');
        }

        function openSubsModal() {
            if (activeMatch.subPauses <= 0 || activeMatch.subChanges <= 0) {
                alert('Limite de substituições ou pausas esgotado.');
                return;
            }
            document.getElementById('subsModal').classList.remove('hidden');
            document.getElementById('modalSubsPauses').innerText = activeMatch.subPauses;
            document.getElementById('modalSubsChanges').innerText = activeMatch.subChanges;

            const container = document.getElementById('subsListContainer');
            container.innerHTML = activeMatch.homeSquad.map((p, idx) => `
                <div class="flex items-center justify-between p-2.5 bg-gray-900 rounded-xl border border-gray-800">
                    <span>Titular ${idx+1}: ${p.name} (${p.pos})</span>
                    <button onclick="executeSub(${idx})" class="px-3 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded-lg text-[10px] hover:bg-emerald-500/30">Substituir</button>
                </div>
            `).join('');
        }

        function closeSubsModal() {
            document.getElementById('subsModal').classList.add('hidden');
        }

        function executeSub(index) {
            if (activeMatch.subChanges <= 0) return;
            activeMatch.subChanges--;
            activeMatch.subPauses--;
            document.getElementById('subCountDisplay').innerText = activeMatch.subPauses;
            addMatchEvent(`🔄 Substituição realizada na equipe.`);
            closeSubsModal();
        }

        function changeFormation(formation) {
            addMatchEvent(`📋 Alteração tática para o esquema ${formation} concluída.`);
            closeTacticsModal();
        }
    </script>
</body>
</html>
```
eof
