from services.nhl_api import get_player_stats

#hardcoded player_id as Connor McDavid for initial testing of the API
if __name__ == "__main__":
    player_id = 8478402  # Connor McDavid
    stats = get_player_stats(player_id)
    if stats:
       print(f"{stats['skaterFullName']} - {stats['goals']} G, {stats['assists']} A, {stats['points']} PTS")

    else:
        print("Player stats not found.")
