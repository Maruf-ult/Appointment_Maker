// Import the necessary components from Ant Design
import ForClients from "./ForClients.jsx";

function ApplyDoc() {
  return (
    <ForClients>
      <h1 className="font-semibold text-black pl-14 pt-1">
        Apply Doctor Account
      </h1>

      <div className="flex space-x-12 pl-16 pt-6">
        <div className="space-y-2">
          <h3 className="text-black">*First Name</h3>
          <input
            className="px-8 py-1 border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Last Name</h3>
          <input
            className="px-8 py-1 border-solid border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Email</h3>
          <input
            className="px-8 py-1 border  border-solid border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>

      <div className="flex space-x-12 pl-16 pt-2 shadow-sm pb-6">
        <div className="space-y-2">
          <h3 className="text-black">*Phone Number</h3>
          <input
            className="px-8 py-1 border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Image</h3>
          <input
            className="px-8 py-1 border-solid border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>

      <div className="flex space-x-12 pl-16 pt-2  ">
        <div className="space-y-2">
          <h3 className="text-black">*Department</h3>
          <input
            className="px-8 py-1 border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Profession</h3>
          <input
            className="px-8 py-1 border-solid border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Experience</h3>
          <input
            className="px-8 py-1 border  border-solid border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="flex space-x-12 pl-16 pt-2">
        <div className="space-y-2">
          <h3 className="text-black">*Address</h3>
          <input
            className="px-8 py-1 border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Free per visit</h3>
          <input
            className="px-8 py-1 border-solid border border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Timings</h3>
          <input
            className="px-8 py-1 border  border-solid border-black bg-slate-200"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="flex justify-end pr-20 pt-4 ">
        {" "}
        <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Apply
        </button>{" "}
      </div>
    </ForClients>
  );
}

export default ApplyDoc;
