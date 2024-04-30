/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import ContactUs from "./ContactUs";
import axios from "axios";
import '../ComponentStyles/navbar.css'
import { FaBars, FaTimes } from "react-icons/fa";
import "../ComponentStyles/navbarnew.css";
import { useRef } from "react";


 function Navbar() {


const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
  

  const cookies = new Cookies();
  const User = cookies.get("User");
  const navigate = useNavigate();
  if(!User){
    navigate("/");
  }
  
  const [profile,Update_profile] = useState([]);
  const[noti_number,Update_noti_number]=useState(0);

  const [subscribed_mess_alert, set_subscribed_mess_alert] = useState([]);


  const fetchnew = async (e) => {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Customer/fetch_new/", {
        "customer_id": User.User_id
      })
      .then((res) => {
        const data = res.data.map(item => ({
          mess_name: item.mess_name,
          remaining_token: item.remaining_token
        }));
        set_subscribed_mess_alert(data);
        console.log(data);
        Update_noti_number(data.length);
      });
  };

  useEffect(() => {
    console.log(subscribed_mess_alert);
  }, [subscribed_mess_alert]);
  
  
    useEffect(() => {
      fetchnew();
    },[User.User_type==1]);

  const Navigate_profile = ()=>{
    if(User.User_type==3){
        navigate("/profilemess");
    }else{
    navigate("/profile");
    }
  }

  const fetch_profile = async (e) => {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Customer/fetch_profile/",{
        "User_id" :User.User_id,
      })
      .then((res) => {
        Update_profile(res.data);
      });
  };


  useEffect(() => {
    if (!cookies.get("User")) {
      console.log("User");
      navigate("/login");
    }
    console.log("cookies");
    
  });

  useEffect(()=>{
    fetch_profile();
    console.log(profile);
  },[]);
  

  
  const Logout = () => {
    cookies.remove("User");
    navigate("/login");
  }

  const Navigate_SubscribeMess = ()=>{
    navigate("/UserSubscriptionPage")
  }

  const Navigate_Home = () =>{
    if(User.User_type==1)
    {
      navigate("/tiffin")
    }else if(User.User_type==2)
    {
      navigate("/delivery")
    }else if(User.User_type==3)
    {
      navigate("/mess")
    }
  }

  const ContactUs = ()=>
  {
    navigate("/ContactUs");
  }
  

  const Notification_new = () => {
    set_subscribed_mess_alert(prevState => prevState.map(item => ({...item, visible: true})));
    
  };
  

  const toggleMessage = (index) => {
    set_subscribed_mess_alert(prevState => prevState.map((item, i) => i === index ? {...item, visible: !item.visible} : item));
  };
  
	return (
    <div>
		<header>
		<div style={{ display: 'flex', justifyContent: 'center' }}>
  <h3>
    <button class="text-gray-200" onClick={Navigate_Home} style={{ marginRight: '10px' }}>
      Home
    </button>
  </h3>

  {(User.User_type =='1') && (
    <h3 style={{ marginLeft: 'auto' }}>
      <button type="button" 
        style={{ fontSize: '0.6rem', padding: '0.6rem' }}
        class=" rounded-md text-white " 
        onClick={Notification_new} >
        Notification
        <span class="bg-teal-500 font-bold text-white text-center py-0.5 px-1 rounded">
          {noti_number}
        </span>
      </button>
    </h3>
  )}
</div>
<div>
{User.User_type =='1'&&
                (<button class="flex items-center text-gray-200" onClick={Navigate_SubscribeMess}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="flex absolute -mt-5 ml-4">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </button>)}
                </div>
			<nav ref={navRef}>

      <button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>

      <a> 
    <button style={{color: "white"}} class="text-gray-200" onClick={Navigate_Home}>
        Home
    </button>
</a>
               <a> 
    <button style={{color: "white"}} class="hover:text-gray-200" onClick={ContactUs}>
        Contact Us
    </button>
</a>

				<a>  <button  style={{color: "white"}} class="flex items-center hover:text-gray-200" onClick={Navigate_profile}>
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ marginRight: '10px' }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg> {profile.fname} 
                  
                </button>
              </a>
              
             
              <a>  <button  style={{color: "white"}} class="flex items-center hover:text-gray-200" onClick={Logout}>
                 <FiLogOut className="cursor-pointer w-6 h-6 text-white" style={{ marginRight: '10px' }} />
                   Logout
                </button>
              </a>

				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
    <div class="fixed inset-x-0 bottom-0 pb-2 sm:pb-5 z-50 space-y-4 w-4/5 mx-auto">
  {subscribed_mess_alert.map((item, index) => (
    item.visible && (
      <div key={index} class="rounded-lg bg-indigo-600 p-1 shadow-lg sm:p-2">
        <div class="flex flex-wrap items-center justify-between">
          <div class="flex w-0 flex-1 items-center">
            <span class="flex rounded-lg bg-indigo-800 p-1"  style={{ marginRight: '5px' }}>
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </span>

            <p className="  text-white text-xs text-center my-3" style={{ fontSize: '0.7rem'  ,lineHeight: '1.2'}}>{item.mess_name} is left with only {item.remaining_token} tokens.</p>
          </div>
        
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button type="button" onClick={() => toggleMessage(index)} class="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"><span class="sr-only">Dismiss</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-6 text-white"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
          </div>
        </div>
      </div>
    )
  ))}
</div>
    </div>
	);
}
  
//   return (
//     <div>
//       <div class="flex flex-wrap place-items-center">
//         <section class="relative mx-auto">
//           <nav class="flex justify-between bg-cyan-700 text-white w-screen">
//             <div class=" xl:px-12 py-6 flex w-full items-center">
//             {(User.User_type =='1') && (<button type="button" 
//             class="bg-blue-700 py-2 px-3 rounded-md text-white" onClick={Notification_new} >
//               Notifications
//       <span class="bg-teal-500 font-bold text-white text-center py-1 px-2 text-xs rounded">{noti_number}</span>
//             </button>)}
//               <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-10">
//                 <li>
//                   <button class="hover:text-gray-200" onClick={Navigate_Home}>
//                     Home
//                   </button>
//                 </li>
//                 <li>
//                   <button class="hover:text-gray-200" onClick={ContactUs}>
//                     Contact Us
//                   </button>
//                 </li>
                
//               </ul>
//               {/* <!-- Header Icons --> */}
//               <div class="hidden xl:flex items-center space-x-5 items-center">

//                 {User.User_type =='1'&&
//                 (<button class="flex items-center hover:text-gray-200" onClick={Navigate_SubscribeMess}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     class="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   <span class="flex absolute -mt-5 ml-4">
//                     <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
//                     <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                   </span>
//                 </button>)}
//                 {/* <!-- Sign In / Register      --> */}
//                 <button class="flex items-center hover:text-gray-200" onClick={Navigate_profile}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     class="h-6 w-6 hover:text-gray-200"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </button>
//                 <p className="text-white poppins hidden md:block lg:block">{profile.fname}</p>
//                 <FiLogOut className="cursor-pointer w-6 h-6 text-white" onClick={Logout} />
//               </div>
//             </div>
//             {/* <!-- Responsive navbar --> */}
//             <a class="xl:hidden flex mr-6 items-center" href="#">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 class="h-6 w-6 hover:text-gray-200"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//               <span class="flex absolute -mt-5 ml-4">
//                 <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
//                 <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//               </span>
//             </a>
//           </nav>
//         </section>
//       </div>
//       <div class="fixed inset-x-0 bottom-0 pb-2 sm:pb-5 z-50 space-y-4 w-4/5 mx-auto">
//   {subscribed_mess_alert.map((item, index) => (
//     item.visible && (
//       <div key={index} class="rounded-lg bg-indigo-600 p-2 shadow-lg sm:p-3">
//         <div class="flex flex-wrap items-center justify-between">
//           <div class="flex w-0 flex-1 items-center">
//             <span class="flex rounded-lg bg-indigo-800 p-2">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
//             </span>
//             <p class="ml-3 truncate font-medium text-white">
//               <span class="hidden md:inline">{item.mess_name} is left with only {item.remaining_token} tokens.</span>     
//             </p>
//           </div>
//           <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
//             <a class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
//               href="#">Renew
//             </a>
//           </div>
//           <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
//             <button type="button" onClick={() => toggleMessage(index)} class="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"><span class="sr-only">Dismiss</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-6 text-white"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
//           </div>
//         </div>
//       </div>
//     )
//   ))}
// </div>


//       {/* <!-- Does this resource worth a follow? --> */}
//     </div>
    
//   );
// }

//  export default Navbar;





	


export default Navbar;






