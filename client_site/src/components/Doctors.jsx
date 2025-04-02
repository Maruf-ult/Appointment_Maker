import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Doctors({ doctor }) {
  const navigate = useNavigate();

  return (
    <div
      className="card p-4 m-5 shadow-xl text-black bg-slate-400 cursor-pointer py-7"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr className="border mt-8 border-black" />
      <p className="mt-3">
        <b>Phone Number:</b> {doctor.phoneNumber}
      </p>
      <p className="mt-3">
        <b>Address:</b> {doctor.address}
      </p>
      <p className="mt-3">
        <b>Fee per Visit:</b> {doctor.feePerConsultation}
      </p>
      <p className="mt-3">
        <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

Doctors.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    feePerConsultation: PropTypes.number.isRequired,
    timings: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Doctors;
