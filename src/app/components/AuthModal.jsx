"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser, registerUser } from "../utils/api"; // ✅ make sure path is correct
import styles from "./authModal.module.css";
import { useAlert } from "./alert/alertProvider"; // ✅ custom toast

export default function AuthModal({ mode, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ general: "" });
  const { showAlert } = useAlert(); // ✅ custom toast

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError({ general: "" });

    try {
      let response;

      if (mode === "login") {
        response = await loginUser({ email, password });
        console.log("Login response:", response);

        if (response?.success && response?.data?.access_token) {
          localStorage.setItem("authToken", response.data.access_token);

          showAlert({ 
            message: "Logged in successfully!", 
            type: "success", 
            autoDismiss: true,
            duration: 3000
          });

          onLoginSuccess?.();
          onClose?.();
        } else {
          setError({ general: response?.message || "Login failed!" });
          showAlert({ 
            message: response?.message || "Login failed!", 
            type: "error", 
            autoDismiss: true 
          });
        }

      } else {
        response = await registerUser({ email, password });
        console.log("Register response:", response);

        if (response?.success) {
          showAlert({ 
            message: "Registered successfully! Please login.", 
            type: "success", 
            autoDismiss: true 
          });
          onClose?.(); // close modal
        } else {
          setError({ general: response?.message || "Registration failed!" });
          showAlert({ 
            message: response?.message || "Registration failed!", 
            type: "error", 
            autoDismiss: true 
          });
        }
      }

    } catch (err) {
      console.error(err);
      setError({ general: "Server error. Please try again later." });
      showAlert({ 
        message: "Server error. Please try again later.", 
        type: "error", 
        autoDismiss: true 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={120} height={50} className={styles.logo} />

        {/* Headings */}
        <div className={styles.headings}>
          <h3>{mode === "login" ? "Welcome Back!" : "Create Account"}</h3>
          <p>{mode === "login" ? "Sign in to access your account" : "Sign up to get started"}</p>
        </div>

        {/* Social login buttons */}
        <div className={styles.socialOptions}>
          <button className={styles.googleBtn}>
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Continue with Google
          </button>
          <button className={styles.facebookBtn}>
            <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
            Continue with Facebook
          </button>
        </div>

        <div className={styles.divider}>Or continue with email</div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <FaLock />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error.general && <div className={styles.errorBox}>{error.general}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
