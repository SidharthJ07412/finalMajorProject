import React from "react";

function Footer() {
  return (
    <div className="">
      <div class="">
        <div class="max-w-2xl mx-auto text-white py-10">
          <div class="text-center">
            <h3 class="text-sm mb-3" > Download Healthy Mealz App </h3>
            <div class="flex justify-center my-2">
              <div class="flex items-center border w-auto rounded-lg px-2 py-1 mx-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  class="w-7 md:w-8"
                />
                <div class="text-left ml-3">
                  <p class="text-xs text-gray-200" style={{ fontSize: '0.4rem'  ,lineHeight: '1'}}>Download on </p>
                  <p class="text-sm md:text-base" style={{ fontSize: '0.6rem'  ,lineHeight: '1'}}> Google Play Store </p>
                </div>
              </div>
              <div class="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  class="w-7 md:w-8"
                />
                <div class="text-left ml-3">
                  <p class="text-xs text-gray-200" style={{ fontSize: '0.4rem'  ,lineHeight: '1'}}>Download on </p>
                  <p class="text-sm md:text-base" style={{ fontSize: '0.6rem'  ,lineHeight: '1'}}> Apple Store </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-15 flex flex-col md:flex-row md:justify-between items-center text-xs text-gray-100">
            <p class="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              &copy; Healthy Mealz, 2024.{" "}
            </p>
            <div class="order-1 md:order-2">
              <span class="px-2">About us</span>
              <span class="px-2 border-l">Contact us</span>
              <span class="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;