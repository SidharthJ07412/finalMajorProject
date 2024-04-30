import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
} from "@material-tailwind/react";

export default function UpdateDailyTokens(props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const [Tokens,UpdateTokens] = useState(0);
  const cookies = new Cookies();
  const {mess_id,setTrigger,trigger} = props;
  const User_id = cookies.get("User").User_id;

  const handleSubmit = (props)=>{

    axios
        .post("https://healthymealz22-04-24f.onrender.com/Customer/Change_daily_tokens",
        {
          "customer_id" : User_id,
          "Mess_id": mess_id,
          "Daily_tokens":Tokens
        })
        .then((res) => {
          alert("Successfully Updated Daily Tokens!");
          setTrigger(!trigger);
          handleOpen()
        })
        .catch((err) => {
          alert("Inadequate amount of Tokens left");
        });
  }

  return (
    <>
      <Button
      className="ml-3 text-xl inline-flex justify-center items-center py-2 px-4 text-xs font-medium text-center text-white rounded-base bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-cyan-900 font-bold"
      onClick={handleOpen}>Update</Button>
      <Dialog open={open} handler={handleOpen}>

        {/* <div className="flex px-10 py-2 space-x-3 ">
                <AiOutlineMinus
                    onClick={() => {
                        Tokens === 0 ? UpdateTokens(0) : UpdateTokens(Tokens - 1);

                    }}
                    className="bg-cyan-500 text-2xl bg-primary w-10 h-10 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1" />
                <span className="text-3xl text-gray-700 poppins select-none">{Tokens}</span>
                <AiOutlinePlus
                    onClick={() => {
                      Tokens===10? 
                      UpdateTokens(10):
                      UpdateTokens(Tokens + 1);

                    }}
                    className="bg-cyan-500 text-2xl bg-primary w-10 h-10 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1" /> 
            </div> */}
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Select Daily Tokens</h2>
        <div className="flex items-center justify-between mb-4">
          <button onClick={()=>{UpdateTokens(Tokens-1)}} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-xl font-semibold">{Tokens}</span>
          <button onClick={()=>{UpdateTokens(Tokens+1)}} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>

          </button>
        </div>
        <div className="flex justify-end">
          <button onClick={handleOpen} className="bg-red-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 focus:outline-none">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Save
          </button>
        </div>
      </div>
    </div>
        {/* <DialogFooter className="bg-cyan-100 space-x-2">
          <Button variant="gradient" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}