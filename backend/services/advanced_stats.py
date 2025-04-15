# parse MoneyPuck CSV data for players advanced statistics.

from io import StringIO
import requests
import pandas as pd
from bs4 import BeautifulSoup

def get_advanced_stats(player_name, season):
    url = (
        f"https://www.naturalstattrick.com/playerteams.php?"
        f"season={season}&stype=2&sit=5v5&score=all&team=ALL&pos=S&loc=all"
    )
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    # Grab ALL tables and find the one that actually contains data
    all_tables = soup.find_all("table")
    
    # Parse each table until we find one that contains the expected columns
    for table in all_tables:
        try:
            df = pd.read_html(StringIO(str(table)))[0]
            if "Player" in df.columns or "Name" in df.columns:
                break  # found the good one
        except Exception:
            continue
    else:
        return {"error": "No valid stats table found on the page."}

    # Choose column name dynamically
    name_col = "Player" if "Player" in df.columns else "Name"

    # Now filter by player
    player_row = df[df[name_col].str.contains(player_name, case=False, na=False)]

    if not player_row.empty:
        keep_keys = [
            "Player", "Team", "GP", "TOI",
            "CF", "CA", "CF%", "FF%", 
            "xGF", "xGA", "xGF%", 
            "SCF", "HDCF", "HDCF%", 
            "PDO", "On-Ice SH%", "On-Ice SV%"
        ]

        player_data = player_row.iloc[0].to_dict()
        filtered = {k: player_data[k] for k in keep_keys if k in player_data}
        return filtered

    else:
        return {"error": f"No stats found for player '{player_name}'"}
