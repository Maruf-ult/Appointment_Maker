import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../image/Sign up-bro.png";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../Redux/AlertSlice";
import toast from "react-hot-toast";

function Login() {
  
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const nav1 = () => {
    navigate("/home");
  };

  const nav2 = () => {
    navigate("/reg");
  };

  const HomeNav = ()=>{
    navigate("/")
  }

  const login = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:3000/api/login", data);
      dispatch(hideLoading());
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('token',response.data.jwtToken)
        toast.success('Login successful!');
        setData({ email: "", password: "" });
        nav1(); // Navigate to home or another page after successful login
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log('Error during login:', error);
      toast.error('Login failed.');
    }
  };

  return (
    <>
      {/* Navbar part */}
      <div className="h-screen w-screen bg-slate-200">
        <div className="flex justify-start pl-28 pt-3 space-x-96 bg-slate-100 pb-2 shadow-md">
          <h1 className="font-semibold text-2xl pb-2 text-black">Medcare</h1>
          <ul className="flex justify-end pl-48 space-x-6 text-black ">
            <li onClick={HomeNav} className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Doctors</li>
            <li className="cursor-pointer">Review</li>
          </ul>
        </div>

        {/* Title and content section */}
        <div className="flex ml-5">
          <img src={loginImg} alt="Album" className="mt-3 ml-36 w-96 h-96 " />

          <div className="text-black text-center pt-14 pl-36 space-y-4">
            <div className="flex flex-col justify-center space-y-6 bg-slate-100 py-12 px-10 w-96 rounded-md">
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
                Do not have any account yet! <span onClick={nav2} className="text-green-600 underline cursor-pointer">
                  Register
                </span>
              </p>
              <div className="flex justify-center space-x-7">
                <button onClick={nav2} className="btn btn-outline btn-success w-32 py-0">
                  Register
                </button>

                <button onClick={login} className="btn btn-outline btn-success w-32 py-0">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
