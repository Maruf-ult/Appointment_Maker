import { useNavigate } from "react-router-dom";
import docImg from "../image/Doctors-bro.png";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav1 = () => {
    navigate("/login");
  };

  const nav2 = () => {
    navigate("/reg");
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const targetID = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed navbar
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="w-full bg-slate-200 fixed top-0 left-0 z-10 shadow-md p-4">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Brand Name */}
          <h1 className="font-semibold text-3xl text-black">Medcare</h1>

          {/* Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6">
            <li className="cursor-pointer text-green-500 text-lg">
              <a href="#home">Home</a>
            </li>
            <li className="cursor-pointer hover:bg-emerald-500 rounded-sm text-lg">
              <a href="#services">Services</a>
            </li>
            <li className="cursor-pointer hover:bg-emerald-500 rounded-sm text-lg">
              <a href="#about">About</a>
            </li>
            <li className="cursor-pointer hover:bg-emerald-500 rounded-sm text-lg">
              <a href="#doctors">Doctors</a>
            </li>
            <li onClick={nav1} className="cursor-pointer hover:bg-emerald-500 rounded-sm text-lg">
              Join as client
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden px-3 py-2 border rounded text-blue-900 border-blue-400 hover:text-white hover:bg-blue-900 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden flex flex-col items-center gap-4 absolute top-16 left-0 bg-white w-full shadow-md p-4 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <a href="#home" className="text-lg">Home</a>
          <a href="#services" className="text-lg">Services</a>
          <a href="#about" className="text-lg">About</a>
          <a href="#doctors" className="text-lg">Doctors</a>
          <a onClick={nav1} className="text-lg cursor-pointer">Join as client</a>
        </div>
      </div>

      {/* Home Section */}
      <div id="home" className="flex flex-col md:flex-row items-center pt-24  h-screen bg-slate-300 px-4">
        <img src={docImg} alt="Album" className="hidden md:block w-full max-w-sm md:max-w-md h-auto mt-6" />
        <div className="text-black text-center md:text-left md:pl-12 space-y-5">
          <h1 className="font-bold text-4xl">Stay Safe, Stay Healthy</h1>
          <p className="max-w-md text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ipsa repellat eius.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <button className="btn btn-outline btn-success text-lg">Contact Us</button>
            <button onClick={nav2} className="btn btn-outline btn-success text-lg">Register now!</button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="min-h-screen bg-emerald-100 text-center p-12">
        <h1 className="font-bold text-4xl">About Us</h1>
        <p className="font-semibold mt-3 text-lg">Learn more about Medcare and its mission.</p>
        <p className="max-w-xl mx-auto text-lg mt-4">
          At Medcare, we believe that health is not just the absence of illness but a state of well-being.
        </p>
      </div>

      {/* Doctors Section */}
      <div id="doctors" className="min-h-screen bg-slate-300 text-center p-12">
        <h1 className="font-bold text-4xl">Meet Our Doctors</h1>
        <p className="text-lg">Highly skilled professionals ready to serve you.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            { name: "Maruf Hossain", phone: "01733452207", fee: "500", time: "12:00-1.00" },
            { name: "Rafsan Ahammad", phone: "01733452307", fee: "5000", time: "10:00-12.00" },
            { name: "Faruk Hossain", phone: "01933352207", fee: "1500", time: "1:00-3.00" },
          ].map((doctor, index) => (
            <div key={index} className="card bg-slate-200 shadow-md p-6 rounded-lg">
              <h1 className="text-xl font-bold">{doctor.name}</h1>
              <hr className="border mt-2" />
              <p className="text-lg">Phone: {doctor.phone}</p>
              <p className="text-lg">Fee: {doctor.fee} Tk</p>
              <p className="text-lg">Timings: {doctor.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="min-h-screen bg-emerald-100 text-center p-12">
        <h1 className="font-bold text-4xl">Our Services</h1>
        <p className="text-lg">Explore the variety of services we provide.</p>
      </div>
    </>
  );
}

export default Home;