// Handle fetch and display

document.getElementById('player-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('playerName').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = "Searching...";

    try {
        // Search player name -> return player ID

        const nameParts = nameInput.trim().split(" ");
        const searchTerm = nameParts[nameParts.length - 1]; // gets last name (e.g. "Hughes")
        const searchUrl = `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=25&q=${encodeURIComponent(nameInput)}`;


        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        console.log("Search API results:", searchData);


        if (!searchData || searchData.length === 0) {
            resultDiv.innerHTML = `<p style="color:red;">No player found for '${nameInput}'</p>`;
            return;
        }

        const normalizedInput = nameInput.trim().toLowerCase();

        searchData.forEach(player => {
            console.log("Comparing:", player.name.trim().toLowerCase(), "vs", normalizedInput);
          });
          
        let match = searchData.find(player =>
            player.name.trim().toLowerCase() === normalizedInput
        );

        if (!match) {
            match = searchData.find(player =>
            player.name.trim().toLowerCase().includes(normalizedInput)
            );
        }


        if (!match) {
            resultDiv.innerHTML = `<p style="color:red;">No match found for '${nameInput}'</p>`;
            return;
        }

        const playerId = match.playerId;
        console.log(`Matched player: ${match.name} (ID: ${playerId})`);

          
          

        // fetch player stats from backend
        const statsRes = await fetch(`http://127.0.0.1:5000/player-stats?playerId=${playerId}`);
        const stats = await statsRes.json();


        if (stats.error) {
            resultDiv.innerHTML = `<p style="color:red;">Error: ${stats.error}</p>`;

        } else {
            resultDiv.innerHTML = `
                <h2>${stats.skaterFullName}</h2>
                <p><strong>Team:</strong> ${stats.teamAbbrevs}</p>
                <p><strong>Goals:</strong> ${stats.goals}</p>
                <p><strong>Assists:</strong> ${stats.assists}</p>
                <p><strong>Points:</strong> ${stats.points}</p>
                <p><strong>Games Played:</strong> ${stats.gamesPlayed}</p>
            `;
        }
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Fetch failed: ${err.message}</p>`;
    }
});