import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faUserDoctor, faCalendarCheck, faStethoscope, faSignOutAlt, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setUser } from "../Redux/userSlice";
import { Badge } from "antd";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav1 = () => {
    navigate('/notifications');
  };

  const menuItems = user?.isAdmin
    ? [
        { name: "Home", link: "/home", icon: faHouse },
        { name: "Doctors", path: "/doctors", icon: faStethoscope },
        { name: "Users", path: "/users", icon: faUsers },
      ]
    : user?.isDoctor
    ? [
        { name: "Home", link: "/home", icon: faHouse },
        { name: "Appointments", path: "/doctor/appointments", icon: faCalendarCheck },
        { name: "Profile", path: `/doctor/profile/${user._id}`, icon: faUser },
      ]
    : [
        { name: "Home", link: "/home", icon: faHouse },
        { name: "Appointments", path: "/appointments", icon: faCalendarCheck },
        { name: "Apply Doctor", link: "/apply-doc", icon: faUserDoctor },
      ];

  const getData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "https://appointment-maker-b7x7.onrender.com/api/get-userid",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getData();
  }, [getData]);

  const logOut = () => {
    if (window.confirm("Do you really want to log out?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-slate-300 flex overflow-hidden">
      {/* Sidebar for larger screens */}
      <div className={`h-[94vh] w-40 md:w-48 bg-slate-500 p-4 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h1 className="text-xl md:text-2xl font-bold text-black">
          SH <br /> <span className="text-lg font-normal">{user?.isAdmin ? "admin" : user?.isDoctor ? "doctor" : "user"}</span>
        </h1>
        <ul className="space-y-4 text-white">
          {menuItems.map((item, index) => (
            <li key={index} className="font-bold">
              <Link to={item.link || item.path} className="cursor-pointer hover:text-green-500 flex items-center">
                <FontAwesomeIcon icon={item.icon} className="mr-2" /> {item.name}
              </Link>
            </li>
          ))}
          <li className="font-bold cursor-pointer hover:text-red-400" onClick={logOut}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar with Hamburger Menu */}
        <div className="bg-slate-500 flex justify-between items-center p-4 text-white">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="block md:hidden">
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>
          <Badge onClick={nav1} count={user?.unseenNotifications?.length || 0} showZero>
            <FontAwesomeIcon icon={faUser} className="mr-2 size-5" />
          </Badge>
          <p className="hover:text-green-500">{user.name || "Guest"}</p>
        </div>

        {/* Scrollable Doctors Section */}
        <div className="bg-slate-50 p-4 rounded-md flex-grow overflow-y-auto">
          {children || <div>No content available</div>}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;