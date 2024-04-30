import React from 'react'
import MessHeading from './MessHeading';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

function SubscribeMessPage(props) {
    
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { state } = useLocation();
    const {mess_id,price,name}= state;
    console.log(price);

    const initPayment = (data,months) => {
		const options = {
			key: "rzp_test_7XkaKD6uJ4qEsm",
			amount: data.amount,
			currency: data.currency,
			name: "item",
			description: "Test Transaction",
			// image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "https://healthymealz22-04-24f.onrender.com/Customer/verify";
					await axios.post(verifyUrl, {response,months,mess_id,user_id:cookies.get("User").User_id})
                    .then((res) => {
                         alert("Successfully Subscribed to Mess!");
                         navigate("../tiffin"); });

				} catch (err) {
					if (err.response && err.response.data) {
                    alert(err.response.data);}
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const handlePayment = async (price,months) => {
    
		try {
			const orderUrl = "https://healthymealz22-04-24f.onrender.com/Customer/order";
			const { data } = await axios.post(orderUrl, { amount: price,customer_id:cookies.get("User").User_id,Mess_id:mess_id});
			console.log(data);
			initPayment(data.data,months);
		} catch (err) {
			if (err.response && err.response.data) {
        alert(err);}
		}
	};
    
  return (
    <div className='bg-cyan-600'>
    <MessHeading/>    
    <p class="mt-8 text-lg font-bold text-cyan-100 lg:text-5xl sm:px-16 lg:px-48 mx-auto max-w-screen-xl text-center fontkanit">
          Subscribe {name}
    </p>
<div class='flex px-[30px]'>
   <div class="min-w-full">

        <div class="mt-[14px] gap-[14px]">
            <div key="1" class="bg-cyan-100 w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                <div class="pt-[15px] px-[18px] pb-[10px]">
                    <div class="flex justify-end">
                        <div class="bg-[#F6F6F7] rounded-[14px] flex justify-center align-center px-[12px]">
                            <p class="text-[#00153B] text-[12px] leading-[22px] font-bold">
                                Starter
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="text-[#00153B] text-[10px] leading-[10px ] font-bold">
                            1 Month
                        </p>
                        <p class="text-[#00153B] text-[20px] leading-[30px] font-bold">
                            {price} INR
                        </p>
                    </div>
                    
                    <div>
                        <p class="text-[#717F87] text-[10px] leading-[20px] font-medium">
                            30 Credits
                        </p>
                    </div>
                </div>

                <div class="pt-[10px] px-[18px] pb-[10px]">
                    <div class="">
                        <button onClick={()=>{handlePayment(price,1)}} name="1" class="bg-[#006EF5] rounded-[5px] py-[8px] px-[13px] text-[#fff] text-[14px] leading-[17px] font-semibold">Subscribe</button>
                    </div>
                    
                </div>
            </div>

            <div key="2" class="mt-2 bg-cyan-100 w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                <div class="pt-[15px] px-[18px] pb-[10px]">
                    <div class="flex justify-end">
                        <div class="bg-[#F6F6F7] rounded-[14px] flex justify-center align-center px-[12px]">
                            <p class="text-[#00153B] text-[12px] leading-[22px] font-bold">
                                Value
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="text-[#00153B] text-[10px] leading-[10px ] font-bold">
                        3 Month
                        </p>
                        <p class="text-[#00153B] text-[20px] leading-[30px] font-bold">
                        {3*price-500} INR
                        </p>
                    </div>

                    <div>
                        <p class="text-[#717F87] text-[10px] leading-[20px] font-medium">
                            90 Credits + 5 Free Credits
                        </p>
                    </div>
                </div>

                <div class="pt-[10px] px-[18px] pb-[10px]">
                   
                    <div class="">
                        <button onClick={()=>{handlePayment(3*price-500,3)}} name="3" class="bg-[#006EF5] rounded-[5px] py-[8px] px-[13px] text-[#fff] text-[14px] leading-[17px] font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>

            <div key="3" class="mt-2 bg-cyan-100 w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                <div class="pt-[15px] px-[18px] pb-[10px]">
                    <div class="flex justify-end">
                        <div class="bg-[#F6F6F7] rounded-[14px] flex justify-center align-center px-[12px]">
                            <p class="text-[#00153B] text-[12px] leading-[22px] font-bold">
                                Pro
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="text-[#00153B] text-[10px] leading-[10px ] font-bold">
                        6 Month
                        </p>
                        <p class="text-[#00153B] text-[20px] leading-[30px] font-bold">
                        {6*price-1500} INR
                        </p>
                    </div>

                    <div>
                        <p class="text-[#717F87] text-[10px] leading-[20px] font-medium">
                         180 Credits + 20 Free Credits
                        </p>
                    </div>
                </div>

                <div class="pt-[10px] px-[18px] pb-[10px]">

                    <div class="">
                        <button onClick={()=>{handlePayment(6*price-1500,6)}} name="6" class="bg-[#006EF5] rounded-[5px] py-[8px] px-[13px] text-[#fff] text-[14px] leading-[17px] font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
   </div>
</div>
<Footer/>  
    </div>
  )
}

export default SubscribeMessPage;