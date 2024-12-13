import { Routes, Route, Navigate} from  "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound"
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}

function App() {
  return (
    <>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false}closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/register" element={<RegisterAndLogout/>}/>
      <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
    
  )
}

export default App
