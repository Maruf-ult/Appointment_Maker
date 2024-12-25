import { TimePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

function DoctorForm({ formValues, handleInputChange, handleTimingsChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="text-black">
      <div className="flex space-x-12 pl-16 pt-6">
        <div className="space-y-2">
          <h3 className="text-black">*First Name</h3>
          <input
            name="firstName"
            className="px-8 py-1 border border-black bg-slate-200 font-light"
            type="text"
            value={formValues.firstName || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Last Name</h3>
          <input
            name="lastName"
            className="px-8 py-1 border border-black bg-slate-200 font-light"
            type="text"
            value={formValues.lastName || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Phone Number</h3>
          <input
            name="phoneNumber"
            className="px-8 py-1 border border-black bg-slate-200 font-light"
            type="text"
            value={formValues.phoneNumber || ""}
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
            value={formValues.website || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Address</h3>
          <input
            name="address"
            className="px-8 py-1 border border-black bg-slate-200 font-light"
            type="text"
            value={formValues.address || ""}
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
            value={formValues.specialization || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Experience</h3>
          <input
            name="experience"
            className="px-8 py-1 border border-black bg-slate-200 font-light"
            type="text"
            value={formValues.experience || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-black">*Fee per Consultation</h3>
          <input
            name="feePerConsultation"
            className="px-8 py-1 border border-black bg-slate-200 font-light"
            type="text"
            value={formValues.feePerConsultation || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex space-x-12 pl-16 pt-2">
        <div className="space-y-2">
          <h3 className="text-black">*Timings</h3>
          <TimePicker.RangePicker
            format="HH:mm"
            className="border border-black py-1 font-light"
            value={formValues.timings.length === 2 ? [moment(formValues.timings[0], 'HH:mm'), moment(formValues.timings[1], 'HH:mm')] : []}
            onChange={handleTimingsChange}
            
          />
        </div>
      </div>

      <div className="flex justify-end pr-20 mb-2">
        <button
          type="submit"
          className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
