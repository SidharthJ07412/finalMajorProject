import React from 'react';
import { useNavigate } from "react-router-dom";

const Card3 = ({ messName, numberOfTiffins, deliveryTime, status }) => {

    const navigate = useNavigate();

  return (
    <div className="bg-cyan-150 rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        
        {/* Mess Name and Status */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-800">{messName}</h2>
          </div>
          
          {/* Status Bar with Right Tick */}
          <div className="flex items-center space-x-2">
            <span className={status === 'OnGoing' ? 'text-orange-600' : 'text-green-500'}>{status}</span>
            {
                status !== 'OnGoing'&&(<svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-green-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M3.293 9.293a1 1 0 011.414 0l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L10 10.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5z" 
                clipRule="evenodd" 
              />
            </svg>)
            }
            
          </div>
        </div>

        {/* Number of Tiffins */}
        <div className="mb-2">
          <p className="text-gray-600">
            Number of Tiffins: <span className="font-medium">{numberOfTiffins}</span>
          </p>
        </div>

        {/* Delivery Time */}
        <div className="mt-9">
          <p className="text-gray-600">
            Upcoming Delivery Time: <span className="font-medium">{deliveryTime}</span>
          </p>
        </div>

        {/* Edit Button */}
        {status === 'Delivered'&&(<div className="flex justify-end">
          <button
            className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={()=>{navigate('/UserSubscriptionPage');}}
          >
            Edit
          </button>
        </div>)}

        
        

        {/* Custom Dotted Line */}
        <div className="mt-4">
  <div 
    className="relative border-t-2 border-dashed border-gray-400 mb-4" 
  ></div>
</div>
        
        <div className="flex justify-end">
        </div>
      </div>
    </div>
  );
};

export default Card3;