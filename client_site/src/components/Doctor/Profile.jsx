import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/AlertSlice.jsx";
import DoctorForm from "../DoctorForm.jsx";
import ForClients from "../ForClients.jsx";
import moment from 'moment';

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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

  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTimingsChange = (value) => {
    console.log("Selected Timings:", value);
    
    if (value && value.length === 2 && moment(value[0]).isValid() && moment(value[1]).isValid()) {
      const formattedTimings = [value[0].format('HH:mm'), value[1].format('HH:mm')];
      console.log("Formatted Timings:", formattedTimings);
      setFormValues((prevValues) => ({
        ...prevValues,
        timings: formattedTimings,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        timings: [],
      }));
    }
  };
  

  const getDocData = useCallback(async () => {
    if (!user || !user._id) return;
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/get-doctor-info-by-user-id",
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
      if (response.data.success) {
        setFormValues(response.data.data);
      } else {
        setFormValues({});
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching data. Please try again later.");
      dispatch(hideLoading());
      setLoading(false);
      console.error("Error: ", error);
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/update-doctor-profile",
        {
          ...formValues,
          userId: user._id,
          // Additional property example
          timings: formValues.timings,
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
        setFormValues(response.data.data);  // Update form values with the updated data
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error updating profile. Please try again later.");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getDocData();
    }
  }, [getDocData, user]);

  if (!user || loading) {
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
