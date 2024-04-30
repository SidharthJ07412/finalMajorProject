import Navbar from "./Navbar";
import Cookies from "universal-cookie";
import styles from "../ComponentStyles/Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card3 from "./Card3";


function Profile() {

  const cookies = new Cookies();
  const User = cookies.get("User");
  const [name, Update_name] = useState([]);
  const [subscribed_mess, set_subscribed_mess] = useState([]);
  const navigate = useNavigate();

  const currentTime = new Date();
const currentHour = currentTime.getHours();


  const fetch_name = async (e) => {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Customer/fetch_profile/",{
        "User_id" :User.User_id,
      })
      .then((res) => {
        Update_name(res.data);
      });
      
  };
  const [trigger,setTrigger]  = useState(true)

    const fetch = async (e) => {

      const User_id = cookies.get("User").User_id;
      await axios
        .post("https://healthymealz22-04-24f.onrender.com/Customer/View_subscribed_mess/",
        {
          "customer_id": User_id
        })
        .then((res) => {
          set_subscribed_mess(res.data);
        });
        console.log(subscribed_mess);
    };
  console.log(currentHour);

    
    useEffect(() => {
      fetch();
      console.log("call")
    },[trigger]);
 
  function update_address (){
    navigate("/Updateaddress");
};



 
  useEffect(()=>{
    fetch_name();
  },[]);

  let dtime = "12:00 PM";

  if(currentHour>13){
    dtime = "7:00PM"
  }
  let status1 = "";
if(currentHour>=9 && currentHour<11 ){
  status1 = "Preparing"
}else if(currentHour>=11 && currentHour<13){
  status1 = "On the way"
}else if(currentHour>=13 && currentHour<17){
  status1 = "Delivered at 12:00 PM"
}
else if(currentHour>=16 && currentHour<18 ){
  status1 = "Preparing"
}else if(currentHour>=18 && currentHour<20){
  status1 = "On the way"
}else if(currentHour>=20 && currentHour<24){
  status1 = "Delivered at 7:00PM"
}else{
  status1="Delivered";
}


  return (
    <div >
        <Navbar/>
        <div className="hover:text-gray-200 ">
            <div class="images">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNrK36yrCd6DHKFr-x1dFrkk-49JBODBCBAjwBMZ4hCw2pzBRjpNH8K4Su7nu0cn-KeEkdwno3ELx9izvdJn3zIyR1zaVk7HaZvprBRQQOWMwkVtlKdWi-aieK56NrFyDBtpS1wOw1p0Y/s1600/Gaurav+sharma+Indian+Models+Fashion+Photographer09.jpg"/>
            </div>
           
            <div>
            <div class="text">Name - {name.fname}</div>
            <div class="text">Contact Number - {name.phone_num}</div>
            <div class="text">Email- {name.email}</div>
            <div class="text">Address- {name.user_address}</div></div> 
            <div class="flex justify-center">
                <button class="real" onClick={update_address} 
>Update Address </button>
            </div> 
            
            <div className="mt-10">
            <Card3 messName="Important Update" status={"Delivered"} numberOfTiffins="Morning : update Daily Tokens before 9:00 AM  And Evening : update Daily Tokens before 5:00 PM" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                  
                {subscribed_mess.filter(ele => ele.status == 1).map(ele => (
  <Card3 User_id={cookies.get("User").User_id} 
    messName={ele.mess_name} 
    numberOfTiffins={ele.daily_tokens} 
    deliveryTime={dtime}
    status={status1}
    setTrigger = {setTrigger}
    trigger={trigger}
  />
))}
{subscribed_mess.filter(ele => ele.status == 0).map(ele => (
  <Card3 User_id={cookies.get("User").User_id} 
    messName={ele.mess_name} 
    numberOfTiffins={ele.daily_tokens} 
    deliveryTime="Currently Mess is Closed"
    status="closed"
    setTrigger = {setTrigger}
    trigger={trigger}
  />
))}

            </div>
            </div>
        </div>
    </div>
   );
 }
export default Profile;



