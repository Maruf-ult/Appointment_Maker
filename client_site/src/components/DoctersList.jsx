import { useEffect, useState } from 'react'
import ForClients from './ForClients'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/AlertSlice';
import axios from 'axios';
import { Table } from 'antd';


function DoctersList() {

     const [docs,setDocs]= useState([])
     const dispatch = useDispatch();

     const getDocData = async () => {
          try {
               dispatch(showLoading());
               const response = await axios.get("http://localhost:3000/api/get-all-docs",{
                    headers:{
                         Authorization: `Bearer ${localStorage.getItem("token")}`   
                    }
               })
                 dispatch(hideLoading());
                 if(response.data.success){
                    setDocs(response.data.data)
                    console.log(response.data.data)
                 }
               
          } catch (error) {
               dispatch(hideLoading());
               console.log(error)
          }
     }
     

   useEffect(() => {
     getDocData();
     }, [])
 
 


     const columns = [
          {
               title: 'Name',
               dataIndex: 'name',   
               render:(text,record)=>(
                  <h1 className="card-text">{record.firstName} {record.lastName}</h1>
               ) 
          },
          {
               title: 'Phone',
               dataIndex: 'phoneNumber',
          },
          {
               title: 'Created At',
               dataIndex: 'createdAt',
          },
          {
               title: 'Status',
               dataIndex: 'status',
          },
          {
               title: 'Actions',
               dataIndex: 'actions',
               render: (text, record) => (
                    <div className='d-flex'>
                         {record.status==="pending" && <h1 className='anchor underline'>Approve</h1>}
                         {record.status==="approved" && <h1 className='anchor underline'>Block</h1>}
                    </div> )
                    },
      ]
      
  return (
     <ForClients>
     <h1 className=' text-3xl text-black pl-3 pb-3'>Docs List</h1>
     <Table className='cursor-pointer' columns={columns} dataSource={docs} />
     </ForClients>
  )
}

export default DoctersList