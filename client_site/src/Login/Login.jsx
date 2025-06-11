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

  const handleNavigation = (sectionId) => {
  navigate("/"); // Navigate to homepage first
  setTimeout(() => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed navbar
        behavior: "smooth",
      });
    }
  }, 500); // Slight delay to ensure homepage loads first
};




  const login = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("https://appointment-maker-b7x7.onrender.com/api/login", data);
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
      <div className="flex flex-col md:flex-row justify-between px-6 py-3 bg-slate-100 shadow-md">
        <h1 className="font-semibold text-2xl text-black">Medcare</h1>
        <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-black">
          <li onClick={HomeNav} className="cursor-pointer">Home</li>
            <li onClick={() => handleNavigation("services")} className="cursor-pointer">Services</li>
  <li onClick={() => handleNavigation("about")} className="cursor-pointer">About</li>
  <li onClick={() => handleNavigation("doctors")} className="cursor-pointer">Doctors</li>
  <li onClick={() => handleNavigation("review")} className="cursor-pointer">Review</li>
        </ul>
      </div>

      {/* Title and content section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-12">
        
        {/* Hide Image on Small Screens */}
        <img src={loginImg} alt="Album" className="hidden md:block w-full max-w-sm h-auto" />

        {/* Form Section */}
        <div className="text-black text-center space-y-4 mt-6 md:mt-0">
          <div className="flex flex-col justify-center space-y-6 bg-slate-100 py-8 px-6 w-full max-w-md rounded-md shadow-md">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={data.email}
              placeholder="Enter your email"
              className="input input-bordered input-success w-full bg-white"
            />

            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={data.password}
              placeholder="password"
              className="input input-bordered input-success w-full bg-white"
            />

            <p>
              Do not have an account yet? 
              <span onClick={nav2} className="text-green-600 underline cursor-pointer">
                Register
              </span>
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button onClick={nav2} className="btn btn-outline btn-success w-full md:w-32">
                Register
              </button>

              <button onClick={login} className="btn btn-outline btn-success w-full md:w-32">
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
