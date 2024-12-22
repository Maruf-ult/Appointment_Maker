import { useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserDoctor, faCalendarCheck, faStethoscope, faSignOutAlt, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types'; 
import { setUser } from "../Redux/userSlice"; 
import { Badge } from "antd";

function ForClients({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nav1 = () => {
    navigate('/notifications');
  }

  const userMenu = [
    { name: 'Home', link: '/', icon: faHouse },
    { name: 'Appointments', path: '/appointments', icon: faCalendarCheck },
    { name: 'Apply Doctor', link: '/apply-doc', icon: faUserDoctor },
    { name: 'Profile', path: '/profile', icon: faUser }
  ];

  const adminMenu = [
    { name: 'Home', link: '/', icon: faHouse },
    { name: 'Doctors', path: '/docs', icon: faStethoscope },
    { name: 'Users', path: '/users', icon: faUsers },
    { name: 'Profile', link: '/profile', icon: faUserDoctor }
  ];

  const doctorMenu = [
    { name: 'Home', link: '/', icon: faHouse },
    { name: 'Appointments', path: '/appointments', icon: faCalendarCheck },
    { name: 'Profile', path: user ? `/doctor/profile/${user._id}` : '#', icon: faUser }
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  const getData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        "http://localhost:3000/api/get-userid",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.data)); 
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getData();
  }, [getData]); 

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className="h-screen w-screen bg-slate-300 flex">
        <div className="h-[92vh] w-48 bg-slate-500 ml-6 mt-3 rounded-md">
          <div className="flex flex-col space-y-11">
            <h1 className="text-3xl font-bold ml-3 mt-2 text-black">
              SH <br /> <span className="text-2xl font-normal">User</span>
            </h1>
            <ul className="space-y-8 ml-5 text-white">
              {menuToBeRendered.map((item, index) => (
                <li key={index} className="font-bold">
                  <Link to={item.link || item.path} className="cursor-pointer hover:text-green-400 flex items-center">
                    <FontAwesomeIcon icon={item.icon} className="mr-2" /> {item.name}
                  </Link>
                </li>
              ))}
              <li className="font-bold cursor-pointer hover:text-green-400" onClick={logOut}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-300 w-screen ml-5 mt-1 rounded-md mr-4">
          <div className="flex bg-slate-500 p-5 rounded-md justify-end text-white font-bold m-3 cursor-pointer">
            <Badge onClick={nav1} className="mr-3 " count={user?.unseenNotifications?.length || 0} showZero>
              <FontAwesomeIcon icon={faUser} className="mr-2 mt-1 size-5" />
            </Badge>
            <p className="hover:text-green-400">{user.name || 'Guest'}</p>
          </div>
          <div className="bg-slate-50 mr-3 ml-3 mt-5 h-[78vh] rounded-md">
            {children || <div>No content available</div>}
          </div>
        </div>
      </div>
    </>
  );
}

ForClients.propTypes = {
  children: PropTypes.node
};

export default ForClients;
