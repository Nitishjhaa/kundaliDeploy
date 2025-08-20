import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import { ApiProvider } from './context/ApiContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <ScrollToTop /> 
    <ApiProvider>
      <App />
    </ApiProvider>
  </BrowserRouter>
</StrictMode>
);
