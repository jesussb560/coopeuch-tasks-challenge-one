import { ThemeProvider } from '@emotion/react'
import { GlobalStyles } from '@mui/system'
import AppRoutes from './components/navigation/AppRoutes'
import { appTheme, primaryColor } from './theme'
import { useContext } from 'react';
import { SnackbarContext } from './components/context/SnackbarContext';
import { GlobalSnackbar } from './components/feedback/GlobalSnackbar';

function App() {

  const { snackbarOpen, snackbarMessage, setSnackbarOpen, severity } =
    useContext(SnackbarContext);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ThemeProvider theme={appTheme}>
          <GlobalSnackbar
            open={snackbarOpen}
            severity={severity}
            message={snackbarMessage}
            onClose={handleSnackbarClose}
          />
          <GlobalStyles styles={{
            body: {
              backgroundColor: primaryColor,
            },
          }} />
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: appTheme.spacing(0, 3),
            ...appTheme.mixins.toolbar,
            marginTop: appTheme.mixins.toolbar.minHeight,
          }}>

            <AppRoutes />
          </div>
        </ThemeProvider>
      </main>
    </>
  )
}

export default App
