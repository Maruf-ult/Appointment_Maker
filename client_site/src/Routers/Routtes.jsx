import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import ForClient from '../Login/ForClient.jsx'
import Home from "../Home/Home.jsx"


function Routtes() {
  return (
    <>
   <Router>
             <Routes>
                   <Route path='/' element={<Home></Home>}></Route>
                   <Route path='/register' element={<ForClient></ForClient>}></Route>
             </Routes>
         </Router>
    </>
  )
}

export default Routtes