from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db_connection

emergency_bp = Blueprint("emergency", __name__)


# Create emergency alert
@emergency_bp.route("/<int:elderly_id>", methods=["POST"])
@jwt_required()
def create_emergency_alert(elderly_id):

    user_id = int(get_jwt_identity())

    data = request.get_json() or {}

    alert_type = data.get("alert_type", "SOS")
    message = data.get("message", "Emergency assistance required")

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
            return jsonify({
                "message": "Elderly member not found"
            }), 404

        cursor = conn.execute(
            """
            INSERT INTO alerts
            (elderly_id, alert_type, message)
            VALUES (?, ?, ?)
            """,
            (elderly_id, alert_type, message)
        )

        conn.commit()

        return jsonify({
            "message": "Emergency alert created successfully",
            "alert_id": cursor.lastrowid,
            "elderly_id": elderly_id,
            "status": "ACTIVE"
        }), 201

    finally:
        conn.close()


# Get emergency alerts
@emergency_bp.route("/<int:elderly_id>", methods=["GET"])
@jwt_required()
def get_emergency_alerts(elderly_id):

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
            return jsonify({
                "message": "Elderly member not found"
            }), 404

        alerts = conn.execute(
            """
            SELECT id, alert_type, message, status, created_at
            FROM alerts
            WHERE elderly_id = ?
            ORDER BY created_at DESC, id DESC
            """,
            (elderly_id,)
        ).fetchall()

        return jsonify({
            "elderly_id": elderly_id,
            "total_alerts": len(alerts),
            "alerts": [
                dict(alert) for alert in alerts
            ]
        }), 200

    finally:
        conn.close()