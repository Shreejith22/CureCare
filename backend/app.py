from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from apscheduler.schedulers.background import BackgroundScheduler

from database import create_tables

from routes.auth import auth_bp
from routes.elderly import elderly_bp
from routes.device import device_bp
from routes.checkin import checkin_bp
from routes.history import history_bp
from routes.emergency import emergency_bp

from monitor import check_missed_checkins


app = Flask(__name__)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "curecare-development-secret-change-later"

# Enable frontend communication
CORS(app)

# Initialize JWT
jwt = JWTManager(app)

# Register API routes
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(elderly_bp, url_prefix="/api/elderly")
app.register_blueprint(device_bp, url_prefix="/api/device")
app.register_blueprint(checkin_bp, url_prefix="/api/checkin")
app.register_blueprint(history_bp, url_prefix="/api/history")
app.register_blueprint(emergency_bp, url_prefix="/api/emergency")

# Create database tables
create_tables()


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to CureCare Backend!",
        "status": "Running successfully",
        "database": "Connected"
    })


if __name__ == "__main__":

    scheduler = BackgroundScheduler()

    scheduler.add_job(
        func=check_missed_checkins,
        trigger="interval",
        minutes=1,
        id="missed_checkin_monitor",
        replace_existing=True
    )

    scheduler.start()

    print("CareCue automatic monitoring started!")

    app.run(
        debug=True,
        port=5000,
        use_reloader=False
    )