import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import { useNavigate } from "react-router-dom";

const ProfileMess = () => {
  const cookies = new Cookies();
  const User = cookies.get('User');
  const [profile, setProfile] = useState({});
  const [menu, setMenu] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [rating,setrating]=useState(4);
  const [Mess_id,update_Mess_id] = useState(0);
  const tags = ['Rice', '4 Chapatis','5 Chapatis', 'Dal', 'Mix Vegetable', 'Curry','Paneer dish','Mouth Freshner', 'Gulab Jamun','Salad','Pickle','Seasonal veg']; 
  const [inputValue, setInputValue] = useState('');
  const [reviewcount,setreviewcount] = useState(0);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.post('https://healthymealz22-04-24f.onrender.com/Customer/fetch_profile', {
        User_id: User.User_id,
      });
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchRating = async () => {
    try {
      const res = await axios.post('https://healthymealz22-04-24f.onrender.com/Customer/View_mess_rating',{
        Mess_id: Mess_id,
      });
      setrating(+res.data.average);
      setreviewcount(res.data.count);
      
    } catch (error) {
      console.error('Error fetching Ratings:', error);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.post('https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_menu', {
        User_id: User.User_id,
      });
      setMenu(res.data.tiffin_details);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  function updateAddress (){
      navigate("/Updateaddress");
  };

  const updateMenu = async () => {
    try {
      const res = await axios.post('https://healthymealz22-04-24f.onrender.com/Mess_owner/update_menu', {
        User_id: User.User_id,
        newMenu: selectedTags,
      });
      setMenu(res.data.tiffin_details);
      alert('Menu updated successfully!');
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const fetch_mess_id = async (e) => {
    // console.log("messssss"+User_id);
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/fetch_mess_id/",
      {
        "User_id":User.User_id
      })
      .then((res) => {
        update_Mess_id(res.data.mess_id);
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchMenu();
    fetch_mess_id();
  }, []);

  useEffect(()=>{
    fetchRating();
  },[Mess_id]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // If the tag is already selected, remove it
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      // If the tag is not selected, add it
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (inputValue !== '') {
      // Add custom tag to the list
      setSelectedTags([...selectedTags, inputValue]);
      setInputValue('');
    }
  };

  if (!cookies.get("User")) {
    return null; // Don't render anything if user is not found
  }
  else
  return (
    <div className="bg-cyan-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-5">
        <div className="bg-cyan-50 shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-center mb-3">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNrK36yrCd6DHKFr-x1dFrkk-49JBODBCBAjwBMZ4hCw2pzBRjpNH8K4Su7nu0cn-KeEkdwno3ELx9izvdJn3zIyR1zaVk7HaZvprBRQQOWMwkVtlKdWi-aieK56NrFyDBtpS1wOw1p0Y/s1600/Gaurav+sharma+Indian+Models+Fashion+Photographer09.jpg"
              alt="Profile Picture"
              className="h-24 w-24 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profile.fname} Mess</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            
          </div>
          <div className="items-center gap-2 text-blue-gray-500">
      <ul className="flex justify-center">
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={rating<1?'none':'currentColor'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mr-1 h-5 w-5 text-warning">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={rating<2?'none':'currentColor'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mr-1 h-5 w-5 text-warning">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={rating<3?'none':'currentColor'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mr-1 h-5 w-5 text-warning">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={rating<4?'none':'currentColor'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mr-1 h-5 w-5 text-warning">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={rating<5?'none':'currentColor'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mr-1 h-5 w-5 text-warning">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  
</ul>
<div color="blue-gray" className="flex justify-center text-blue-gray-500 mb-5 mt-1" style={{fontSize : '0.6rem'}}>
        (Based on {reviewcount} Reviews)
      </div>
      
    </div>
          <div className='flex items-center justify-center'><button className=""
              onClick={updateAddress}
              class="bg-green-400 text-white py-1 px-3 rounded-md  hover:bg-blue-600 flex items-center justify-center text-xs ">
              <LocationMarkerIcon className="h-5 w-5 mr-2 text-red-500" />
              Update Address
            </button></div>
          
          <div className="mb-6 text-center">
            
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Contact Information</h3>
            <p className="text-xs text-gray-600">Contact: {profile.phone_num}</p>
            <p className="text-xs text-gray-600">Address: {profile.user_address}</p>
          </div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Current Mess Menu</h3>
            <p className="text-xs text-gray-600">{menu}</p>
            
            {/* <input
              type="text"
              value={newMenu}
              onChange={(e) => setNewMenu(e.target.value)}
              placeholder="Enter new menu details"
              className="w-full py-2 px-4 rounded-md border border-cyan-300 mt-2 focus:outline-none focus:border-blue-500"
            /> */}
            <div className="p-2 mt-2">
      <div className="flex flex-wrap justify-center">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`text-xs m-1 px-2 py-1 rounded-full cursor-pointer ${
              selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </div>
        ))}
        <div className="flex">
        </div>
        <input
          type="text"
          className="text-xs mt-4 px-2 py-1 rounded-md bg-gray-300 border border-gray-300 p-1"
          // placeholder="Enter Item"
          value={inputValue}
          onChange={handleInputChange}
        />
        
      </div>
      
      <div className="mt-4">
        
        <ul className='text-xs text-gray-600'>
          {selectedTags.map((tag, index) => (
            <span key={index}>{tag},  </span>
          ))}
          
        </ul>
      </div>
      <button
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white m-3 px-2 py-2 rounded-md"
          onClick={handleInputKeyPress}
        >
          Add Item
        </button>
        <button
              onClick={updateMenu}
              className="text-xs bg-orange-300 text-white m-3 py-2 px-3 rounded-md hover:bg-blue-600"
            >
              Update Menu
            </button>
    </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMess;