# ⚽ Stars Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.7.0-cyan.svg)](#)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](#)

O **Stars Simulator** é uma aplicação web completa e responsiva desenvolvida para amantes da simulação tática e gestão de futebol. Com ele, você pode gerenciar seu próprio banco de dados de atletas, montar elencos através do modo **Draft**, disputar **Partidas Rápidas** ou **Campeonatos** e acompanhar simulações 2D interativas em tempo real.

---

## 🌟 Principais Funcionalidades

### 🎮 Modos de Jogo
* **Partida Rápida:** Selecione dois clubes cadastrados no seu banco de dados e inicie uma simulação ao vivo instantaneamente.
* **Modo Draft:** Monte sua equipe escolhendo 1 entre 5 opções de atletas sorteadas aleatoriamente para cada posição do campo (11 titulares + 7 reservas no banco).
* **Modo Campeonato:** Organize torneios no formato de **Pontos Corridos (Liga)** ou **Mata-Mata (Eliminatórias)** com os times cadastrados.

### 📋 Banco de Dados & Painel Administrativo
* **Atletas Personalizados:** Cadastre novos jogadores preenchendo:
  * Nome do Atleta
  * Time / Clube
  * Overall (OVR 40-99)
  * Posição (`GOL`, `ZAG`, `LE`, `LD`, `VOL`, `MC`, `ME`, `MD`, `MAT`, `ATA`, `CA`)
  * Perna Boa (Direita / Esquerda)
  * Estrelas de Drible (1★ a 5★)
  * Foto 3x4 com fundo transparente (URL)
* **Elenco Padrão (Demo):** Carregamento rápido de astros mundiais para testes imediatos.

### ⚽ Engine da Simulação 2D
* **Visualização no Campo:** Animação gráfica em tempo real representando os movimentos táticos dos jogadores no gramado.
* **Eventos Dinâmicos:** Apito inicial/final, Gols, Cartões Amarelos/Vermelhos, Intervenções do VAR e Pênaltis.
* **Cobrança de Pênaltis:** Ao surgir uma penalidade máxima, um popup interativo permite que você escolha qual jogador irá bater a falta.
* **Táticas & Substituições:** 
  * Seleção de formações consagradas (`4-3-3`, `4-4-2`, `3-5-2`, `5-3-2`).
  * Regra oficial de substituições: até **5 trocas** em **3 pausas** por partida.
  * Chance mínima ajustada para gol de goleiro com bola rolando.
