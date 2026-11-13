
import { motion } from "motion/react";
import {
  Heart, LayoutDashboard, History, Bell, Phone,
  ArrowLeft, Clock, CalendarDays, Activity,
  CheckCircle2, Download
} from "lucide-react";
import { Link } from "react-router-dom";
import "./CheckinHistory.css";

function CheckinHistory() {
  return (
    <div className="history-page">
      <aside className="history-sidebar">
        <Link to="/" className="history-brand">
          <span className="history-brand-icon"><Heart size={22} /></span>
          <span>CureCare</span>
        </Link>

        <p className="history-menu-label">MAIN MENU</p>

        <Link to="/dashboard" className="history-nav-link">
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link to="/checkin-history" className="history-nav-link active">
          <History size={19} />
          Check-in History
        </Link>

        <Link to="/notifications" className="history-nav-link">
          <Bell size={19} />
          Notifications
        </Link>

        <Link to="/emergency-contacts" className="history-nav-link">
          <Phone size={19} />
          Emergency Contacts
        </Link>

        <div className="history-sidebar-bottom">
          <span className="history-sidebar-heart"><Heart size={18} /></span>
          <p>Care that keeps families connected.</p>
        </div>
      </aside>

      <main className="history-main">
        <header className="history-header">
          <div>
            <p className="history-eyebrow">MONITORING</p>
            <h1>Check-in History</h1>
            <p>View the records of physical safety check-ins.</p>
          </div>

          <Link to="/dashboard" className="history-back">
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </header>

        <div className="history-demo-notice">
          <Activity size={20} />
          <span>
            Demo preview — actual button-press records will appear
            here after backend integration.
          </span>
        </div>

        <section className="history-summary">
          <motion.div
            className="history-summary-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="history-summary-icon"><CalendarDays /></span>
            <div>
              <p>Total check-ins today</p>
              <h2>--</h2>
              <small>Waiting for device data</small>
            </div>
          </motion.div>

          <motion.div
            className="history-summary-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <span className="history-summary-icon"><Clock /></span>
            <div>
              <p>Last successful check-in</p>
              <h2>--</h2>
              <small>No records received yet</small>
            </div>
          </motion.div>

          <motion.div
            className="history-summary-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          >
            <span className="history-summary-icon"><CheckCircle2 /></span>
            <div>
              <p>Record status</p>
              <h2>Pending</h2>
              <small>Backend connection required</small>
            </div>
          </motion.div>
        </section>

        <section className="history-records">
          <div className="history-records-heading">
            <div>
              <h2>Button Press Records</h2>
              <p>Every successful physical button press will be listed here.</p>
            </div>
          </div>

          <div className="history-empty">
            <div className="history-empty-icon">
              <History size={35} />
            </div>
            <h3>No check-in records yet</h3>
            <p>
              Once the ESP32 device sends button-press information
              to CureCare, the date, time and status will appear here.
            </p>
            <span className="history-waiting">
              <span /> Waiting for backend data
            </span>
          </div>
        </section>

        <p className="history-footer">
          CureCare · Helping families stay connected through simple check-ins.
        </p>
      </main>
    </div>
  );
}

export default CheckinHistory;
