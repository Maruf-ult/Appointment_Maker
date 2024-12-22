import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../Redux/AlertSlice.jsx";
import DoctorForm from "../DoctorForm.jsx";
import ForClients from "../ForClients.jsx";

function Profile() {
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
      timings: value || [],
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

  const getDocData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/doctor/get-doctor-info-by-user-id",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      console.log(response.data.success);
      if (response.data.success) {
        setFormValues(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  }, [dispatch, user._id]);

  useEffect(() => {
    if (user && user._id) {
      getDocData();
    }
  }, [getDocData, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ForClients>
      <h1>Profile</h1>
      <DoctorForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleTimingsChange={handleTimingsChange}
        handleSubmit={handleSubmit}
      />
    </ForClients>
  );
}

export default Profile;
