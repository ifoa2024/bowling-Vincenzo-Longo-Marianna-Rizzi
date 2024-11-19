let bowling = {
    players: [
        { name: 'Nicola', scores: [] },
        { name: 'Luca', scores: [] },
        { name: 'Matteo', scores: [] }, 
    ],
};

let currentTurn = 0;
let currentPlayerIndex = 0;
let isThirdPlayerAdded = false;  
const maxTurns = 10;

function updateLeaderboard() {
    const tbody = document.getElementById('playerRows');
    tbody.innerHTML = '';
    const playersToDisplay = isThirdPlayerAdded ? bowling.players : bowling.players.slice(0, 2);
    const scoredPlayers = playersToDisplay.map(player => ({
        ...player,
        totalScore: player.scores.reduce((sum, score) => sum + score, 0),
    }));
    scoredPlayers.sort((a, b) => b.totalScore - a.totalScore);
    scoredPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${player.name}</td>
            <td class="border border-gray-300 px-4 py-2">${player.scores.join(', ')}</td>
            <td class="border border-gray-300 px-4 py-2">${player.scores.reduce((sum, score) => sum + score, 0)}</td>
        `;
        tbody.appendChild(row);
    });
}

function showModal(playerName) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `Turno di: ${playerName}`;
    modal.classList.remove('hidden');
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

function rollForPlayer() {
    const score = Math.floor(Math.random() * 11);
    bowling.players[currentPlayerIndex].scores.push(score);
    currentPlayerIndex = (currentPlayerIndex + 1) % (isThirdPlayerAdded ? bowling.players.length : 2);
    if (currentPlayerIndex === 0) {
        currentTurn++;
    }
    hideModal();
    updateLeaderboard();
    if (currentTurn < maxTurns) {
        const nextPlayer = bowling.players[currentPlayerIndex];
        showModal(nextPlayer.name);
    } else {
        alert("Partita terminata! Controlla la classifica per il vincitore.");
    }
}

function toggleThirdPlayer() {
    const button = document.getElementById('togglePlayer');
    if (isThirdPlayerAdded) {
        isThirdPlayerAdded = false;
        button.textContent = 'Aggiungi Giocatore';
        button.classList.remove('bg-red-500');
        button.classList.add('bg-green-500');
    } else {
        isThirdPlayerAdded = true;
        button.textContent = 'Rimuovi Giocatore';
        button.classList.remove('bg-green-500');
        button.classList.add('bg-red-500');
    }
    updateLeaderboard();
}

document.getElementById('startGame').addEventListener('click', () => {
    bowling.players.forEach(player => (player.scores = []));
    currentTurn = 0;
    currentPlayerIndex = 0;
    updateLeaderboard();
    showModal(bowling.players[0].name);
});

document.getElementById('rollButton').addEventListener('click', rollForPlayer);

document.getElementById('togglePlayer').addEventListener('click', toggleThirdPlayer);

updateLeaderboard();
