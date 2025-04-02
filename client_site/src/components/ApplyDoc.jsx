import axios from "axios";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/AlertSlice.jsx";
import DoctorForm from "./DoctorForm.jsx";
import Layout from "./Layout.jsx";

function ApplyDoc() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // State for form values
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

 
  const handleTimingsChange = (value) => {
    console.log("Selected Timings:", value); 
  
    if (value && value.length === 2 && value[0].$d && value[1].$d) {
      const formattedTimings = [
        moment(value[0].$d).format("HH:mm"),
        moment(value[1].$d).format("HH:mm"),
      ];
      console.log("Formatted Timings:", formattedTimings);
  
      setFormValues((prevValues) => ({
        ...prevValues,
        timings: formattedTimings,
      }));
    } else {
      toast.error("Invalid timings selected. Please try again.");
      setFormValues((prevValues) => ({
        ...prevValues,
        timings: [],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for timings
    if (!formValues.timings || formValues.timings.length !== 2) {
      toast.error("Please select valid timings.");
      return;
    }

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://appointment-maker-b7x7.onrender.com/api/apply-doc",
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
    <Layout>
      <h1 className="font-semibold text-black pl-3 pt-1">
        Apply Doctor Account
      </h1>
      <DoctorForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleTimingsChange={handleTimingsChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
}

export default ApplyDoc;