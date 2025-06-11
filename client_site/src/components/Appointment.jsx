import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/AlertSlice";
import Layout from "./Layout";
import moment from "moment";

function Appointment() {

     const [appointments, setAppointments] = useState([]);
     const dispatch = useDispatch();
   

     const getAppointmentsData = async () => {
          try {
            dispatch(showLoading());
            const response = await axios.get(
              "https://appointment-maker-b7x7.onrender.com/api/get-appointments-by-user-id",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (response.data.success) {
              setAppointments(response.data.data);
              console.log(response.data.data);
            }
          } catch (error) {
            // toast.error(error.response ? error.response.data.msg : error.msg);
            dispatch(hideLoading());
            console.log(error);
          }
        };


        const columns = [
          {
                title: "Appointment ID",
                dataIndex: "_id",
              },
          {
            title: "Doctor",
            dataIndex: "name",
            render: (text, record) => (
              <h1 className="card-text">
                {record.doctorInfo.firstName} {record.doctorInfo.lastName}
              </h1>
            ),
          },
          {
            title: "Phone",
            dataIndex: "phoneNumber",
            render: (text, record) => (
               <h1 className="card-text">
                 {record.doctorInfo.phoneNumber} 
               </h1>
             ),
          },
          {
            title: "Date & Time",
            dataIndex: "createdAt",
            render: (text, record) => (
               <h1 className="card-text">
                 {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")} 
               </h1>
             ),
          },
          {
            title: "Status",
            dataIndex: "status",
          },
        ];
      


        useEffect(() => {
          getAppointmentsData();
        }, []);
      




  return (
<Layout>
      <h1 className=" text-3xl text-black pl-3 pb-3">Appointments</h1>
      <Table className="cursor-pointer" columns={columns} dataSource={appointments} />
      </Layout>
  )
}

export default Appointment