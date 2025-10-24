"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import Alert from "./alert";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((alertData) => {
    const id = Date.now(); // unique id for each toast
    const newAlert = { ...alertData, id };
    setAlerts((prev) => [...prev, newAlert]);

    if (alertData.autoDismiss) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, alertData.duration || 3000);
    }
  }, []);

  const closeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alerts.map((alert) => (
        <Alert key={alert.id} alert={alert} onClose={() => closeAlert(alert.id)} />
      ))}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
