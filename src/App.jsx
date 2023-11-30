import { BrowserRouter, Route, Routes } from "react-router-dom"
import "sweetalert2/dist/sweetalert2.min.css"
import "./App.css"
import { Middleware as Auth } from "./Middleware"
import CreateRetail from "./pages/CreateRetail.jsx"
import CreateSupplier from "./pages/CreateSupplier.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import InventoryList from "./pages/InventoryList.jsx"
import Login from "./pages/Login.jsx"
import OrderHistory from "./pages/OrderHistory.jsx"
import OrderList from "./pages/OrderList.jsx"
import ProcurementList from "./pages/ProcurementList.jsx"
import ProductionHistory from "./pages/ProductionHistory.jsx"
import ProductionList from "./pages/ProductionList.jsx"
import UserList from "./pages/UserList"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Session Non Active */}
          <Route path="/login" element={<Auth isLogin={false}><Login /></Auth>} />
          <Route path="/create-retail" element={<Auth isLogin={false}><CreateRetail /></Auth>} />
          <Route path="/create-supplier" element={<Auth isLogin={false}><CreateSupplier /></Auth>} />
          {/* Session Active */}
          <Route path="/" element={<Auth isLogin={true}><Dashboard /></Auth>} />
          <Route path="/user-list" element={<Auth isLogin={true}><UserList /></Auth>} />
          <Route path="/inventory-list" element={<Auth isLogin={true}><InventoryList /></Auth>} />
          <Route path="/production-list" element={<Auth isLogin={true}><ProductionList /></Auth>} />
          <Route path="/production-history" element={<Auth isLogin={true}><ProductionHistory /></Auth>} />
          <Route path="/order-list" element={<Auth isLogin={true}><OrderList /></Auth>} />
          <Route path="/order-history" element={<Auth isLogin={true}><OrderHistory /></Auth>} />
          <Route path="/procurement-list" element={<Auth isLogin={true}><ProcurementList /></Auth>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
