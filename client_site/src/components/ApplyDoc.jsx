import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/AlertSlice.jsx";
import ForClients from "./ForClients.jsx";
import DoctorForm from "./DoctorForm.jsx";
import moment from 'moment';

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
      timings: value ? [moment(value[0]).format('HH:mm'), moment(value[1]).format('HH:mm')] : [],
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
      <DoctorForm 
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleTimingsChange={handleTimingsChange}
        handleSubmit={handleSubmit}
      />
    </ForClients>
  );
}

export default ApplyDoc;
