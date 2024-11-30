import  { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/AlertSlice.jsx";
import ForClients from "./ForClients.jsx";
import {  TimePicker } from 'antd';

function ApplyDoc() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
    department: "",
    profession: "",
    experience: "",
    address: "",
    feePerVisit: "",
    timings: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/apply-doc",
        {
          ...formValues,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/home");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error);
    }
  };

  return (
    <ForClients>
      <h1 className="font-semibold text-black pl-3 pt-1">Apply Doctor Account</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-12 pl-16 pt-6">
          <div className="space-y-2">
            <h3 className="text-black">*First Name</h3>
            <input
              name="firstName"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Last Name</h3>
            <input
              name="lastName"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Phone Number</h3>
            <input
              name="phoneNumber"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-12 pl-16 pt-2 shadow-sm pb-6">
          <div className="space-y-2">
            <h3 className="text-black">*Website</h3>
            <input
              name="website"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.website}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Address</h3>
            <input
              name="address"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
          <h1 className="text-black font-semibold ml-3 mt-1">Professional Information</h1>
        <div className="flex space-x-12 pl-16 pt-2">
          <div className="space-y-2">
            <h3 className="text-black">*Specialization</h3>
            <input
              name="specialization"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.specialization}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Experience</h3>
            <input
              name="experience"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Fee per Cunsultation</h3>
            <input
              name="fee per Cunsultation"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.feeperCunsultation}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex space-x-12 pl-16 pt-2">

          <div className="space-y-2">
            <h3 className="text-black ">*Timings</h3>
            {/* <input
              name="timings"
              className="px-8 py-1 border border-black bg-slate-200"
              type="text"
              value={formValues.timings}
              onChange={handleInputChange}
            /> */}
            <TimePicker.RangePicker className="border border-black py-1 " />

          </div>
        </div>
        <div className="flex justify-end pr-20 pt-4">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </form>
    </ForClients>
  );
}

export default ApplyDoc;
