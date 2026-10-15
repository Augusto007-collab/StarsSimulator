⚡ Stars Simulator — Futebol & Tática
🏆 Sobre o Jogo
O Stars Simulator é uma aplicação web completa e imersiva de simulação tática de futebol inspirada nos grandes títulos de eSports e no ecossistema Ultimate Team (FUT). Desenvolvido em arquivo único (standalone) utilizando tecnologias web modernas (HTML5, CSS3 e JavaScript ES6+ puro), o jogo não requer instalações complexas, servidores backend pesados ou frameworks externos.

Monte seus próprios clubes, personalize escudos e cores, contrate e gerencie elencos de até 30 atletas com cartas estilo FUT personalizadas, defina formações táticas avançadas, dispute campeonatos em formato de liga ou mata-mata, e acompanhe partidas em tempo real em um campo 3D/2D interativo com narração dinâmica e animações de gol cinematográficas.

✨ Principais Funcionalidades
1. 👤 Sistema de Técnico & Autenticação
Perfil do Treinador: Cadastro obrigatório do nome do técnico ao iniciar o jogo, que fica visível no painel e assina todas as ações e logs de auditoria.

Filtro Antiprofanidade: Validação rígida que impede o uso de termos ofensivos no nome do técnico.

2. 🏟️ Motor de Partida Rápida & Campo 3D
Simulação em Tempo Real: Acompanhe o avanço do tempo de jogo (0' a 90') com seletor de velocidade (de Super Lento a Super Rápido).

Campo 3D Dinâmico: Visualização com perspectiva tática, traves detalhadas em 3D, bandeirinhas de escanteio, movimento da bola e posições dinâmicas dos atletas em campo.

Indicadores de Ataque: Alertas visuais em tempo real indicando qual equipe está pressionando o adversário.

Paradas Técnicas e Substituições: Limite estrito de até 3 paradas técnicas e 5 substituições por equipe durante o jogo pausado.

Disputa de Pênaltis: Modo dedicado de cobrança de pênaltis estilo decisão com zonas interativas, goleiro animado e escolha de batedores.

Animações de Gol Épicas: Overlays comemorativos em tela cheia com o rosto do artilheiro, minuto do gol, placar atualizado e efeitos visuais imersivos estilo transmissão de TV.

3. 🛡️ Gestão Avançada de Clubes
Identidade Visual Completa: Nome, sigla de 3 letras, cores principais e secundárias, e emblema personalizado via URL ou upload local de imagem (convertida automaticamente para Base64).

Prancheta Tática Interativa: Posicionamento tático dos 11 titulares em formações como 4-3-3, 4-4-2 e 3-5-2.

Validação de Pofissão: Restrição estrita no posicionamento do goleiro (slot GK restrito exclusivamente a atletas com a posição de Goleiro).

Atribuições Especiais: Definição de capitão (bônus de equipe), batedor oficial de pênaltis, escanteios e faltas, além de estilos táticos de ataque e defesa.

4. 🏃 Banco de Atletas & Cartas FUT
Elencos Robustos: Capacidade de gerenciar até 30 atletas por clube.

Atributos Detalhados: Nome, overall (40 a 99), posição em campo (GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST), perna boa e estrelas de drible (1★ a 5★).

Cartões Estilo FUT: Cartões dourados colecionáveis exibindo a foto do atleta, overall, posição, emblema do clube e nome da equipe.

Filtros e Busca: Ferramenta de pesquisa instantânea por nome e filtro por clube.

5. 🏆 Campeonatos e Ligas
Múltiplos Formatos: Crie competições em formato de Pontos Corridos, Mata-mata ou Misto (Fase de Grupos + Playoffs).

Tabelas e Calendário: Acompanhe a classificação rodada a rodada, saldo de gols, vitórias e pontuações detalhadas.

6. ☁️ Nuvem, Backup & Auditoria
Integração com Firebase: Suporte a banco de dados em nuvem (CLOUD_URL) para sincronização e backup de dados.

Logs de Sistema: Auditoria completa registrando todas as movimentações, criação de clubes, transferências e resultados de partidas com carimbo de horário.

🛠️ Tecnologias Utilizadas
HTML5 Semantic Markup — Estruturação de abas, modais e componentes de layout.

CSS3 Moderno & Flexbox/Grid — Variáveis CSS (:root), animações keyframes, Glassmorphism e perspectiva 3D para o campo de futebol.

Google Fonts — Tipografias de alto desempenho (Teko para placares/títulos, Rajdhani para subtítulos e botões, e Inter para o corpo de texto).

JavaScript (ES6+ Puro) — Lógica de simulação de partidas, manipulação do DOM, persistência local (localStorage) e integração assíncrona com API Cloud/Firebase.

🚀 Como Executar o Projeto
Como a aplicação é construída inteiramente em um único arquivo HTML, executá-la é extremamente simples:

Baixe ou copie o código fonte completo do projeto (stars_simulator.html).

Salve o arquivo em sua máquina com a extensão .html (por exemplo, index.html).

Dê um duplo clique no arquivo salvo para abri-lo em qualquer navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

Cadastre o nome do seu técnico no modal inicial e comece a criar seus times, atletas e disputar partidas!

📋 Regras de Negócio e Limites do Sistema
Limite de Elenco: Cada clube pode registrar no máximo 30 atletas. O sistema bloqueia automaticamente novas adições caso o limite seja atingido.

Regra de Pausas: Em partidas rápidas, substituições e alterações táticas exigem que o jogo esteja pausado, respeitando o limite tático de 3 pausas e 5 trocas por equipe.

Persistência de Dados: Os dados são salvos automaticamente no armazenamento local do navegador (localStorage), garantindo que seu progresso não seja perdido ao fechar a aba.

📄 Licença
Este projeto está distribuído sob a licença MIT. Sinta-se à vontade para modificar, expandir e criar sua própria liga de futebol tático!
