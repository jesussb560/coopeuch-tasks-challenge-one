import { createContext, useState } from "react";
import { SnackbarContextProps } from "../../interfaces/snackbar-context-props.interface";
import { AlertColor } from "@mui/material/Alert";

export const SnackbarContext = createContext<SnackbarContextProps>({
  snackbarOpen: false,
  snackbarMessage: "",
  severity: undefined,
  setSnackbarOpen: () => { },
  setSnackbarMessage: () => { },
  setSeverity: () => { },
});

export const SnackbarProvider = ({ children }: any) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  return (
    <SnackbarContext.Provider
      value={{
        snackbarOpen,
        snackbarMessage,
        severity,
        setSeverity,
        setSnackbarOpen,
        setSnackbarMessage,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
