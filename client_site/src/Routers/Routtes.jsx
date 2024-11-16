import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import Login from "../Login/Login.jsx"
import Home from "../Home/Home.jsx"
import Register from "../Login/Register.jsx"

function Routtes() {
  return (
    <>
   <Router>
             <Routes>
                   <Route path='/' element={<Home></Home>}></Route>
                   <Route path='/login' element={<Login></Login>}></Route>
                   <Route path="/register" element={<Register></Register>}/>
             </Routes>
         </Router>
    </>
  )
}

export default Routtes