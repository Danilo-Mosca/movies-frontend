import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importo la libreira Bootstrap per tutta la mia applicazione:
import "bootstrap/dist/css/bootstrap.min.css";
// Importo le icone installate di bootstrap:
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
