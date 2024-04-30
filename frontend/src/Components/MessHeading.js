import React from "react";
import Navbar from "./Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MessHeading() {
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
  return (
    <>
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
        {/* <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"></div> */}
      </div>
    </section>
    
      </Slider></>
    
    
  );
}

export default MessHeading;