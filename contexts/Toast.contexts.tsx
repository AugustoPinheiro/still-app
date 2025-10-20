import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  visible?: boolean;
  timeout?: number;
};

type ToastContextProps = {
  toast: ToastProps;
  show: (args: ToastProps) => void;
  hide: () => void;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

const initialToast: ToastProps = {
  message: '',
  type: 'info',
  visible: false,
  timeout: 5000,
};

export const ToastContext = createContext({} as ToastContextProps);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastProps>(initialToast);
  const timeout = useRef<NodeJS.Timeout>();

  const show = useCallback((args: ToastProps) => {
    setToast({ ...initialToast, ...args, visible: true });
  }, []);

  const hide = useCallback(() => {
    setToast((prevState) => ({ ...prevState, visible: false }));
  }, []);

  useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, toast.timeout);

      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
