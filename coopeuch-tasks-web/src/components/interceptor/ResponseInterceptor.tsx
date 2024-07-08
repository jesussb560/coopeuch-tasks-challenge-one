import { useContext } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "../../interfaces/error-response.interface";
import { AlertColor } from "@mui/material/Alert";
import { Response } from "../../interfaces/response.interface";
import { apiInstance } from "../../api/api-instance.api";
import { SnackbarContext } from "../context/SnackbarContext";

export const ResponseInterceptor = ({ children }: any) => {

  const { setSnackbarOpen, setSnackbarMessage, setSeverity } =
    useContext(SnackbarContext);

  const handleSnack = async (message: string, severity: AlertColor) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSeverity(severity);
  };

  apiInstance.interceptors.response.use(
    async (res: AxiosResponse) => {

      const response: Response = res.data as Response;
      if (response.message.length > 0) await handleSnack(response.message, "success");
      return res;

    },
    async (err: AxiosError) => {

      if (!err.response?.data) {
        await handleSnack(err.message, "error");
        return Promise.reject(err);
      }

      const error: ErrorResponse = err.response?.data as ErrorResponse;
      await handleSnack(error.title, "error");

      return Promise.reject(err);

    }
  );

  return children;
};
