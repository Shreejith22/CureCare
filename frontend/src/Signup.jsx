
import { motion } from "motion/react";
import {
  Heart,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();

  const user = {
    name,
    email,
    phone,
  };

  localStorage.setItem("curecareUser", JSON.stringify(user));

  navigate("/dashboard");
};

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card signup-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="auth-back">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="auth-logo">
          <div className="auth-logo-icon">
            <Heart size={27} />
          </div>
          <span>CureCare</span>
        </div>

        <div className="auth-heading">
          <div className="auth-shield">
            <ShieldCheck size={30} />
          </div>
          <h1>Create Account</h1>
          <p>Join CureCare and stay connected with your loved ones.</p>
        </div>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <div className="auth-input">
            <User size={19} />
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <label>Email Address</label>
          <div className="auth-input">
            <Mail size={19} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <label>Phone Number</label>
          <div className="auth-input">
            <Phone size={19} />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <label>Password</label>
          <div className="auth-input">
            <Lock size={19} />
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Create My Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <p className="auth-security">
          <ShieldCheck size={15} /> Your family's safety comes first.
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
