import React, { useEffect, useState } from "react";
import styles from "../ComponentStyles/SignUp.module.css";
// import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    if (cookies.get("User")) {

      // console.log(cookies.get("User"))
      let type = cookies.get("User").User_type;

      if(type === '1'){Navigate("/tiffin");}
      else if(type ==='2'){Navigate("/delivery");}
      else if(type === '3'){Navigate("/mess");}
    }
  });

  const [user, setuser] = useState({
    User_id: -1,
    Email: "",
    Password: "",
    User_type: "", 
  });
  const handleSubmit = async (e) => {
    if (user.Email !== "" && user.Password !== "" && user.User_type !== "") {
      e.preventDefault();
      await axios
        .post("https://healthymealz22-04-24f.onrender.com/auth/login", user)
        .then((res) => {
          alert("You are now Logged in.");
          user.User_id = res.data.user_id;
          console.log(user);
          cookies.set("User", user, { path: "/" });
          if(user.User_type === '1'){Navigate("/tiffin");}
          else if(user.User_type ==='2'){Navigate("/delivery");}
          else if(user.User_type ==='3'){Navigate("/mess");}
        })
        .catch((err) => {
          alert("Incorrect Email or Password ");
        });
    } else {
      alert("Invalid input for Email or password");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };

  const handleChangetype = (e) =>{
    const {value} = e.target;
    setuser({
      ...user,
      "User_type":value,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginbox}>
        <div className={styles.loginemail}>
          <p className={styles.logintext}>Login with Email</p>
          <div className={styles.inputgroup}>
            <input
              type="text"
              placeholder="Email Address"
              name="Email"
              value={user.Email}
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
            <button className={styles.btn} name="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <p className={styles.loginregistertext}>
							Don't have an account? {/* <div className = > */}
							<button
								variant="text"
								onClick={() => Navigate("/")}
							>
								Sign Up
							</button>
							{/* </div> */}
						</p>
        </div>
      </div>
    </div>
  );
};

export default Login;