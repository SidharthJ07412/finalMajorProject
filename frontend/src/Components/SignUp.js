import React, { useState } from "react";
import styles from "../ComponentStyles/SignUp.module.css";
// import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Phone_num: "",
    User_address: "",
    Password: "",
    User_type: "",
    lat:"",
    log:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the input is valid
    if ((name === "Fname" || name === "Lname") && /[^a-zA-Z]/.test(value)) {
      alert("Only alphabets are allowed in the first name and last name.");
      return;
    }
    if (name === "Phone_num" && /[^0-9]/.test(value)) {
      alert("Only numbers are allowed in the phone number.");
      return;
    }
  
    setuser({
      ...user,
      [name]: value,
      "lat" : 22.725003,
      "log" : 75.874180
    });
  };
  

  const handleChangetype = (e) =>{
    const {value} = e.target;
    setuser({
      ...user,
      "User_type":value,
    })
  }

  const handleSubmit = (e) => {
    //e.preventDefault();


    axios
    .post("https://healthymealz22-04-24f.onrender.com/auth/send-otp", {phoneNumber: user.Phone_num})
    .then((res) => {
      alert("Otp Sent to Your Mobile Number");
      navigate('/otppage', {state: {user} });
      console.log(res.data);
    })
    .catch((err) => {
      alert("Error Occured");
    });
  
    // Validation checks
    // if (user.Fname.length <= 2) {
    //   alert("First name should have atleast 3 letters.");
    //   return;
    // }
    // if (user.Lname.length <= 2) {
    //   alert("Last name should have atleast 3 letters.");
    //   return;
    // }
    // if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.Email)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }
    // if (user.Phone_num.length !== 10) {
    //   alert("Mobile number should be exactly 10 digits.");
    //   return;
    // }
    // if (user.User_address.length < 6) {
    //   alert("Address should be of minimum 6 letters.");
    //   return;
    // }
    // if (user.Password.length < 6) {
    //   alert("Password should be of minimum 6 letters.");
    //   return;
    // }
    // if (!user.User_type) {
    //   alert("Please select a user type.");
    //   return;
    // }
  
    // // If all validations pass, make the API request
    // axios
    //   .post("https://healthymealz22-04-24f.onrender.com/auth/signUp", user)
    //   .then((res) => {
    //     console.log(res.data);
    //     alert("you are SuccessFully Registered");
  
    //     if(user.User_type==3)
    //     {
    //       const user_id = res.data.user_id;
    //       navigate("/MessRegistration", { replace: true, state: {user_id} });
    //     }
    //     else{navigate("/login");}
    //   })
    //   .catch((err) => {
    //     alert("Email Already in use");
    //   });
  };
  
      return (
        <React.Fragment>
          <div className={styles.container}>
            <div className={styles.loginbox}>
              <div className={styles.loginemail}>
                <p className={styles.logintext}>SignUp with Email</p>
                <div className={styles.inputgroup}>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="Fname"
                    value={user.Fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={ styles.inputgroup} >
                  <input className="signupinputs"
                    type="text"
                    placeholder="Last Name"
                    name="Lname"
                    value={user.Lname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputgroup}>
                  <input
                    type="text"
                    placeholder="Email"
                    name="Email"
                    value={user.Email}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className={styles.inputgroup}>
                  <input
                    type="number"
                    placeholder="Phone_number"
                    name="Phone_num"
                    value={user.Phone_num}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className={styles.inputgroup}>
                  <input
                    type="text"
                    placeholder="User_address"
                    name="User_address"
                    value={user.User_address}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className={styles.inputgroup}>
                  <input
                    type="Password"
                    placeholder="Password"
                    name="Password"
                    value={user.Password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="my-5">
                <span className="text-xs"><input className="mx-1" type="radio" value={1} name="Customer" onChange={handleChangetype} checked={user.User_type === "1"}/> Customer</span>
                <span className="text-xs"><input className="mx-1" type="radio" value={2} name="Delivery Agent" onChange={handleChangetype} checked={user.User_type === "2"}/> Delivery Agent</span>
                <span className="text-xs"><input className="mx-1" type="radio" value={3} name="Mess Owner" onChange={handleChangetype} checked={user.User_type === "3"}/> Mess Owner</span>            
                </div>
                
                <div className={styles.inputgroup}>
                  <button
                    className={styles.btn}
                    name="submit"
                    onClick={handleSubmit}
                  >
                    SignUp
                  </button>
                </div>
                <p className={styles.loginregistertext}>
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")}> Login</button>
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    };
    
    export default SignUp;

