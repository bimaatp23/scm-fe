import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { Middleware as Auth } from "./Middleware"
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth isLogin={false}><Login /></Auth>} />
          <Route path="/" element={<Auth isLogin={true}><Dashboard /></Auth>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
