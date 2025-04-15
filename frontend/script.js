// Handle fetch and display

document.getElementById('player-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const playerId = document.getElementById('playerId').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(`http://127.0.0.1:5000/player-stats?playerId=${playerId}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;

        } else {
            resultDiv.innerHTML = `
                <h2>${data.skaterFullName}</h2>
                <p><strong>Team:</strong> ${data.teamAbbrevs}</p>
                <p><strong>Goals:</strong> ${data.goals}</p>
                <p><strong>Assists:</strong> ${data.assists}</p>
                <p><strong>Points:</strong> ${data.points}</p>
                <p><strong>Games Played:</strong> ${data.gamesPlayed}</p>
            `;
        }
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Fetch failed: ${err.message}</p>`;
    }
});