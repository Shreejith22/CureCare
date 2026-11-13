from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db_connection

elderly_bp = Blueprint("elderly", __name__)

@elderly_bp.route("/add", methods=["POST"])
@jwt_required()
def add_elderly():

    data = request.get_json()

    if not data:
        return jsonify({"message": "Request data is required"}), 400

    name = data.get("name", "").strip()
    age = data.get("age")

    if not name or age is None:
        return jsonify({"message": "Name and age are required"}), 400

    try:
        age = int(age)
    except (ValueError, TypeError):
        return jsonify({"message": "Age must be a valid number"}), 400

    if age < 1 or age > 120:
        return jsonify({"message": "Enter a valid age"}), 400

    user_id = int(get_jwt_identity())

    conn = get_db_connection()

    try:
        cursor = conn.execute(
            """
            INSERT INTO elderly_members (user_id, name, age)
            VALUES (?, ?, ?)
            """,
            (user_id, name, age)
        )

        conn.commit()

        return jsonify({
            "message": "Elderly member registered successfully",
            "elderly_id": cursor.lastrowid,
            "name": name,
            "age": age
        }), 201

    finally:
        conn.close()