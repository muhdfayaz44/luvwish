"use client";
import React, { useEffect } from "react";
import styles from "./alert.module.css";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const icons = {
  success: <FaCheckCircle />,
  error: <FaTimesCircle />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
};

export default function Alert({ alert, onClose }) {
  useEffect(() => {
    if (alert.autoDismiss) {
      const timer = setTimeout(() => onClose(), alert.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  return (
    <div className={styles.alertContainer} role="alert">
      <div className={`${styles.alertBox} ${styles[`alert-${alert.type}`]}`}>
        <div className={styles.alertIcon}>
          {icons[alert.type] || icons.info}
        </div>
        <div className={styles.alertMessage}>{alert.message}</div>
        {alert.dismissible !== false && (
          <button
            type="button"
            className={styles.premiumCloseBtn}
            aria-label="Close alert"
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
