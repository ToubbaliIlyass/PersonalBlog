import { createContext, useState, useContext, ReactNode } from "react";

type AlertType = "success" | "error" | "info" | null;

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
  alertMessage: string | null;
  alertType: AlertType;
  isVisible: boolean;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (message: string, type: AlertType) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsVisible(true);

    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setIsVisible(false);
    // Clear message after animation completes
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 300);
  };

  return (
    <AlertContext.Provider
      value={{ showAlert, hideAlert, alertMessage, alertType, isVisible }}
    >
      {children}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
