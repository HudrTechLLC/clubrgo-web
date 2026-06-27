import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/index.css'
import { FeltTable } from './pages/FeltTable'
import { TerminalRail } from './pages/TerminalRail'
import { PrismDeck } from './pages/PrismDeck'
import { Marvel } from './pages/Marvel'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/aurora" replace />} />
        <Route path="/aurora" element={<Marvel variant="aurora" />} />
        <Route path="/daylight" element={<Marvel variant="daylight" />} />
        <Route path="/stadium" element={<Marvel variant="stadium" />} />
        <Route path="/felt-table" element={<FeltTable />} />
        <Route path="/terminal-rail" element={<TerminalRail />} />
        <Route path="/prism-deck" element={<PrismDeck />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
