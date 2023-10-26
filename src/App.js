import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from './pages/dashboard'
import LoginPage from './pages/login'

function App() {
  return <div className='App'>
    <BrowserRouter>
      <h1>eSCM</h1>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
