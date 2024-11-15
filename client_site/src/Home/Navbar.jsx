import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const nav1 = () => {
    navigate('/register');
  };

  return (
    <>
      {/* <div className="bg-slate-100 shadow-md"> */}
        <div className="flex justify-start pl-28 pt-3 space-x-96 bg-slate-100 pb-2 shadow-md">
          <h1 className="font-semibold text-2xl text-black">Medcare</h1>
          <ul className="flex space-x-6 text-black">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Doctors</li>
            <li className="cursor-pointer">Review</li>
            <li onClick={nav1} className="cursor-pointer">Reg/Login</li>
          </ul>
        </div>
      {/* </div> */}
    </>
  );
}

export default Navbar;
