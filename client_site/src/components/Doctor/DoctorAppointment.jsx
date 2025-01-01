import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/AlertSlice";
import Layout from "../Layout";

function DoctorAppointment() {
  const [docappointments, setDocAppointments] = useState([]);
  const dispatch = useDispatch();

  const getDocAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:3000/api/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDocAppointments(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.msg : error.msg);
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const chngAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.msg);
        getDocAppointmentsData();
        console.log(response.data.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.msg : error.msg);
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      key: "_id", // Add key here
    },
    {
      title: "Patient",
      dataIndex: "name",
      key: "name", // Add key here
      render: (text, record) => (
        <h1 className="card-text">{record.userInfo.name}</h1>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber", // Add key here
      render: (text, record) => (
        <h1 className="card-text">{record.doctorInfo.phoneNumber}</h1>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt", // Add key here
      render: (text, record) => (
        <h1 className="card-text">
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </h1>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status", // Add key here
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="flex space-x-2">
              <h1
                className="anchor underline "
                onClick={() => chngAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor underline"
                onClick={() => chngAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getDocAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl text-black pl-3 pb-3">Appointments</h1>
      <Table
        className="cursor-pointer"
        columns={columns}
        dataSource={docappointments}
        rowKey="_id"
      />
    </Layout>
  );
}

export default DoctorAppointment;
