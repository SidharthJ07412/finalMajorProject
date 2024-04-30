
import React, { useState } from "react";
import styles from "../ComponentStyles/SignUp.module.css";
// import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function OTPpage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state;
  const [otp, setotp] = useState(0);

  const handleChange = (e) => {
    const {value } = e.target;
    setotp(value);
  };

   const createAccount = async (e) => {
    if (
      user.Fname !== "" &&
      user.Lname !== "" &&
      user.User_address !== "" &&
      user.Phone_num !== "" &&
      user.Email !== "" &&
      user.Password !== ""&& 
      user.User_type !== ""
    ) {
       console.log(user);
       if (user.Fname.length <= 2) {
        alert("First name should have atleast 3 letters.");
        return;
      }
      if (user.Lname.length <= 2) {
        alert("Last name should have atleast 3 letters.");
        return;
      }
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.Email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (user.Phone_num.length !== 10) {
        alert("Mobile number should be exactly 10 digits.");
        return;
      }
      if (user.User_address.length < 6) {
        alert("Address should be of minimum 6 letters.");
        return;
      }
      if (user.Password.length < 6) {
        alert("Password should be of minimum 6 letters.");
        return;
      }
      if (!user.User_type) {
        alert("Please select a user type.");
        return;
      }
    
      // If all validations pass, make the API request
      axios
        .post("https://healthymealz22-04-24f.onrender.com/auth/signUp", user)
        .then((res) => {
          console.log(res.data);
          alert("you are SuccessFully Registered");
    
          if(user.User_type==3)
          {
            const user_id = res.data.user_id;
            navigate("/MessRegistration", { replace: true, state: {user_id} });
          }
          else{navigate("/login");}
        })
        .catch((err) => {
          alert("Email Already in use");
        });
    } else {
      alert("Invalid Inputs");
    }
  }

  const handleSubmit = (e) => {
    axios
        .post("https://healthymealz22-04-24f.onrender.com/auth/verify-otp", {phoneNumber: user.Phone_num,otp})
        .then(async (res) => {
           console.log(res.data);

          if(res.data==="approved")
          {
            console.log("correct otp!");
            await createAccount();
          }else
          {
            alert("Incorrect OTP. Please try again.")
          }
        })
        .catch((err) => {
            console.log(err);
          alert("Something in otp went wrong");
        });
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.loginbox}>
          <div className={styles.loginemail}>
            <p className={styles.logintext}>Verify OTP</p>
            <div className={styles.inputgroup}>
              <input
                type="number"
                placeholder="Enter OTP"
                name="OTP"
                value={otp}
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
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OTPpage