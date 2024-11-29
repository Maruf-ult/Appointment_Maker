import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../App.css";
import Home from "../Home/Home.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Login/Register.jsx";
import ForClients from "../components/ForClients.jsx";
import ForDoctors from "../components/ForDoctors.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PublicRoute from "../components/PublicRoute.jsx";
import ApplyDoc from "../components/ApplyDoc.jsx";

function Routtes() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <Router>
        {loading && (
          <div className="spinner-container">
            {" "}
            <div className="spinner"></div>{" "}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}></Route>
          <Route path="/reg" element={<PublicRoute><Register/></PublicRoute>} />
          <Route path="/home" element={<ProtectedRoute><ForClients/></ProtectedRoute>} />
          <Route path="/doc" element={<ProtectedRoute><ForDoctors/></ProtectedRoute>} />
          <Route path="/apply-doc" element={<ProtectedRoute> <ApplyDoc/> </ProtectedRoute>   }/>
        </Routes>
      </Router>
    </>
  );
}

export default Routtes;
