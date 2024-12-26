import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/AlertSlice";
import Layout from "./Layout";
function UserList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:3000/api/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor underline">Block</h1>
        </div>
      ),
    },
  ];

  return (
     <Layout>
      <div>
        <h1 className=" text-3xl text-black pl-3 pb-3">Users List</h1>
        <Table
          className="cursor-pointer"
          columns={columns}
          dataSource={users}
        />
      </div>
      </Layout>
  );
}

export default UserList;
