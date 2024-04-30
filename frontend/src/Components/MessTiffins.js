import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ItemCard from "./ItemCard";
import MessHeading from "./MessHeading";
import Footer from "./Footer";
import "../ComponentStyles/messTiffins.css";
import { XIcon } from '@heroicons/react/solid';
import { BiSolidMapPin } from "react-icons/bi";


function MessTiffins() {

  const cookies = new Cookies();
  const user_id = cookies.get("User").User_id;

  const settings = {
    // autoplay:true,
    // autoplaySpeed: 2000,
    dots: true,
    infinite: false,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const path1="/images/image-from-rawpixel-id-12350124-png.png";
  const path2="/images/image-from-rawpixel-id-12624299-png.png"
  const path3= "/images/image-from-rawpixel-id-13644003-png.png"
  const path4="https://pluspng.com/img-png/veg-thali-png-exotic-tastes-of-india-from-thali-to-tandoori-484.png"
  const [tiffin, set_tiffin] = useState([]);
  const [filteredMessList, setFilteredMessList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messlist, setMessList]= useState([]);
 


  // const fetchMess = async (e) => {
  //   await axios
  //     .post("https://healthymealz22-04-24f.onrender.com/Customer/View_mess/")
  //     .then((res) => {
  //       set_tiffin(res.data);
  //     });
  // };

  const fetchNearbyMess = async(e) => {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Customer/fetchNearbyMess/",
      {
        "user_id": user_id 
      })
      .then((res) => {
        setFilteredMessList(res.data);
        setMessList(res.data);
      });
  }

  useEffect(() =>{
    fetchNearbyMess();
  },[]);

   useEffect(() => {
		setFilteredMessList(filteredMessList);
	}, []);


  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    setSearchTerm(term);
    const filtered = messlist.filter(mess =>
      ((mess.mess_name && mess.mess_name.toLowerCase().includes(term) )|| (mess.tiffin_details && mess.tiffin_details.toLowerCase().includes(term)))
    );
    setFilteredMessList(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    //setFilteredMessList(messlist);
  };

  return (
    <div className="bg-cyan-600">
      <MessHeading />
      <section className="mb-5 mt-7 max-w-screen-xl mx-auto px-6">
            {/* food Menu tab  */}
            <div className="flex items-center justify-center space-x-6">
            </div>

            {/* all foods  */}
            <div className="flex mb-1 h-8">
        <input
          type="text"
          placeholder="Search for a mess..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none"
        />
        {(searchTerm) ? ( // Display cross icon only when search term is not empty
          <button
            onClick={handleClearSearch}
            className="bg-gray-200 text-gray-600 hover:text-gray-800 focus:outline-none  px-2 py-2"
          >
            <XIcon className="h-3 w-3" />
          </button>
        ):null}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center border border-gray-300 bg-blue-500 text-white text-xs font-semibold px-2 py-2 focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="slider-container">
              
      <Slider {...settings}>
        
        {filteredMessList.map((ele,index) => (
                    <ItemCard
                    
          mess_id={ele.mess_id}
          name={ele.mess_name}
          description={ele.tiffin_details}
          image={index % 4 === 1 ? path1 : index % 4 === 2 ? path2 : index % 4 === 3 ? path3 : path4}
          price={ele.subscription_price}
          rating={ele.rating}
                    />
                ))}
      </Slider>
    </div>
        </section>
      <Footer />
      
    </div>
  );
}

export default MessTiffins;