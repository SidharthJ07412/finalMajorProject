import React, { useState } from 'react';

const Menu = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const {tiffin_details} =props;
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative z-10 flex justify-center items-center">
      <button className="text-xs bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-2 m-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={togglePopup}>
        View Menu
      </button>
      {showPopup && (
        <div className="fixed top-1/2 bg-cyan-50 p-4 rounded-lg shadow-xl max-w-screen-xl">
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ fontSize: '1rem'  ,lineHeight: '1'}}>Lunch Menu</h2>
            <p className=" mb-6" style={{ fontSize: '0.8rem'  ,lineHeight: '1'}}>
              {tiffin_details}
              
              
            </p>
          </div>
          {/* <div className="border-t border-gray-300 pt-6 mt-6">
            <h2 className="text-xl font-bold mb-3">Dinner Menu</h2>
            <p className=" mb-6">
            {tiffin_details}
              
             
            </p>
          </div> */}
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded mt-4 block w-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50" style={{ fontSize: '0.8rem'  ,lineHeight: '1'}}
                  onClick={togglePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;