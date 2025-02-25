import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useAlert } from "../context/AlertContext";
import { cn } from "@/lib/utils"; // Make sure you have this utility

export function AlertNotification() {
  const { alertMessage, alertType, isVisible, hideAlert } = useAlert();

  if (!isVisible) return null;

  // Define styles and icons based on alert type
  const getAlertStyles = () => {
    switch (alertType) {
      case "success":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-800",
          title: "Success",
        };
      case "error":
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: "bg-red-50 border-red-200",
          textColor: "text-red-800",
          title: "Error",
        };
      case "info":
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          bgColor: "bg-blue-50 border-blue-200",
          textColor: "text-blue-800",
          title: "Information",
        };
    }
  };

  const { icon, bgColor, textColor, title } = getAlertStyles();

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
      <Alert className={cn("flex items-start", bgColor)}>
        <div className={cn("mr-2", textColor)}>{icon}</div>
        <div className="flex-1">
          <AlertTitle className={cn("font-medium", textColor)}>
            {title}
          </AlertTitle>
          <AlertDescription className={textColor}>
            {alertMessage}
          </AlertDescription>
        </div>
        <button
          onClick={hideAlert}
          className={cn("p-1 hover:opacity-70", textColor)}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
}
