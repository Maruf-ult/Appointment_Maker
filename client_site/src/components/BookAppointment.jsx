import { Col, DatePicker, Row, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/AlertSlice";
import Layout from "./Layout";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);

  const getDocData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      } else {
        setDoctor({});
      }
    } catch (error) {
      toast.error("Error fetching data. Please try again later.");
      dispatch(hideLoading());
      console.error("Error: ", error);
    }
  }, [dispatch, params.doctorId]);

  const bookAppointment = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: moment(date).format("YYYY-MM-DD"),
          time: moment(time).format("HH:mm"),
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
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error booking appointment. Please try again later.");
      dispatch(hideLoading());
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (params.doctorId) {
      getDocData();
    }
  }, [getDocData, params.doctorId]);

  return (
    <Layout>
      <div className="text-black">
        {doctor && (
          <>
            <h1 className="font-bold text-xl">
              {doctor.firstName} {doctor.lastName}
            </h1>
            <hr className="border mt-3 mb-3 border-slate-300" />
            <Row>
              <Col span={8} sm={24} sx={24} lg={8}>
                <h1 className="font-normal p-2">
                  <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
                </h1>
                <div className="flex flex-col mt-2 p-2">
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    onChange={(value) => setDate(value)}
                  />
                  <TimePicker
                    format="HH:mm"
                    className="mt-3"
                    onChange={(value) => setTime(value)}
                  />
                  <button className="btn bg-slate-400 text-black mt-3 w-full">
                    Check Availability
                  </button>
                  <button
                    onClick={bookAppointment}
                    className="btn bg-slate-400 text-black mt-3 w-full"
                  >
                    Book Now
                  </button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Layout>
  );
}

export default BookAppointment;
