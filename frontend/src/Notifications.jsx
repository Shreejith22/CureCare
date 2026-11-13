
import { motion } from "motion/react";
import {
  Heart, LayoutDashboard, History, Bell, Phone,
  ArrowLeft, Clock, ShieldCheck, WifiOff,
  AlertTriangle, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Notifications.css";

const statuses = [
  {
    name: "NORMAL",
    description: "A successful check-in was received within the expected time.",
    icon: CheckCircle2,
    className: "normal"
  },
  {
    name: "WARNING",
    description: "No physical button press has been received for 1 hour.",
    icon: Clock,
    className: "warning"
  },
  {
    name: "CRITICAL",
    description: "No physical button press has been received for 1 hour and 30 minutes. Family should verify the person's safety.",
    icon: AlertTriangle,
    className: "critical"
  },
  {
    name: "RESOLVED",
    description: "A new successful check-in was received after an alert.",
    icon: ShieldCheck,
    className: "resolved"
  },
  {
    name: "DEVICE OFFLINE",
    description: "The ESP32 device is disconnected or not communicating.",
    icon: WifiOff,
    className: "offline"
  }
];

function Notifications() {
  return (
    <div className="notifications-page">
      <aside className="notifications-sidebar">
        <Link to="/" className="notifications-brand">
          <span><Heart size={22} /></span>
          CureCare
        </Link>

        <p className="notifications-menu-label">MAIN MENU</p>

        <Link to="/dashboard" className="notifications-nav">
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link to="/checkin-history" className="notifications-nav">
          <History size={19} />
          Check-in History
        </Link>

        <Link to="/notifications" className="notifications-nav active">
          <Bell size={19} />
          Notifications
        </Link>

        <Link to="/emergency-contacts" className="notifications-nav">
          <Phone size={19} />
          Emergency Contacts
        </Link>

        <div className="notifications-sidebar-bottom">
          <Heart size={19} />
          <p>Care that keeps families connected.</p>
        </div>
      </aside>

      <main className="notifications-main">
        <header className="notifications-header">
          <div>
            <span className="notifications-eyebrow">STAY INFORMED</span>
            <h1>Notifications</h1>
            <p>Stay updated about check-ins and device connectivity.</p>
          </div>

          <Link to="/dashboard" className="notifications-back">
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </header>

        <div className="notifications-demo">
          <Bell size={20} />
          <p>
            Demo preview — notifications will appear here when
            the backend receives and processes device information.
          </p>
        </div>

        <motion.section
          className="notifications-empty-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="notifications-empty-icon">
            <Bell size={34} />
          </div>
          <h2>No notifications yet</h2>
          <p>
            There are no backend-generated alerts to display.
            New notifications will appear here when available.
          </p>
          <span className="notifications-waiting">
            <span />
            Waiting for backend data
          </span>
        </motion.section>

        <section className="status-guide">
          <div className="status-guide-heading">
            <div>
              <span className="notifications-eyebrow">UNDERSTANDING ALERTS</span>
              <h2>Safety Status Guide</h2>
              <p>Understand what each backend-reported status means.</p>
            </div>
            <ShieldCheck size={30} />
          </div>

          <div className="status-guide-grid">
            {statuses.map((status, index) => {
              const Icon = status.icon;

              return (
                <motion.article
                  className="status-guide-card"
                  key={status.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.08 }
                  }}
                >
                  <div className={`status-guide-icon ${status.className}`}>
                    <Icon size={21} />
                  </div>
                  <div>
                    <span className={`status-label ${status.className}`}>
                      {status.name}
                    </span>
                    <p>{status.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <p className="notifications-footer">
          CureCare · Simple check-ins. Better family connection.
        </p>
      </main>
    </div>
  );
}

export default Notifications;
