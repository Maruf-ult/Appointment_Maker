import img from "./image/login_img.jpg"; // Adjust the path if needed

function App() {
  return (
    <>
      {/* login part */}
      <div className="h-screen w-screen bg-slate-400 flex justify-center items-center">
        <div className="card sm:card-side bg-base-100 shadow-xl overflow-hidden  ">
          <figure className="m-0 p-0  h-96  w-7/12  ">
            <img
              src={img}
              alt="Album"
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body w-2 space-y-3 mt-12 ">
             <input className="bg-white p-2 rounded-md" type="text" name="name" id="" placeholder="Enter your name" />
             <input className="bg-white p-2 rounded-md" type="email" name="email" id="" placeholder="Enter your email" />
             <input className="bg-white p-2 rounded-md" type="password" name="password" id="" placeholder="password" />
            
            <div className="card-actions flex-col justify-center">
              <p>Already have an account? <span className="text-blue-400 font-bold cursor-pointer underline">sign in</span></p>
              <button className="btn btn-primary w-56 ml-2">sign up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
