# Handles the raw NHL API com munication

import requests


def get_player_stats(player_id, season="20242025"):
    url = f"https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=seasonId={season} and playerId={player_id}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    if data['data']:
        return data['data'][0]
    else:
        return None


def search_player_id(name):
    url = f"https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/{name}/1"
    r = requests.get(url)
    if r.status_code == 200:
        result = r.json()
        print(result)
    else:
        print("Error fetching player ID")