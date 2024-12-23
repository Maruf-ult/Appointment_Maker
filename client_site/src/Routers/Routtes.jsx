import { useSelector } from "react-redux";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../App.css";
import Home from "../Home/Home.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Login/Register.jsx";
import ForClients from "../components/ForClients.jsx";
import ForDoctors from "../components/ForDoctors.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PublicRoute from "../components/PublicRoute.jsx";
import ApplyDoc from "../components/ApplyDoc.jsx";
import Navigate from "../components/Navigate.jsx";
import UserList from "../components/UserList.jsx";
import DoctersList from "../components/DoctersList.jsx";
import Profile from "../components/Doctor/Profile.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <PublicRoute><Login /></PublicRoute>,
    },
    {
      path: "/reg",
      element: <PublicRoute><Register /></PublicRoute>,
    },
    {
      path: "/home",
      element: <ProtectedRoute><ForClients /></ProtectedRoute>,
    },
    {
      path: "/doc",
      element: <ProtectedRoute><ForDoctors /></ProtectedRoute>,
    },
    {
      path: "/apply-doc",
      element: <ProtectedRoute><ApplyDoc /></ProtectedRoute>,
    },
    {
      path: "/notifications",
      element: <ProtectedRoute><Navigate /></ProtectedRoute>,
    },
    {
      path: "/users",
      element: <ProtectedRoute><UserList /></ProtectedRoute>,
    },
    {
      path: "/docs",
      element: <ProtectedRoute><DoctersList /></ProtectedRoute>,
    },
    {
      path: "/doctor/profile/:userId",
      element: <ProtectedRoute><Profile /></ProtectedRoute>,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function Routtes() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default Routtes;
