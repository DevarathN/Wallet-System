import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrderDetails from "./pages/ClientOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ClientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
