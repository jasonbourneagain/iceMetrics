# Player-related Flask routes

from flask import Blueprint, request, jsonify
from services.nhl_api import get_player_stats
from services.advanced_stats import get_advanced_stats


# Break the Flask app into modular parts (routes grouped by purpose)
players_blueprint = Blueprint('players', __name__)

# Player stats such as goals, assists, etc
@players_blueprint.route("/player-stats", methods=["GET"])
def player_stats():
    player_id = request.args.get("playerId")
    if not player_id:
        return jsonify({"error": "Missing playerId paramter"}), 400
    
    try:
        stats = get_player_stats(player_id)
        if stats:
            return jsonify(stats)
        else:
            return jsonify({"error": "No data found for this player ID"}), 404
    except Exception as e:
        return jsonify({"error: str(e)"}), 500
    
# Advanced player stats
@players_blueprint.route("/player-advanced", methods=["GET"])
def player_advanced():
    name = request.args.get("name")
    season = request.args.get("season", default="20242025") # default to current season 
    if not name:
        return jsonify({"error": "Missing player name"}), 400

    stats = get_advanced_stats(name, season)
    return jsonify(stats)

    
    
