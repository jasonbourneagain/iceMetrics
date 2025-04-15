# Player-related Flask routes

from flask import Blueprint, request, jsonify
from services.nhl_api import get_player_stats

players_blueprint = Blueprint('players', __name__)

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
    
    