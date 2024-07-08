import { AlertColor } from '@mui/material/Alert';
export interface SnackbarContextProps {
    snackbarOpen: boolean;
    snackbarMessage: string;
    severity: AlertColor | undefined,
    setSnackbarOpen: (open: boolean) => void;
    setSnackbarMessage: (message: string) => void;
    setSeverity: (severity: AlertColor) => void;
}