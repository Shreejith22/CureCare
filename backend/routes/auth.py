from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import get_db_connection

auth_bp = Blueprint("auth", __name__)

# FAMILY SIGNUP
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request data is required"}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    if not name or not email or not phone or not password:
        return jsonify({"message": "All fields are required"}), 400

    if len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400

    hashed_password = generate_password_hash(password)
    conn = get_db_connection()

    try:
        conn.execute(
            """
            INSERT INTO users (name, email, phone, password)
            VALUES (?, ?, ?, ?)
            """,
            (name, email, phone, hashed_password)
        )
        conn.commit()

        return jsonify({
            "message": "Registration successful"
        }), 201

    except Exception as error:
        if "UNIQUE constraint failed" in str(error):
            return jsonify({"message": "Email already registered"}), 409

        return jsonify({"message": "Registration failed"}), 500

    finally:
        conn.close()


# FAMILY LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request data is required"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    conn = get_db_connection()

    try:
        user = conn.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if user is None or not check_password_hash(user["password"], password):
            return jsonify({"message": "Invalid email or password"}), 401

        access_token = create_access_token(
            identity=str(user["id"])
        )

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "phone": user["phone"]
            }
        }), 200

    finally:
        conn.close()