import { AllWalletsProvider } from "./services/wallets/AllWalletsProvider";
import { RouterProvider } from 'react-router-dom'
import routes from './routes/root'
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <AllWalletsProvider>
      <ToastContainer />
      <RouterProvider router={routes} />
    </AllWalletsProvider>
  );
}

export default App;
