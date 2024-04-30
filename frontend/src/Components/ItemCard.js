import React from "react";
import "../ComponentStyles/itemCard.css";
import { useNavigate } from "react-router-dom";

function ItemCard(props) {
  const { name, description, image, price, mess_id } = props;
  const navigate = useNavigate();
  const Navigate_SubscribeMessPage = ()=>{
    // navigate("/subscribeMessPage");
    navigate("/subscribeMessPage", { replace: true, state: {mess_id,price,name} });
  }

  return (

    <div className="ml-1 mr-1 mt-5 bg-cyan-50 border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-1 rounded-lg relative">
            {/* <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">khjbh</span> */}
            <img className="mx-auto h-20 transform transition duration-300 hover:scale-105 object-scale-down" src={image} alt="" />
            <div className="flex flex-col items-center my-3">
                <h1 className="h-5 text-center text-gray-900 poppins text-sm" style={{ fontSize: '0.6rem',lineHeight: '1'}}>{name}</h1>
                <p className="h-20 text-gray-500 poppins text-xs text-center my-2" style={{ fontSize: '0.5rem'  ,lineHeight: '1.4'}}>{description}</p>
                <h2 className="text-gray-900 poppins text-xs font-bold my-1" >₹{price}</h2>
                <button
            onClick={Navigate_SubscribeMessPage}
            className="bg-cyan-600 lg:text-xs inline-flex items-center justify-center text-xs p-1 font-medium text-center text-white rounded-lg focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" style={{ fontSize: '0.5rem'}}>Subscribe</button>
            </div>
        </div>
  );
}

export default ItemCard;


// function ItemCard(props) {
//   const { name, description, image, price, rating, mess_id } = props;

//   const navigate = useNavigate();
//   const Navigate_SubscribeMessPage = ()=>{
//     // navigate("/subscribeMessPage");
//     navigate("/subscribeMessPage", { replace: true, state: {mess_id,price,name} });
//   }

//   return (

//     <div className="bg-cyan-100 dark:bg-gray-800 my-8 card_margin">
//       <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
//         <div className="mr-auto place-self-center lg:col-span-7">
//           <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
//             {name}
//           </h1>
//           <p className="max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-2xl dark:text-gray-400">
//             {description}
//           </p>
//           <div></div>

//           <h1 className="lg:text-2xl inline-flex items-center justify-center py-3 mr-5 text-base font-medium text-center text-gray-900 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:focus:ring-gray-800">
//             Monthly Price: ₹{price}{" "}
//           </h1>
//           <button
//             onClick={Navigate_SubscribeMessPage}
//             className="bg-cyan-600 lg:text-2xl inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 rounded-lg focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//           >
//             Subscribe
//           </button>
//           <a
//             href="#"
//             class="ml-3 text-xl inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray rounded-lg bg-blue-800  hover:bg-blue-800 focus:ring-4 dark:focus:ring-blue-900"
//           >
//             Contact
//           </a>
//         </div>
//         <div className="hidden lg:mt-0 lg:col-span-4 lg:flex rounded-lg">
//           <img src={image} alt="mockup" className="rounded-lg" s />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemCard;
