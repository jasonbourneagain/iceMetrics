from flask import Flask
from routes.players import players_blueprint
from services.nhl_api import get_player_stats
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # enables CORS for all routes
app.register_blueprint(players_blueprint)

# hardcoded player_id as Connor McDavid for initial testing of the API
if __name__ == "__main__":
    app.run(debug=True)
    player_id = 8478402  # Connor McDavid
    stats = get_player_stats(player_id)
    if stats:
       print(f"{stats['skaterFullName']} - {stats['goals']} G, {stats['assists']} A, {stats['points']} PTS")

    else:
        print("Player stats not found.")
