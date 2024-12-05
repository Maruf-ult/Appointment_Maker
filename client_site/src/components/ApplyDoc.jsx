import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/AlertSlice.jsx";
import ForClients from "./ForClients.jsx";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

function ApplyDoc() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    timings: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTimingsChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      timings: value ? [value[0].format('HH:mm'), value[1].format('HH:mm')] : [],
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
      if (error.response) {
        toast.error(`Server Error: ${error.response.data.message}`);
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
        console.error("Error Request:", error.request);
      } else {
        toast.error("Request Error: " + error.message);
        console.error("Error Message:", error.message);
      }
    }
  };

  return (
    <ForClients>
      <h1 className="font-semibold text-black pl-3 pt-1">Apply Doctor Account</h1>

      <form onSubmit={handleSubmit} className="text-black">
        <div className="flex space-x-12 pl-16 pt-6">
          <div className="space-y-2">
            <h3 className="text-black ">*First Name</h3>
            <input
              name="firstName"
              className="px-8 py-1 border border-black bg-slate-200 font-light"
              type="text"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black ">*Last Name</h3>
            <input
              name="lastName"
              className="px-8 py-1 border border-black bg-slate-200 font-light"
              type="text"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Phone Number</h3>
            <input
              name="phoneNumber"
              className="px-8 py-1 border border-black bg-slate-200 font-light"
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
              className="px-8 py-1 border border-black bg-slate-200 font-light"
              type="text"
              value={formValues.website}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Address</h3>
            <input
              name="address"
              className="px-8 py-1 border border-black bg-slate-200 font-light"
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
              className="px-8 py-1 border border-black bg-slate-200 font-light"
              type="text"
              value={formValues.specialization}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Experience</h3>
            <input
              name="experience"
              className="px-8 py-1 border border-black bg-slate-200 font-light"
              type="text"
              value={formValues.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-black">*Fee per Consultation</h3>
            <input
              name="feePerConsultation"
              className="px-8 py-1 border border-black bg-slate-200 font-light"
              type="text"
              value={formValues.feePerConsultation}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-12 pl-16 pt-2">
          <div className="space-y-2">
            <h3 className="text-black ">*Timings</h3>
            <TimePicker.RangePicker
              className="border border-black py-1 font-light"
              value={formValues.timings.length ? [dayjs(formValues.timings[0], 'HH:mm'), dayjs(formValues.timings[1], 'HH:mm')] : null}
              onChange={handleTimingsChange}
            />
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
