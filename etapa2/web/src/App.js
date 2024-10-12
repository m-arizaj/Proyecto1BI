import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OpinionAnalysisPage from './components/OpinionAnalysisPage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OpinionAnalysisPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App