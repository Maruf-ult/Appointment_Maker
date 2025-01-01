import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/AlertSlice";
import Layout from "./Layout";
import moment from "moment";

function DoctersList() {
  const [docs, setDocs] = useState([]);
  const dispatch = useDispatch();

  const getDocData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:3000/api/get-all-docs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDocs(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.msg : error.msg);
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const chngDocStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/change-doc-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.msg);
        getDocData();
        console.log(response.data.data);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.msg : error.msg);
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDocData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h1 className="card-text">
          {record.firstName} {record.lastName}
        </h1>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
         render: (text, record) => (
              moment(record.createdAt).format("DD-MM-YYYY")
            ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor underline"
              onClick={() => chngDocStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor underline"
              onClick={() => chngDocStatus(record, "approved")}
            >
              Blocked
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className=" text-3xl text-black pl-3 pb-3">Docs List</h1>
      <Table className="cursor-pointer" columns={columns} dataSource={docs} />
      </Layout>
  );
}

export default DoctersList;
