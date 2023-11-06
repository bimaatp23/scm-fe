import { BrowserRouter, Route, Routes } from "react-router-dom"
import "sweetalert2/dist/sweetalert2.min.css"
import "./App.css"
import { Middleware as Auth } from "./Middleware"
import CreateRetail from "./pages/CreateRetail.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import InventoryList from "./pages/InventoryList.jsx"
import Login from "./pages/Login.jsx"
import MyOrder from "./pages/MyOrder.jsx"
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
          <Route path="/inventory-list" element={<Auth isLogin={true}><InventoryList /></Auth>} />
          <Route path="/my-order" element={<Auth isLogin={true}><MyOrder /></Auth>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
