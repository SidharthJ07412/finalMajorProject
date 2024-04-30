import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useState,useEffect } from "react";
import Cookies from "universal-cookie"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ComponentStyles/itemCard2.css"
import "../ComponentStyles/messheading2.css"

function MessHeading2() {

  const settings = {
    autoplay:true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  const cookies = new Cookies();
  const User_id = cookies.get("User").User_id;
  const [Mess_id,update_Mess_id] = useState(0);
  const [status,update_status] = useState(0);

  const fetch_status = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_status/",
      {
        "Mess_id":Mess_id
      })
      .then((res) => {
        update_status(res.data.status);
      });
  };

  const toggle_status = async(e)=>{
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/toggle_status/",
      {
        "Mess_id":Mess_id
      })
      .then((res) => {
      });
      console.log("toggled");
      fetch_status();
  };

  const fetch_mess_id = async (e) => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_mess_id/",
      {
        "User_id":User_id
      })
      .then((res) => {
        update_Mess_id(res.data.mess_id);
        console.log(res.data.mess_id);
      });
  };

  useEffect(() => {
    fetch_mess_id();
	}, []);

  useEffect(() => {
    fetch_status();
	}, [Mess_id]);

  return (
    <section class="bg-center bg-no-repeat bg-[url('https://wallpapercave.com/wp/wp3105346.jpg')] bg-gray-500 bg-blend-multiply">
      <Navbar />

      <Slider {...settings}>
        
        <section class="bg-cover center bg-no-repeat bg-[url('https://wallpapercave.com/wp/wp7845939.jpg')] bg-gray-500 bg-blend-multiply " >
      <div class="px-3 mx-auto max-w-screen-xl text-center py-12 lg:py-20">
        <h1 class="mb-1 text-2xl font-extrabold tracking-tight leading-none text-gray-300 md:text-5xl lg:text-7xl">
          Healthy Mealz
        </h1>
        <p class=" text-sm font-normal text-gray-300 lg:text-3xl sm:px-16 lg:px-48">
          We Provide you the nearest healthy food at cheapest cost!
        </p>
        <button className={(status==0?"itemcard2_background":"itemcard2_background2")+" lg:text-xs inline-flex items-center justify-center px-3 py-2 text-xs font-xs text-center text-cyan-900 rounded-sm mt-5 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"} onClick={toggle_status}>{status==0?"Open Mess":"Close Mess"}</button>
        {/* <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"></div> */}
      </div>
    </section>

    <section class="bg-cover center bg-no-repeat bg-[url('https://wallpapercave.com/wp/wp3105346.jpg')] bg-gray-500 bg-blend-multiply">
      <div class="px-3 mx-auto max-w-screen-xl text-center py-12 lg:py-20">
        <h1 class="mb-1 text-2xl font-extrabold tracking-tight leading-none text-gray-300 md:text-5xl lg:text-7xl">
          Healthy Mealz
        </h1>
        <p class=" text-sm font-normal text-gray-300 lg:text-3xl sm:px-16 lg:px-48">
          We Provide you the nearest healthy food at cheapest cost!
        </p>
        <button className={(status==0?"itemcard2_background":"itemcard2_background2")+" lg:text-xs inline-flex items-center justify-center px-3 py-2 text-xs font-xs text-center text-cyan-900 rounded-sm mt-5 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"} onClick={toggle_status}>{status==0?"Open Mess":"Close Mess"}</button>
        {/* <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"></div> */}
      </div>
    </section>
    
      </Slider>
    </section>
  );
}

export default MessHeading2;