import { TimePicker } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

function DoctorForm({ formValues, handleInputChange, handleTimingsChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="text-black p-4 max-w-3xl mx-auto">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3>*First Name</h3>
          <input
            name="firstName"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.firstName || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3>*Last Name</h3>
          <input
            name="lastName"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.lastName || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3>*Phone Number</h3>
          <input
            name="phoneNumber"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.phoneNumber || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Website & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <h3>*Website</h3>
          <input
            name="website"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.website || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3>*Address</h3>
          <input
            name="address"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.address || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h1 className="text-black font-semibold mt-6">Professional Information</h1>

      {/* Professional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="space-y-2">
          <h3>*Specialization</h3>
          <input
            name="specialization"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.specialization || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3>*Experience</h3>
          <input
            name="experience"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.experience || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3>*Fee per Consultation</h3>
          <input
            name="feePerConsultation"
            className="w-full px-4 py-2 border border-black bg-slate-200 rounded-md"
            type="text"
            value={formValues.feePerConsultation || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Timings Picker */}
      <div className="mt-4 space-y-2">
        <h3>*Timings</h3>
        <TimePicker.RangePicker
          format="HH:mm"
          className="border border-black py-2 w-full rounded-md"
          value={formValues.timings.length === 2 ? [moment(formValues.timings[0], "HH:mm"), moment(formValues.timings[1], "HH:mm")] : []}
          onChange={handleTimingsChange}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Apply
        </button>
      </div>
    </form>
  );
}

DoctorForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleTimingsChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default DoctorForm;