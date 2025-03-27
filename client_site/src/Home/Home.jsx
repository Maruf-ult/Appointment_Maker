import { useNavigate } from "react-router-dom";
import docImg from "../image/Doctors-bro.png";

function Home() {
  const navigate = useNavigate();

  const nav1 = () => {
    navigate("/login");
  };

  const nav2 = () => {
    navigate("/reg");
  };

  return (
    <>
      <div className="w-screen  bg-slate-200 fixed top-0 left-0 z-10 shadow-md">
        <div className="flex justify-start pl-32 pt-3 space-x-96 pb-2">
          <h1 className="font-semibold text-3xl text-black">Medcare</h1>
          <ul className="flex justify-end pl-48 space-x-6 text-black">
            <li className="cursor-pointer text-green-500 text-xl">
              <a href="#home">Home </a>
            </li>
            <li className="cursor-pointer hover:bg-emerald-500 rounded-sm text-xl">
              <a href="#services">Services</a>
            </li>
            <li className="cursor-pointer  hover:bg-emerald-500 rounded-sm text-xl">
              <a href="#about">About</a>
            </li>
            <li className="cursor-pointer  hover:bg-emerald-500 rounded-sm text-xl">
              <a href="#doctors">Doctors</a>
            </li>

            <li onClick={nav1} className="cursor-pointer  hover:bg-emerald-500 rounded-sm text-xl">
              Join as client
            </li>
          </ul>
        </div>
      </div>

      <div id="home" className="flex ml-5 pt-20 h-screen  bg-slate-300">
        <img src={docImg} alt="Album" className="mt-2 ml-36 w-96 h-96 " />
        <div className="text-black text-center pt-32 pl-36 space-y-5">
          <h1 className="font-bold text-5xl ml-2">Stay Safe, Stay Healthy</h1>
          <p className="w-96 mx-auto text-center justify-start text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ipsa
            repellat eius, fuga esse deleniti quidem commodi blanditiis.
          </p>
          <div className="flex space-x-3 ml-7">
            <button className="btn btn-outline btn-success px-8 text-xl">
              Contact Us
            </button>
            <button onClick={nav2} className="btn btn-outline btn-success px-6 text-xl">
              Register now!
            </button>
          </div>
        </div>
      </div>

      <div id="about" className="h-screen bg-emerald-100 text-center pt-36">
        <h1 className="font-bold text-4xl">About Us</h1>
        <p className="font-semibold mt-3">Learn more about Medcare and its mission to keep you healthy.</p>
        <p className="text-lg mt-4 px-12 pt-5">
    At Medcare, we believe that health is not just the absence of illness but a
    state of physical, mental, and emotional well-being. Founded with the
    mission to make high-quality healthcare accessible to all, we strive to
    offer exceptional medical services tailored to your needs.
  </p>

      </div>

      <div id="doctors" className="h-screen bg-slate-300 text-center pt-28 ">
        <h1 className="font-bold text-4xl">Meet Our Doctors</h1>
        <p>Highly skilled professionals ready to serve you.</p>
        <div className="flex  gap-x-4 ml-40 mr-16">
          <div className="card   m-10  shadow-2xl text-black bg-slate-200 cursor-pointer w-72  p-10">
            <h1 className="card-title">Maruf Hossain</h1>
            <hr className="border mt-4 border-black" />
            <p className="mt-3 pl-1 ">
              <b>Phone No.:01733452207</b>
            </p>
            <p className="mt-3 pr-16">
              <b>Address: Savar</b>
            </p>
            <p className="mt-3 pr-12">
              <b>Fee per Visit: 500</b>
            </p>
            <p className="mt-3 pr-7">
              <b>Timings: 12:00-1.00</b>
            </p>
          </div>
          <div className="card   m-10  shadow-2xl text-black bg-slate-200 cursor-pointer w-72  p-10">
            <h1 className="card-title">Rafsan Ahammad</h1>
            <hr className="border mt-4 border-black" />
            <p className="mt-3 pl-1 ">
              <b>Phone No.:01733452307</b>
            </p>
            <p className="mt-3 pr-16">
              <b>Address: Savar</b>
            </p>
            <p className="mt-3 pr-12">
              <b>Fee per Visit: 5000</b>
            </p>
            <p className="mt-3 pr-7">
              <b>Timings: 10:00-12.00</b>
            </p>
          </div>
          <div className="card   m-10  shadow-2xl text-black bg-slate-200 cursor-pointer w-72  p-10">
            <h1 className="card-title">Faruk Hossain</h1>
            <hr className="border mt-4 border-black" />
            <p className="mt-3 pl-1 ">
              <b>Phone No.:01933352207</b>
            </p>
            <p className="mt-3 pr-16">
              <b>Address: Noakhali</b>
            </p>
            <p className="mt-3 pr-12">
              <b>Fee per Visit: 1500</b>
            </p>
            <p className="mt-3 pr-7">
              <b>Timings: 1:00-3.00</b>
            </p>
          </div>
        </div>
      </div>

      <div id="services" className="h-screen  bg-emerald-100 text-center pt-36">
        <h1 className="font-bold text-4xl">Our Services</h1>
        <p>Explore the variety of services we provide to our clients.</p>
      </div>
    </>
  );
}

export default Home;
