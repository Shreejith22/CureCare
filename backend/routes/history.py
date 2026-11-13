from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db_connection

history_bp = Blueprint("history", __name__)


@history_bp.route("/<int:elderly_id>", methods=["GET"])
@jwt_required()
def get_checkin_history(elderly_id):

    user_id = int(get_jwt_identity())

    conn = get_db_connection()

    try:
        elderly = conn.execute(
            """
            SELECT id FROM elderly_members
            WHERE id = ? AND user_id = ?
            """,
            (elderly_id, user_id)
        ).fetchone()

        if elderly is None:
            return jsonify({"message": "Elderly member not found"}), 404

        records = conn.execute(
            """
            SELECT id, created_at
            FROM checkins
            WHERE elderly_id = ?
            ORDER BY created_at DESC, id DESC
            """,
            (elderly_id,)
        ).fetchall()

        today_count = conn.execute(
            """
            SELECT COUNT(*) AS total
            FROM checkins
            WHERE elderly_id = ?
            AND date(created_at, 'localtime') = date('now', 'localtime')
            """,
            (elderly_id,)
        ).fetchone()["total"]

        last_checkin = records[0]["created_at"] if records else None

        return jsonify({
            "elderly_id": elderly_id,
            "total_checkins_today": today_count,
            "last_checkin": last_checkin,
            "history": [
                {
                    "checkin_id": record["id"],
                    "created_at": record["created_at"]
                }
                for record in records
            ]
        }), 200

    finally:
        conn.close()