
import { motion } from "motion/react";
import {
  Heart,
  ShieldCheck,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();

    const savedUser = JSON.parse(
      localStorage.getItem("curecareUser") || "null"
    );

    if (!savedUser) {
      alert("No demo account found. Please create an account first.");
      return;
    }

    if (email.toLowerCase() !== savedUser.email.toLowerCase()) {
      alert("Email does not match the registered demo account.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
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
          <h1>Welcome Back</h1>
          <p>Stay connected. Stay reassured. Your family matters.</p>
        </div>

        <form onSubmit={handleLogin}>
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

          <label>Password</label>
          <div className="auth-input">
            <Lock size={19} />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Login to Your Account
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>

        <p className="auth-security">
          <ShieldCheck size={15} /> Your family's safety comes first.
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
