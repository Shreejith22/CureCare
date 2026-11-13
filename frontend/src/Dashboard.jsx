import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Heart, ShieldCheck, Activity, Clock, Wifi,
  Bell, Users, Phone, CalendarDays, ArrowUpRight,
  CheckCircle2, AlertCircle, Menu
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
      const savedUser = JSON.parse(
    localStorage.getItem("curecareUser") || "{}"
  );

  const userName = savedUser.name || "CureCare User";
  const activities = [
    { time: "09:30 AM", title: "Morning check-in", detail: "Physical button pressed", status: "Received" },
    { time: "08:00 AM", title: "Device connection", detail: "ESP32 connection recorded", status: "Online" },
    { time: "Yesterday", title: "Evening check-in", detail: "Physical button pressed", status: "Received" },
  ];

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-brand">
  <Heart size={27} />
  <span>CureCare</span>
</Link>
        <p className="sidebar-label">MAIN MENU</p>
       <Link to="/dashboard" className="sidebar-link active">
  <Activity size={19} /> Dashboard
</Link>

<Link to="/checkin-history" className="sidebar-link">
  <Clock size={19} /> Check-in History
</Link>

<Link to="/notifications" className="sidebar-link">
  <Bell size={19} /> Notifications
</Link>

<Link to="/emergency-contacts" className="sidebar-link">
  <Users size={19} /> Emergency Contacts
</Link>
        <div className="sidebar-bottom">
          <ShieldCheck size={22} />
          <p>Care begins with connection.</p>
          <small>Every check-in matters.</small>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-greeting">FAMILY MONITORING</span>
            <h1>Family Dashboard</h1>
            <p>Stay connected with your loved one's daily check-ins.</p>
          </div>
          <div className="dashboard-user">
  <div className="user-avatar"><Users size={23} /></div>
  <div>
    <strong>{userName}</strong>
    <small>Demo account</small>
  </div>
</div>
        </header>

        <div className="dashboard-demo-notice">
          <AlertCircle size={18} />
          Demo preview — live device and safety information will appear after backend integration.
        </div>

        <section className="elder-profile">
          <div className="elder-avatar"><Heart size={38} /></div>
          <div className="elder-details">
            <span>ELDERLY MEMBER</span>
            <h2>Senior Family Member</h2>
            <p>Profile information will be provided by your registered account.</p>
          </div>
          <div className="profile-status">
            <span className="status-dot" />
            Demo profile
          </div>
        </section>

        <section className="dashboard-stats">
          <Stat icon={<Activity />} label="Today's Check-ins" value="--" note="Waiting for device data" />
          <Stat icon={<Clock />} label="Last Button Press" value="--" note="No live data yet" />
          <Stat icon={<ShieldCheck />} label="Safety Status" value="Pending" note="Awaiting backend status" />
          <Stat icon={<Wifi />} label="ESP32 Device" value="Unknown" note="Connection not verified" />
        </section>

        <div className="dashboard-content-grid">
          <section className="dashboard-panel activity-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">RECENT UPDATES</span>
                <h3>Check-in Activity</h3>
              </div>
              <Clock size={22} />
            </div>

            <div className="activity-empty">
              <Activity size={30} />
              <strong>Waiting for real activity</strong>
              <p>Button press history will appear here when the ESP32 backend is connected.</p>
            </div>

            <div className="activity-list">
              {activities.map((item, index) => (
                <div className="activity-item" key={index}>
                  <div className="activity-check"><CheckCircle2 size={18} /></div>
                  <div className="activity-info">
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <span>{item.time}</span>
                </div>
              ))}
              <p className="demo-label">Illustrative examples only — not actual device events.</p>
            </div>
          </section>

          <section className="dashboard-panel notification-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">STAY INFORMED</span>
                <h3>Notifications</h3>
              </div>
              <Bell size={22} />
            </div>

            <div className="notification-empty">
              <div className="notification-icon"><Bell size={28} /></div>
              <strong>No live notifications</strong>
              <p>Backend-generated alerts will be displayed here.</p>
            </div>
          </section>
        </div>

        <section className="dashboard-panel emergency-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">IMPORTANT INFORMATION</span>
              <h3>Emergency Contacts</h3>
            </div>
            <Phone size={22} />
          </div>

          <div className="emergency-placeholder">
            <div className="emergency-icon"><Users size={25} /></div>
            <div>
              <strong>Registered contacts will appear here</strong>
              <p>Family members, hospital details and emergency numbers will be loaded from your account.</p>
            </div>
            <ArrowUpRight size={20} />
          </div>
        </section>

        <footer className="dashboard-footer">
          <Heart size={16} /> CureCare — Thoughtful technology. Connected families.
        </footer>
      </main>
    </div>
  );
}

function Stat({ icon, label, value, note }) {
  return (
    <motion.div
      className="dashboard-stat-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <ArrowUpRight size={18} />
      </div>
      <span>{label}</span>
      <h2>{value}</h2>
      <small>{note}</small>
    </motion.div>
  );
}

export default Dashboard;
