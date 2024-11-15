import { useNavigate } from 'react-router-dom';
import docImg from "../image/Doctors-bro.png";

function Home() {

      const navigate = useNavigate();

       const nav1 = ()=>{
        navigate('/register')
       }

  return (
    <>
      {/* Navbar part */}
      <div className="h-screen w-screen bg-slate-200">
        <div className="flex justify-start pl-28 pt-3 space-x-96 bg-slate-100 pb-2 shadow-md">
          <h1 className="font-semibold text-2xl pb-2 text-black">Medcare</h1>
          <ul className="flex justify-end pl-20 space-x-6 text-black ">
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Services</li>
            <li className='cursor-pointer'>About</li>
            <li className='cursor-pointer'>Doctors</li>
            <li className='cursor-pointer'>Review</li>
            <li onClick={nav1} className='cursor-pointer'>Reg/Login</li>
          </ul>
        </div>

        {/* Title and content section */}
        <div className="flex ml-5">
          <img
            src={docImg}
            alt="Album"
            className="mt-2 ml-36 w-96 h-96"
          />

          <div className="text-black text-center pt-36 pl-36 space-y-4">
            <h1 className="font-bold text-4xl "> Stay Safe, Stay Healthy</h1>

            <p className="w-96 mx-auto text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ipsa
              repellat eius, fuga esse deleniti quidem commodi blanditiis adipisci
              asdfdfdsf adsfadf asdss
            </p>

            {/* Button below the paragraph, aligned with the text */}
            <button className="btn btn-outline btn-success  mr-60 px-8  ">
              Contact Us
            </button>
         
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
