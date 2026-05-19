import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-8 text-2xl font-bold">AS241 HF T5 — Ready</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
