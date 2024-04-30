import React from "react";
import "../ComponentStyles/itemCard.css";
import "../ComponentStyles/itemCard2.css"
import Ratings from "./Ratings"
import UpdateDailyTokens from "./UpdateDailyTokens";
import Menu from "./Menu";

function ItemCard2(props) {
  const { User_id,tiffin_details,name, rating, daily_tokens,remaining_token,mess_id,validity,status,image,setTrigger,trigger} = props;

  return (
    <div className="bg-cyan-50 border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
            <span className={(status===0?"itemcard2_background ":"itemcard2_background2 ")+" rounded-full text-primary text-xs poppins px-4 py-1 inline-block mb-1"}>{status===1?"Open":"Closed"}</span>
            <span className="ml-5 text-gray-900 poppins text-base font-bold">{name}</span>
            <div className="flex">
              <div className="">
                <img className="mx-auto transform transition duration-300 hover:scale-105" src={image} alt="" />
                <Menu tiffin_details={tiffin_details}/>
              </div>
              
              <div className="flex flex-col items-center my-3 space-y-2">
                
                <Ratings  rats={rating} User_id={User_id} mess_id={mess_id}/>
                <p className="m-1 text-gray-500 poppins text-sm text-center" style={{ fontSize: '0.8rem'  ,lineHeight: '1'}}>Tokens left: {remaining_token}</p>
                <h2 className="m-1 text-gray-900 poppins text-xl " style={{ fontSize: '0.7rem'  ,lineHeight: '1'}}>Daily Tokens : {daily_tokens}</h2>
                
                <UpdateDailyTokens mess_id={mess_id} setTrigger={setTrigger} trigger={trigger}/>
                {/* <a
            className="ml-3 text-xl inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-cyan-900">Contact  </a> */}
            </div>
            </div>
            

        </div>
  );
}

export default ItemCard2;