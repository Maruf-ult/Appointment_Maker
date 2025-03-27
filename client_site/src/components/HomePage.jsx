import { Col, Row } from 'antd';
import Layout from './Layout.jsx'
import axios from 'axios'
import { useEffect,useState } from 'react'
import Doctors from './Doctors.jsx';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/AlertSlice.jsx';

function HomePage() {

     const [doctors, setDoctors] = useState([]);
     const dispatch = useDispatch();
  
       const getData = async () => {
    try {
     dispatch(showLoading());
      const response = await axios.get("https://appointment-maker-b7x7.onrender.com/api/get-all-approved-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if(response.data.success) {
        setDoctors(response.data.data);
      }
      console.log(response.data.data);
    } catch (error) {
     dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
     getData();
  },[]);


     return (
     <Layout>
         <Row gutter={20}>
           {doctors.map((doctor) => (
               <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
                    <Doctors doctor={doctor} />
               </Col>
            ))}
         </Row>
    </Layout>
  )
}

export default HomePage