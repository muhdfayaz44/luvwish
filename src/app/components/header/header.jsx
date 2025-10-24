"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import { BsHeart, BsPerson, BsBag, BsGift, BsList, BsPower } from "react-icons/bs";
import { useAlert } from "../alert/alertProvider";
import AuthModal from "../AuthModal";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { showAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
        setIsLoggedIn(true);
    }
    }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

function handleLogout() {
  localStorage.removeItem("authToken");
  setIsLoggedIn(false);
  
  showAlert({
    message: "Logged out successfully!",
    type: "success",   
    autoDismiss: true,
    duration: 3000   
  });
}

  return (
    <header className={styles.mainHeader}>
      {/* Top banner */}
      <div className={styles.label}>
        <p>
          <span><BsGift /></span>
          Free delivery on orders above ₹499
          <span> Subscribe & save 10%</span>
        </p>
      </div>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link href="/" className={styles.brand}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={130}
              height={34}
              className={styles.logo}
            />
          </Link>

          {/* Menu Links */}
          <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
            <ul>
              <li><Link href="/" className={styles.navLink}>Home</Link></li>
              <li><Link href="/products" className={styles.navLink}>Products</Link></li>
              <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
              <li><Link href="/about" className={styles.navLink}>About Us</Link></li>
            </ul>

            {/* Mobile user icons */}
            {isLoggedIn && isMobile && (
              <ul className={styles.mobileUserIcons}>
                <li><BsHeart /></li>
                <li><BsPerson /></li>
                <li><BsBag /></li>
                <li title="Logout">
                  <button onClick={handleLogout}><BsPower /></button>
                </li>
              </ul>
            )}
          </div>

          {/* Desktop User Section */}
          {!isMobile && (
            <div className={styles.userSection}>
              {!isLoggedIn ? (
                <>
                  <button
                    className={styles.loginButton}
                    onClick={() => { setMode("login"); setShowModal(true); }}
                  >
                    Login
                  </button>
                  <button
                    className={styles.registerButton}
                    onClick={() => { setMode("register"); setShowModal(true); }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <ul className={styles.userIcons}>
                  <li title="Wishlist"><BsHeart /></li>
                  <li title="Profile"><BsPerson /></li>
                  <li title="Cart"><BsBag /></li>
                  <li title="Logout">
                    <button onClick={handleLogout}><BsPower /></button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Mobile actions */}
          {isMobile && (
            <div className={styles.mobileActions}>
              {!isLoggedIn && (
                <>
                  <button
                    className={styles.loginButton}
                    onClick={() => { setMode("login"); setShowModal(true); }}
                  >
                    Login
                  </button>
                  <button
                    className={styles.registerButton}
                    onClick={() => { setMode("register"); setShowModal(true); }}
                  >
                    Register
                  </button>
                </>
              )}
              <button
                className={styles.menuToggle}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <BsList size={28} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showModal && (
        <AuthModal mode={mode} onClose={() => setShowModal(false)}
        onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </header>
  );
}
