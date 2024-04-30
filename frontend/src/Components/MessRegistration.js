import React, { useState } from "react";
import styles from "../ComponentStyles/SignUp.module.css";
//import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate,useLocation } from "react-router-dom";

const MessRegistration = () => {

    const cookies = new Cookies();
    const { state } = useLocation();
    const {user_id} = state;
    console.log(user_id);

    const navigate = useNavigate();
  const [mess, setmess] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setmess({
      ...mess,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (
      mess.Messname !== "" &&
      mess. Messaddress!== "" &&
      mess.Messcontact !== "" &&
      mess.Fooddetails !== "" &&
      mess.MonthlyPrice !== ""
    ) {
      console.log(mess);
      mess.mess_owner_id=user_id;
      e.preventDefault();
      axios
        .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/Mess_registration",mess)
        .then((res) => {
          alert(res.data);
          navigate("/login");
        })
        .catch((err) => {
          alert("Mess is already registered");
        });
    } else {
      alert("Invalid Inputs");
    }
  };
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.loginbox}>
          <div className={styles.loginemail}>
            <p className={styles.logintext}>Mess Registration</p>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="Mess Name"
                name="Messname"
                value={mess.Messname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={ styles.inputgroup} >
              <input className="signupinputs"
                type="text"
                placeholder="Address"
                name="Messaddress"
                value={mess.Messaddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputgroup}>
              <input
                type="number"
                placeholder="Contact Number"
                name="Messcontact"
                value={mess.Messcontact}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="Meal Details"
                name="Fooddetails"
                value={mess.Fooddetails}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputgroup}>
              <input
                type="number"
                placeholder="Monthly Subscription Charges"
                name="Monthlyprice"
                value={mess.MonthlyPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputgroup}>
              <button
                className={styles.btn}
                name="submit"
                onClick={handleSubmit}
              >
                Add Mess
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessRegistration;


