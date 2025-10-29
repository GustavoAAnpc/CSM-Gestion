import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import RutasApp from './routes/rutas.app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RutasApp />
  </StrictMode>,
)
