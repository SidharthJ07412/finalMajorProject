import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

export default function MessOwnerDeductTokens(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const {total_tokens,mess_id,trigger,update_trigger} = props;

  const handleSubmit = (props)=>{

    axios
        .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/Deduct_tokens",
        {
          "Mess_id": mess_id,
        })
        .then((res) => {
          alert("Successfully Deducted Tokens!");
          update_trigger(1-trigger);
          handleOpen()
        })
        .catch((err) => {
          alert("Unknown Error occured");
          // window.location.reload(); 
        });
  }

  return (
    <>
      <Button
      className="ml-3 text-xl inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray rounded-lg bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-cyan-900"
      onClick={handleOpen}>{"Deduct Tokens ("+total_tokens+")"}</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="bg-cyan-100 flex items-center justify-between">
          <DialogHeader>Are you sure want to Deduct Tokens for today?</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        <DialogFooter className="bg-cyan-100 space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Deduct
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}