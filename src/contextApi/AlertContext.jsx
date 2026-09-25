import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import GlobalAlert from "../mallupurVillage/reuseableCopmonent/GlobalAlert";



const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
    variant: "filled",
  });

  const timerRef = useRef(null);

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const showAlert = useCallback(
    ({
      message,
      duration = 3000,
      severity = "info",
      variant = "filled",
    }) => {
      // Purana timer clear karo
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Naya alert show karo
      setAlert({
        open: true,
        message,
        severity,
        variant,
      });

      // Naya timer
      timerRef.current = setTimeout(() => {
        hideAlert();
      }, duration);
    },
    [hideAlert]
  );

  // Component unmount hone par timer cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
      }}
    >
      {children}

      <GlobalAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        variant={alert.variant}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      "useAlert must be used inside AlertProvider"
    );
  }

  return context;
};