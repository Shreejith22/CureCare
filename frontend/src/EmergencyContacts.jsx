
import { motion } from "motion/react";
import {
  Heart, LayoutDashboard, History, Bell, Phone,
  ArrowLeft, UserRound, Hospital, ShieldCheck,
  PhoneCall, Plus, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import "./EmergencyContacts.css";

function EmergencyContacts() {
  return (
    <div className="contacts-page">
      <aside className="contacts-sidebar">
        <Link to="/" className="contacts-brand">
          <span><Heart size={22} /></span>
          CureCare
        </Link>

        <p className="contacts-menu-label">MAIN MENU</p>

        <Link to="/dashboard" className="contacts-nav">
          <LayoutDashboard size={19} /> Dashboard
        </Link>
        <Link to="/checkin-history" className="contacts-nav">
          <History size={19} /> Check-in History
        </Link>
        <Link to="/notifications" className="contacts-nav">
          <Bell size={19} /> Notifications
        </Link>
        <Link to="/emergency-contacts" className="contacts-nav active">
          <Phone size={19} /> Emergency Contacts
        </Link>

        <div className="contacts-sidebar-bottom">
          <Heart size={19} />
          <p>Care that keeps families connected.</p>
        </div>
      </aside>

      <main className="contacts-main">
        <header className="contacts-header">
          <div>
            <span className="contacts-eyebrow">IMPORTANT INFORMATION</span>
            <h1>Emergency Contacts</h1>
            <p>Keep important people and emergency services accessible.</p>
          </div>

          <Link to="/dashboard" className="contacts-back">
            <ArrowLeft size={17} /> Dashboard
          </Link>
        </header>

        <div className="contacts-demo">
          <ShieldCheck size={21} />
          <p>
            Demo preview — family and hospital contact details
            must be configured before they can be used.
          </p>
        </div>

        <section className="contacts-section">
          <div className="contacts-section-heading">
            <div>
              <span className="contacts-eyebrow">YOUR SUPPORT NETWORK</span>
              <h2>Family Contacts</h2>
              <p>People who can be contacted when support is needed.</p>
            </div>
            <UserRound size={27} />
          </div>

          <div className="contact-placeholder-grid">
            <motion.article
              className="contact-placeholder"
              whileHover={{ y: -4 }}
            >
              <div className="contact-avatar"><UserRound /></div>
              <div>
                <h3>Primary Family Contact</h3>
                <p>Contact details not configured</p>
                <span className="contact-status">Not configured</span>
              </div>
            </motion.article>

            <motion.article
              className="contact-placeholder"
              whileHover={{ y: -4 }}
            >
              <div className="contact-avatar"><UserRound /></div>
              <div>
                <h3>Secondary Family Contact</h3>
                <p>Contact details not configured</p>
                <span className="contact-status">Not configured</span>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="contacts-section">
          <div className="contacts-section-heading">
            <div>
              <span className="contacts-eyebrow">HEALTHCARE SUPPORT</span>
              <h2>Hospital Information</h2>
              <p>Keep your preferred hospital details available.</p>
            </div>
            <Hospital size={29} />
          </div>

          <div className="hospital-placeholder">
            <div className="hospital-icon"><Hospital size={27} /></div>
            <div className="hospital-info">
              <h3>Preferred Hospital</h3>
              <p>Hospital name and phone number not configured.</p>
              <span><MapPin size={14} /> Address not added</span>
            </div>
            <span className="contact-status">Not configured</span>
          </div>
        </section>

        <section className="emergency-call-section">
          <div className="emergency-call-icon">
            <PhoneCall size={27} />
          </div>
          <div className="emergency-call-info">
            <span>INDIA EMERGENCY HELPLINE</span>
            <h2>112</h2>
            <p>National emergency response number.</p>
          </div>
          <a href="tel:112" className="emergency-call-button">
            <Phone size={17} /> Call 112
          </a>
        </section>

        <section className="alert-resolution">
          <div className="resolution-icon"><ShieldCheck size={24} /></div>
          <div>
            <h3>Alert Resolution Status</h3>
            <p>
              Backend-reported alert resolution information will
              appear here after integration.
            </p>
            <span>Awaiting backend data</span>
          </div>
        </section>

        <p className="contacts-footer">
          CureCare · Helping families stay connected.
        </p>
      </main>
    </div>
  );
}

export default EmergencyContacts;
