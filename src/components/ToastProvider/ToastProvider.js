import React from "react";
import useEscapeKey from "../../hooks/use-escape-key.hook";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  // doing this memoization stop the keyDownFunction in the hook from changing every time toasts is changed, thereby stopping
  // unnecessearily triggering the code to cleanup the event listener and create a new event listener.
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscape);

  const dismissToast = React.useCallback(
    (toastID) => {
      const nextToasts = toasts.filter((toast) => toast.id !== toastID);
      setToasts(nextToasts);
    },
    [toasts]
  );

  const dismissAllToasts = React.useCallback(() => {
    const nextToasts = [];
    setToasts(nextToasts);
  }, []);

  const createToast = React.useCallback(
    (variant, message) => {
      const newToast = {
        variant,
        message,
        id: crypto.randomUUID(),
      };

      const nextToasts = [...toasts, newToast];
      setToasts(nextToasts);
    },
    [toasts]
  );

  const value = React.useMemo(() => {
    return {
      toasts,
      dismissToast,
      createToast,
      dismissAllToasts,
    };
  }, [toasts, dismissToast, createToast, dismissAllToasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
