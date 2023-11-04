import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { Middleware as Auth } from "./Middleware"
import CreateRetail from "./pages/CreateRetail.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import UserList from "./pages/UserList"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Session Non Active */}
          <Route path="/login" element={<Auth isLogin={false}><Login /></Auth>} />
          <Route path="/create-retail" element={<Auth isLogin={false}><CreateRetail /></Auth>} />
          {/* Session Active */}
          <Route path="/" element={<Auth isLogin={true}><Dashboard /></Auth>} />
          <Route path="/user-list" element={<Auth isLogin={true}><UserList /></Auth>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
