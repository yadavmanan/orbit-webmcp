import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/fragment-mono/400.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './styles.css';
import { API_BASE } from './config';
import { syncModelContextBridges } from './webmcpTools';

// Support both document.modelContext and navigator.modelContext across all standards
syncModelContextBridges();

// Render's free tier spins the backend down when idle; ping it on load so it's warm by the time data fetches happen.
fetch(`${API_BASE}/health`).catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);