import { XIcon } from '@heroicons/react/solid';
import MessHeading from './MessHeading';
import Footer from './Footer';
import Cookies from "universal-cookie"
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DeliveryAgentDashboard = () => {
  
    const cookies = new Cookies();
const User_id = cookies.get("User").User_id;
const navigate = useNavigate();
  const [mess_users, update_mess_users] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [current_mess,update_current_mess] = useState([]);
  const [hire_request,update_hire_request] = useState([]);

  const handleMap = (e) => {
    navigate("/DeliveryMapPage")
  }
  useEffect(() => {
    fetch_current_mess();
    fetch_hire_requests();
	}, []);

    useEffect(()=>{
    if(current_mess.length!=0)fetch_mess_users();
  },[current_mess]);
  
  const fetch_current_mess = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_current_mess/",
      {
        "agent_id":User_id
      })
      .then((res) => {
        update_current_mess(res.data)
      });
  };

  const fetch_hire_requests = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_hire_requests/",
      {
        "agent_id":User_id
      })
      .then((res) => {
        update_hire_request(res.data)
      });
  };

  const fetch_mess_users = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/View_mess_users/",
      {
        "Mess_id":current_mess[0].mess_id
      })
      .then((res) => {
        update_mess_users(res.data);
      });
  };

  const handleAcceptRequest = async (mess_id) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/accept_request/",
      {
        "Mess_id":mess_id,
        agent_id: User_id
      }) .then((res) => {
        window.location.reload();
      });
      
  };

  const handleRejectRequest = async (mess_id) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/delete_request/",
      {
        "Mess_id":mess_id,
        agent_id: User_id
      }).then((res) => {
        window.location.reload();
      });
  };
  // Information about current mess

  const handleLeaveMess = () => {
    // Handle leave mess action
    console.log('Left working for the mess');
  };

  return (
    <>
      <MessHeading />
      <div className="p-8 bg-teal-100 min-h-screen">

        {current_mess.length !== 0 && (
          <div className="bg-teal-200 shadow-lg rounded-md p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-2 text-black">{current_mess[0].mess_name}</h2>
              <p className="text-black mb-2">Address: {current_mess[0].mess_address}</p>
              <p className="text-black">Contact: {current_mess[0].phone_num}</p>
            </div>
            <button
              onClick={handleLeaveMess}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className='flex justify-between my-5'>
        <div className="">
          <button
            onClick={() => setShowRequests(!showRequests)}
            className="bg-teal-500 text-white px-4 py-2  rounded-md focus:outline-none"
          >
            Show Requests {showRequests && `(${hire_request.length})`}
          </button>
          {showRequests && (
            <div className="w-80 bg-teal-100 rounded-md shadow-md overflow-hidden">
              <ul className="divide-y divide-teal-200">
                {hire_request.map(request => (
                  <li className="px-4 py-2 m-2 hover:bg-teal-200 flex justify-between items-center">
                    <p className="text-teal-800">{request.mess_name}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          if (current_mess.length === 0) {
                            handleAcceptRequest(request.mess_id);
                          } else {
                            alert("Accepted");
                          }
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          if (current_mess.length === 0) {
                            handleRejectRequest(request.mess_id);
                            window.location.reload();
                          } else {
                            alert("Request Deleted ");
                          }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleMap}
          className="bg-teal-500 text-white px-4 py-2  rounded-md focus:outline-none"
        >
          View Map
        </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-cyan-200 text-xs">
      <thead className="bg-cyan-100 dark:bg-cyan-700">
        <tr className="">
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Customer Name</th>
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Customer Address</th>
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Contact Number</th>
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Daily Tokens</th>
        </tr>
      </thead>
      <tbody className="bg-cyan-100 divide-y divide-gray-200">
        {mess_users.map((ele) => (
          <tr key={ele.id}>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.fname} {ele.lname}</td>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.user_address}</td>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">+91 {ele.phone_num}</td>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.daily_tokens}</td>
          </tr>
        ))}
        {/* Add more rows as needed */}
      </tbody>
    </table>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DeliveryAgentDashboard;


// CREATE TABLE request (
//     mess_id int,
//     agent_id int, 
//     status varchar(255)
// );

