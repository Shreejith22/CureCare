from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db_connection

device_bp = Blueprint("device", __name__)


# REGISTER ESP32 DEVICE
@device_bp.route("/register", methods=["POST"])
@jwt_required()
def register_device():

    data = request.get_json()

    if not data:
        return jsonify({"message": "Request data is required"}), 400

    elderly_id = data.get("elderly_id")
    device_name = data.get("device_name", "CureCare ESP32")

    if not elderly_id:
        return jsonify({"message": "Elderly ID is required"}), 400

    try:
        elderly_id = int(elderly_id)
    except (ValueError, TypeError):
        return jsonify({"message": "Invalid elderly ID"}), 400

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

        cursor = conn.execute(
            """
            INSERT INTO devices (elderly_id, device_name, last_heartbeat)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            """,
            (elderly_id, device_name)
        )

        conn.commit()

        return jsonify({
            "message": "ESP32 device registered successfully",
            "device_id": cursor.lastrowid,
            "device_name": device_name,
            "elderly_id": elderly_id
        }), 201

    finally:
        conn.close()