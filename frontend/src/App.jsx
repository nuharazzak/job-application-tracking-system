import {Route, Routes ,Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar";


function App() {
  return(
    <>
     <Navbar> </Navbar>
        <Routes>
      {/*public routes*/}
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      {/*protected routes*/}

      <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>} />

      </Route>
      

    </Routes>
    
    </>
   

   
    
  )
    
  
  
}

export default App