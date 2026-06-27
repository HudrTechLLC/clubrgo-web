import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/index.css'
import { FeltTable } from './pages/FeltTable'
import { TerminalRail } from './pages/TerminalRail'
import { PrismDeck } from './pages/PrismDeck'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/felt-table" replace />} />
        <Route path="/felt-table" element={<FeltTable />} />
        <Route path="/terminal-rail" element={<TerminalRail />} />
        <Route path="/prism-deck" element={<PrismDeck />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
