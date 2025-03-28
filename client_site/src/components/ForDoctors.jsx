
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendarCheck, faUserDoctor, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ForDoctors() {
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

  return (
    <>
      <div className="h-screen w-screen bg-slate-300 flex">
        <div className="h-[92vh] w-48 bg-slate-500 ml-6 mt-3 rounded-md">
          <div className="flex flex-col space-y-11">
            <h1 className="text-3xl font-bold ml-3 mt-2 text-black">
              SH <br /> <span className="text-2xl font-normal">Doctor</span>
            </h1>
            <ul className="space-y-8 ml-3 text-white">
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
          <div className="flex bg-slate-500 p-5 rounded-md justify-end mr-3 ml-3 mt-2 text-white font-bold">
            Doctor
          </div>
          <div className="bg-slate-50 mr-3 ml-3 mt-5 h-[78vh] rounded-md">
            mamfadsfff
          </div>
        </div>
      </div>
    </>
  );
}

export default ForDoctors;
