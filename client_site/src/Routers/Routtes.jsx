import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import Login from "../Login/Login.jsx"
import Home from "../Home/Home.jsx"
import Register from "../Login/Register.jsx"
import ForClients from "../components/ForClients.jsx"
import ForDoctors from "../components/ForDoctors.jsx"


function Routtes() {
  return (
    <>
   <Router>
   <button type="button" className="bg-indigo-500 ..." disabled>
  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
     ...
  </svg>
  Processing...
</button>
             <Routes>
                   <Route path='/' element={<Home></Home>}></Route>
                   <Route path='/login' element={<Login></Login>}></Route>
                   <Route path="/reg" element={<Register></Register>}/>
                   <Route path="/home" element={<ForClients></ForClients>}/>
                   <Route path="/doc" element={<ForDoctors></ForDoctors>}/>
             </Routes>
         </Router>
    </>
  )
}

export default Routtes