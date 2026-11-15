import {Route, Routes ,Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar";
import AddApplication from "./pages/AddApplication";
import Applications from "./pages/Applications";
import MainLayout from "./components/MainLayout";


function App() {
  return(
    <>
     
        <Routes>
      {/*public routes*/}
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      {/*protected routes*/}

      <Route element={<ProtectedRoute/>}>
        <Route element={<MainLayout/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/add-application" element={<AddApplication />} />
          <Route path="/applications" element={<Applications />}/>

      
        </Route>
      </Route>
      

    </Routes>
    
    </>
   

   
    
  )
    
  
  
}

export default App