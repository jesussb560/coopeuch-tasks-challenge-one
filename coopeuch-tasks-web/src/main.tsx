import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ResponseInterceptor } from './components/interceptor/ResponseInterceptor.tsx';
import { SnackbarProvider } from './components/context/SnackbarContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SnackbarProvider>
    <ResponseInterceptor>
      <Provider store={store}>
        <App />
      </Provider>
    </ResponseInterceptor>
  </SnackbarProvider>
)
