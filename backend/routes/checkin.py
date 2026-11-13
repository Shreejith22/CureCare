from flask import Blueprint, request, jsonify
from database import get_db_connection

checkin_bp = Blueprint("checkin", __name__)


# ESP32 HEARTBEAT
@checkin_bp.route("/heartbeat", methods=["POST"])
def heartbeat():

    data = request.get_json()

    if not data or not data.get("device_id"):
        return jsonify({"message": "Device ID is required"}), 400

    try:
        device_id = int(data["device_id"])
    except (ValueError, TypeError):
        return jsonify({"message": "Invalid device ID"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.execute(
            """
            UPDATE devices
            SET last_heartbeat = CURRENT_TIMESTAMP
            WHERE id = ?
            """,
            (device_id,)
        )

        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"message": "Device not found"}), 404

        return jsonify({
            "message": "Heartbeat received",
            "device_status": "ONLINE"
        }), 200

    finally:
        conn.close()


# PHYSICAL BUTTON CHECK-IN
@checkin_bp.route("/button", methods=["POST"])
def button_checkin():

    data = request.get_json()

    if not data or not data.get("device_id"):
        return jsonify({"message": "Device ID is required"}), 400

    try:
        device_id = int(data["device_id"])
    except (ValueError, TypeError):
        return jsonify({"message": "Invalid device ID"}), 400

    conn = get_db_connection()

    try:
        device = conn.execute(
            """
            SELECT elderly_id FROM devices
            WHERE id = ?
            """,
            (device_id,)
        ).fetchone()

        if device is None:
            return jsonify({"message": "Device not found"}), 404

        elderly_id = device["elderly_id"]

        cursor = conn.execute(
            """
            INSERT INTO checkins (elderly_id)
            VALUES (?)
            """,
            (elderly_id,)
        )

        conn.execute(
            """
            UPDATE devices
            SET last_heartbeat = CURRENT_TIMESTAMP
            WHERE id = ?
            """,
            (device_id,)
        )

        conn.execute(
            """
            UPDATE alerts
            SET status = 'RESOLVED'
            WHERE elderly_id = ? AND status = 'ACTIVE'
            """,
            (elderly_id,)
        )

        conn.commit()

        return jsonify({
            "message": "Button check-in successful",
            "checkin_id": cursor.lastrowid,
            "elderly_id": elderly_id
        }), 201

    finally:
        conn.close()