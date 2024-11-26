import  { useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendarCheck, faUserDoctor, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ForClients() {
  const { user } = useSelector((state) => state.user);

  const userMenu = [
    {
      name: 'Home',
      link: '/',
      icon: faHouse
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: faCalendarCheck
    },
    {
      name: 'Apply Doctor',
      link: '/apply-doctor',
      icon: faUserDoctor
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: faUser
    }
  ];

  const menuToBeRendered = userMenu;

  const getData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(
        "http://localhost:3000/api/get-userid",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [user, getData]);

  return (
    <>
      <div className="h-screen w-screen bg-slate-300 flex">
        <div className="h-[92vh] w-48 bg-slate-500 ml-6 mt-3 rounded-md">
          <div className="flex flex-col space-y-11">
            <h1 className="text-3xl font-bold ml-3 mt-2 text-black">
              SH <br /> <span className="text-2xl font-normal">User</span>
            </h1>
            <ul className="space-y-8 ml-2 text-white">
              {menuToBeRendered.map((item, index) => (
                <li key={index} className="cursor-pointer hover:text-green-400 font-bold">
                  <Link to={item.link || item.path}>
                    <FontAwesomeIcon icon={item.icon} className="mr-2" /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-300 w-screen ml-5 mt-1 rounded-md mr-4">
          <div className="flex bg-slate-500 p-5 rounded-md justify-end text-white font-bold m-3">
             {user ? user.name : 'Guest'}
             
          </div>
          <div className="bg-slate-50 mr-3 ml-3 mt-5 h-[78vh] rounded-md">
            mamfadsf
          </div>
        </div>
      </div>
    </>
  );
}

export default ForClients;
