import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../image/Sign up-bro.png";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../Redux/AlertSlice";
import toast from "react-hot-toast";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({  
    name: "",
    email: "",
    password: ""
  });

  const nav1 = () => {
    navigate("/login");
  };
  const HomeNav = ()=>{
    navigate("/")
  }
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  const register = async () => {
    try {
      dispatch(showLoading()); 
      const response = await axios.post("https://appointment-maker-b7x7.onrender.com/api/reg", data);
      dispatch(hideLoading());
      console.log(response.data);
      toast.success('Registration successful!');
      setData({ name: "", email: "", password: "" });
         nav1(); 
    } catch (error) {
      dispatch(hideLoading());
      console.log('Error during registration:', error);
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg); 
        });
      }else
      toast.error(`An unexpected error occured., ${error}`);
    }
  };

  
  return (
    <>
      {/* Navbar part */}
      <div className="h-screen w-screen bg-slate-200">
        <div className="flex justify-start pl-28 pt-3 space-x-96 bg-slate-100 pb-2 shadow-md">
          <h1 className="font-semibold text-2xl pb-2 text-black">Medcare</h1>
            <ul className="flex justify-end pl-48 space-x-6 text-black ">
              <li onClick={HomeNav} className="cursor-pointer">
                Home
              </li>
              <li className="cursor-pointer">Services</li>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Doctors</li>
              <li className="cursor-pointer">Review</li>
            </ul>
        </div>

        {/* Title and content section */}
        <div className="flex ml-16">
          <img src={loginImg} alt="Album" className="mt-3 ml-36 w-96 h-96 " />

          <div className="text-black text-center pt-10 pl-36 space-y-4">
            <form className="flex flex-col justify-center space-y-4 bg-slate-100 py-12 px-10 w-96 rounded-md shadow-md">
              <input
            
                onChange={handleChange}
                type="text"
                name="name"
                value={data.name}
                placeholder="Enter your name"
                className="input input-bordered input-success w-full max-w-xs bg-white"
              />

              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter your email"
                className="input input-bordered input-success w-full max-w-xs bg-white"
              />

              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={data.password}
                placeholder="password"
                className="input input-bordered input-success w-full max-w-xs bg-white"
              />

              <p>
                Already have an account!{" "}
                <span
                  onClick={nav1}
                  className="text-green-600 underline cursor-pointer"
                >
                  Login
                </span>
              </p>
              <div className="flex justify-center space-x-7">
                <button
                  type="button"
                  onClick={register}
                  className="btn btn-outline btn-success w-32 py-0"
                >
                  Register
                </button>

                <button
                  type="button"
                  onClick={nav1}
                  className="btn btn-outline btn-success w-32 py-0"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
