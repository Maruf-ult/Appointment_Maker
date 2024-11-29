
import { useNavigate } from "react-router-dom";
import docImg from "../image/Doctors-bro.png";


function Home() {
  const navigate = useNavigate();

  const nav1 = () => {
    navigate("/login");
  };
  
  const nav2 = ()=>{
    navigate("/reg")
  };
  


  return (
    <>
      {/* Navbar part */}
      <div className="h-screen w-screen bg-slate-200">
        <div className="flex justify-start pl-28 pt-3 space-x-96 bg-slate-100 pb-2 shadow-md">
          <h1 className="font-semibold text-2xl pb-2 text-black">Medcare</h1>
          <ul className="flex justify-end pl-48 space-x-6 text-black ">
           
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Doctors</li>
            <li className="cursor-pointer">Review</li>
            <li onClick={nav1} className="cursor-pointer">
              Join as client
            </li>
          </ul>
        </div>

        {/* Title and content section */}
        <div className="flex ml-5">
          <img src={docImg} alt="Album" className="mt-2 ml-36 w-96 h-96" />

          <div className="text-black text-center pt-36 pl-36 space-y-5 ">
            <h1 className="font-bold text-4xl ml-2"> Stay Safe, Stay Healthy</h1>

            <p className="w-96 mx-auto text-center justify-start ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              ipsa repellat eius, fuga esse deleniti quidem commodi blanditiis
              adipisci asdfdfdsf adsfadf asdss
            </p>

            {/* Button below the paragraph, aligned with the text */}
            <div className="flex space-x-3 ml-3 ">
            <button className="btn btn-outline btn-success   px-8  ">
              Contact Us
            </button>
            <button onClick={nav2} className="btn btn-outline btn-success   px-6  ">
              register now!
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
