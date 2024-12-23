import axios from "axios";
import { useEffect, useState, useCallback } from "react";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../Redux/AlertSlice.jsx";
import DoctorForm from "../DoctorForm.jsx";
import ForClients from "../ForClients.jsx";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  // const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true); // Add loading state

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "http://localhost:3000/api/apply-doc",
  //       {
  //         ...formValues,
  //         userId: user._id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.msg);
  //       navigate("/home");
  //     } else {
  //       toast.error(response.data.msg);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     if (error.response) {
  //       toast.error(`Server Error: ${error.response.data.message}`);
  //       console.error("Error Response:", error.response.data);
  //     } else if (error.request) {
  //       toast.error("No response from server. Please try again later.");
  //       console.error("Error Request:", error.request);
  //     } else {
  //       toast.error("Request Error: " + error.message);
  //       console.error("Error Message:", error.message);
  //     }
  //   }
  // };

  const getDocData = useCallback(async () => {
    if (!user || !user._id) return; // Check if user is defined
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/get-doctor-info-by-user-id",
        {
          userId: params.userId,
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
        setFormValues({}); // Ensure formValues is never null
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      setLoading(false); // Set loading to false if there's an error
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user._id) {
      getDocData();
    }
  }, [getDocData, user]);

  if (!user || loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <ForClients>
      <h1>Profile</h1>
      <DoctorForm
        formValues={formValues || {}} // Ensure formValues is never null
        handleInputChange={handleInputChange}
        handleTimingsChange={handleTimingsChange}
        // handleSubmit={handleSubmit}
      />
    </ForClients>
  );
}

export default Profile;
