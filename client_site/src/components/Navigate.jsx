import { Tabs } from 'antd';
import ForClients from './ForClients.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../Redux/AlertSlice.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navigate() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen= async()=>{
     try {
          dispatch(showLoading());
          const response = await axios.post("/user/mark-all-notif-as-seen",{userId:user._id});
          dispatch(hideLoading());
          if(response.data.success){
               toast.success(response.data.message);
          }else{
               toast.error(response.data.message);
          }

     } catch (error) {
          dispatch(hideLoading());
          toast.error(error);
     }
  }








  return (
    <>
      <ForClients>
        <h1 className="font-bold text-xl text-slate-600 pl-2 pt-1">Notifications</h1>
        <Tabs className="pl-3  font-semibold">
          <Tabs.TabPane tab="unseen" key="0">
            <div className="flex justify-end pr-5 ">
              <h1 onClick={()=>markAllAsSeen()} className="underline font-semibold cursor-pointer">Mark all as seen</h1>
            </div>

            {user?.unseenNotifications?.map((notification, index) => (
              <div key={index} onClick={()=>navigate(notification. onclickPath)} className='bg-slate-200 p-5 mr-5 rounded-sm cursor-pointer mt-2'>
                {notification.message}
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="seen" key="1">
            <div className="flex justify-end pr-5 ">
              <h1 className="underline font-semibold cursor-pointer">Delete all</h1>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </ForClients>
    </>
  );
}

export default Navigate;
