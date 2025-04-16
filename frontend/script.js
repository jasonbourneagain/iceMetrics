// Handle fetch and display

document.getElementById('player-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nameInput = document.getElementById('playerName').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Searching...";
  
    try {
      // 1. Search player by name
      const searchUrl = `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=25&q=${encodeURIComponent(nameInput)}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
  
      if (!searchData || searchData.length === 0) {
        resultDiv.innerHTML = `<p style="color:red;">No player found for '${nameInput}'</p>`;
        return;
      }
  
      const normalizedInput = nameInput.trim().toLowerCase();
  
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
      const playerName = match.name;
  
      // 2. Fetch basic stats
      const statsRes = await fetch(`http://127.0.0.1:5000/player-stats?playerId=${playerId}`);
      const stats = await statsRes.json();
  
      // 3. Fetch advanced stats
      const advancedRes = await fetch(`http://127.0.0.1:5000/player-advanced?name=${encodeURIComponent(playerName)}&season=20242025`);
      const advanced = await advancedRes.json();

      // grab headshot image of corresponding player
      const playerImageUrl = `https://assets.nhle.com/mugs/nhl/latest/${playerId}.png`;


  
      if (stats.error) {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${stats.error}</p>`;
        return;
      }
  
      // 4. Display everything
      resultDiv.innerHTML = `
        <h2>${stats.skaterFullName}</h2>
        <img src="${playerImageUrl}" alt="${stats.skaterFullName}" width="150" style="border-radius:  8px; margin-bottom: 1rem;">
        <p><strong>Team:</strong> ${stats.teamAbbrevs}</p>
        <p><strong>Games Played:</strong> ${stats.gamesPlayed}</p>
        <p><strong>Goals:</strong> ${stats.goals}</p>
        <p><strong>Assists:</strong> ${stats.assists}</p>
        <p><strong>Points:</strong> ${stats.points}</p>
      `;
  
      if (advanced && !advanced.error) {
        resultDiv.innerHTML += `<h3>Advanced Stats (Natural Stat Trick)</h3>`;
        for (const [key, value] of Object.entries(advanced)) {
          if (key !== "Player") {
            resultDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
          }
        }
      } else {
        resultDiv.innerHTML += `<p>No advanced stats found.</p>`;
      }
  
    } catch (err) {
      resultDiv.innerHTML = `<p style="color:red;">Fetch failed: ${err.message}</p>`;
    }
  });
  