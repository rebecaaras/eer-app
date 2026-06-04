import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ApiContextProvider from './context/apiContext.tsx'
import Navbar from './components/NavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <ApiContextProvider>
    <Navbar/>
    <App />
  </ApiContextProvider>
)
