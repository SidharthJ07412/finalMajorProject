import { useState,useEffect } from "react";
import axios from "axios";
import MessOwnerDeductTokens from "./MessOwnerDeductTokens";
import Cookies from "universal-cookie"
import Dismiss from "./Dismiss";
import { BsClockHistory } from "react-icons/bs";


export default function MessOwnersSubcribers() {
  const [mess_users, update_mess_users] = useState([]);
  const [total_tokens, set_total_tokens] = useState(0);
  const [Mess_id, update_Mess_id] = useState(0);
  const [trigger, update_trigger] = useState(0);
  const [agents, update_agents] = useState([]);
  const [current_agent, update_current_agent] = useState();
  const cookies = new Cookies();
  const User_id = cookies.get("User").User_id;
  const [status, update_status] = useState('');
  const [activeTab, setActiveTab] = useState('messSubscribers');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetch_mess_id = async () => {
    const res = await axios.post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_mess_id/", {
      "User_id": User_id
    });
    update_Mess_id(res.data.mess_id);
  };

  const fetch_agents = async () => {
    const res = await axios.post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_agents/", {
      Mess_id: Mess_id
    });
    update_agents(res.data);
  };

  const fetch_del_status = async()=> {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_del_status/",
        {
          "Mess_id":Mess_id
        })
      .then((res) => {
        console.log(res.data);
        update_status(res.data.dstatus);
      });
  }



  const fetch_mess_users = async () => {
    const res = await axios.post("https://healthymealz22-04-24f.onrender.com/Mess_owner/View_mess_users/", {
      "Mess_id": Mess_id
    });
    update_mess_users(res.data);
  };

  const fetch_total_tokens = async () => {
    const res = await axios.post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_total_tokens/", {
      "Mess_id": Mess_id
    });
    set_total_tokens(res.data[0].sum);
  };

  const send_request = async (new_agent_id) => {
    try {
      const res = await axios.post("https://healthymealz22-04-24f.onrender.com/Mess_owner/send_request/", {
        "Mess_id": Mess_id,
        "agent_id": new_agent_id
      })
      .then((res) => {
        window.location.reload();
      });
      set_total_tokens(res.data[0].sum);
      update_trigger(trigger + 1); // Trigger a re-fetch
    } catch (err) {
      alert("You have already sent request to this agent!");
    }
  };

  useEffect(() => {
    fetch_mess_id();
  }, []);

  useEffect(() => {
    update_status();
  }, []);
  
  useEffect(() => {
    fetch_del_status();
  }, [agents]);

  useEffect(() => {
    fetch_mess_users();
    fetch_total_tokens();
    fetch_agents();
  }, [Mess_id, trigger]);

  // ... rest of your component




  return (
    <div className="min-h-screen bg-cyan-200 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8"></h1>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => handleTabChange('messSubscribers')}
            className={`text-sm px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none ${activeTab === 'messSubscribers' ? 'bg-blue-500 text-white' : 'bg-cyan-100 text-gray-700'}`}
          >
            Mess Subscribers
          </button>
          <button
            onClick={() => handleTabChange('deliveryAgents')}
            className={`text-sm px-4 py-2 rounded-tr-md rounded-br-md focus:outline-none ${activeTab === 'deliveryAgents' ? 'bg-blue-500 text-white' : 'bg-cyan-100 text-gray-700'}`}
          >
            Delivery Agents
          </button>
          <button
            onClick={() => handleTabChange('tokensleft')}
            className={`text-sm px-4 py-2 rounded-md focus:outline-none ${activeTab === 'tokensleft' ? 'bg-blue-500 text-white' : 'bg-cyan-100 text-gray-700'}`}
          >
            Tokens Left
          </button>
        </div>
        {activeTab === 'messSubscribers' && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
  <h2 className="bg-cyan-400 text-xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200 text-center">Mess Subscribers</h2>
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
</div>

        )}
      {activeTab === 'deliveryAgents' && (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
    <h2 className="text-xl font-bold text-gray-900 px-6 py-4 border-b bg-cyan-400 border-gray-200 text-center">Delivery Agents</h2>
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-cyan-200 text-xs">
        <thead className="bg-cyan-100 dark:bg-cyan-700">
          <tr>
            <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Name</th>
            <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Phone Number</th>
            <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Address</th>
            <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Status</th>
          </tr>
        </thead>
        <tbody className="bg-cyan-100 divide-y divide-gray-200">
          {agents.map((ele,index) => (
            <tr>
              <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.fname } {ele.lname}</td>
              <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">+91 {ele.phone_num}</td>
              <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.user_address}</td>
              <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.status==='Hired'?<div className="text-orange-800">Hired</div>
              :(!ele.status)?
              
              (<button onClick={()=>{
                if(current_agent!=null)
                {
                  alert("You already have a delivery agent!");
                }else 
                {
                  send_request(ele.user_id);
                  update_trigger(trigger + 1); // Trigger a re-fetch
                }
              }} className="text-green-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>

          </button>):<BsClockHistory className="ml-8"/>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

                {activeTab === 'tokensleft' && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
  <h2 className="bg-cyan-400 text-xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200 text-center">Remaining Tokens</h2>
  <div className="overflow-x-auto">
    <table className="w-full divide-y divide-cyan-200 text-xs">
      <thead className="bg-cyan-100 dark:bg-cyan-700">
        <tr className="">
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Customer Name</th>
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Contact Number</th>
          <th className="px-2 md:px-3 py-2 md:py-3 font-semibold text-gray-600 uppercase tracking-wider text-center">Remaining Tokens</th>
        </tr>
      </thead>
      <tbody className="bg-cyan-100 divide-y divide-gray-200">
        {mess_users.map((ele) => (
          <tr key={ele.id}>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.fname} {ele.lname}</td>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">+91 {ele.phone_num}</td>
            <td className="px-2 md:px-3 py-2 md:py-3 whitespace-nowrap text-center">{ele.remaining_token}</td>
          </tr>
        ))}
        {/* Add more rows as needed */}
      </tbody>
    </table>
  </div>
</div>
        )}
        {activeTab==="messSubscribers"&&<MessOwnerDeductTokens total_tokens={total_tokens} mess_id={Mess_id} trigger={trigger} update_trigger={update_trigger}/>}
        {activeTab==="deliveryAgents"&&<Dismiss Mess_id={Mess_id} current_agent={current_agent} update_current_agent={update_current_agent} current_status={status}/>
        }
      </div>
    </div>
  );
}