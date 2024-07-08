import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

export const GlobalSnackbar = ({
  open,
  message,
  severity,
  onClose,
}: {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  onClose: () => void;
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
