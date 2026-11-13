from database import get_db_connection


def check_missed_checkins():
    conn = get_db_connection()

    try:
        elderly_members = conn.execute("""
            SELECT
                e.id AS elderly_id,
                (
                    julianday('now') -
                    julianday(
                        COALESCE(
                            (
                                SELECT MAX(c.created_at)
                                FROM checkins c
                                WHERE c.elderly_id = e.id
                            ),
                            e.created_at
                        )
                    )
                ) * 1440 AS minutes_since_checkin
            FROM elderly_members e
        """).fetchall()

        for member in elderly_members:
            elderly_id = member["elderly_id"]
            minutes = member["minutes_since_checkin"]

            if minutes is None:
                continue

            active_alert = conn.execute("""
                SELECT id, alert_type
                FROM alerts
                WHERE elderly_id = ?
                AND alert_type IN (
                    'MISSED_CHECKIN_WARNING',
                    'MISSED_CHECKIN_CRITICAL'
                )
                AND status = 'ACTIVE'
                ORDER BY id DESC
                LIMIT 1
            """, (elderly_id,)).fetchone()

            if minutes >= 90:

                if active_alert:
                    if active_alert["alert_type"] == "MISSED_CHECKIN_WARNING":
                        conn.execute("""
                            UPDATE alerts
                            SET alert_type = 'MISSED_CHECKIN_CRITICAL',
                                message = ?
                            WHERE id = ?
                        """, (
                            "Critical: No check-in received for 1 hour 30 minutes.",
                            active_alert["id"]
                        ))

                else:
                    conn.execute("""
                        INSERT INTO alerts
                        (elderly_id, alert_type, message)
                        VALUES (?, ?, ?)
                    """, (
                        elderly_id,
                        "MISSED_CHECKIN_CRITICAL",
                        "Critical: No check-in received for 1 hour 30 minutes."
                    ))

            elif minutes >= 60:

                if not active_alert:
                    conn.execute("""
                        INSERT INTO alerts
                        (elderly_id, alert_type, message)
                        VALUES (?, ?, ?)
                    """, (
                        elderly_id,
                        "MISSED_CHECKIN_WARNING",
                        "Warning: No check-in received for 1 hour."
                    ))

        conn.commit()

    finally:
        conn.close()