import { Route, Routes } from "react-router-dom"
import "./App.css"
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
