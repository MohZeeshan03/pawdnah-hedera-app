import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./pages/Home";
import Deposit from "./pages/Deposit"
import Withdraw from "./pages/Withdraw"
import ControlPanel from "./pages/ControlPanel"
import Faqs from "./pages/Faqs";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/control-panel" element={<ControlPanel />} />
      </Routes>
    </Router>
  )
}