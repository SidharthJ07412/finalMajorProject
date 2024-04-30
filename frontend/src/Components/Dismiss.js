import { XIcon } from '@heroicons/react/solid';
import { useState,useEffect } from "react";
import axios from "axios";

const Dismiss = (props) => {
  
  const {Mess_id,current_agent,update_current_agent,current_status} = props;
 
  const fetch_current_agent = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_current_agent/",
      {
        "Mess_id":Mess_id
      })
      .then((res) => {
        update_current_agent(res.data[0]);
      }); 
  };
  
  useEffect(() => {
    fetch_current_agent();
	}, []);


  const handleDismiss = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/remove_agent/",
      {
        "Mess_id":Mess_id
      })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        // Reload the page after successful API call
        window.location.reload();
        
      });
  };
  return (
    <div className={`bg-cyan-100 rounded-lg shadow-md p-6 `}>
      <h2 className="text-lg font-semibold mb-4">Current Delivery Agent:</h2>
     
      <div className="flex items-center justify-between">

        <p className="text-gray-800">{current_agent==null?"None":current_agent.fname+" "+current_agent.lname}</p>
    
        {current_agent!=null&&(<button onClick={()=>{if(window.confirm('Are you Sure want to fire the current delivery boy?')){handleDismiss() }}} className="text-red-500 hover:text-red-700 focus:outline-none">
          <XIcon className="h-6 w-6" />
        </button>)}
        
      </div>
      <p className="text-gray-800 font-semibold ">Delivery Status: {current_status !=''?current_status:"None"}</p>
    </div>
  );
};

export default Dismiss;

