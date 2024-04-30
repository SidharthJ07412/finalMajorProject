import "./App.css";
import MessTiffins from "./Components/MessTiffins";
import Login from "./Components/Login";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import MessOwnerDashboard from "./Components/MessOwnerDashboard";
import Profile from "./Components/Profile";
import UserSubscriptionPage from "./Components/UserSubscriptionPage";
import SubscribeMessPage from "./Components/SubscribeMessPage";
import MessRegistration from "./Components/MessRegistration";
import ContactUs from './Components/ContactUs';
import DeliveryDashboard from './Components/DeliveryDashboard';
import Profilemess from "./Components/Profilemess";
import DeliveryMap from "./Components/DeliveryMap";
import UpdateAddress from "./Components/UpdateAddress";
import UpdateAddressmess from "./Components/UpdateAddressmess";
import OTPpage from "./Components/OTPpage";



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/UserSubscriptionPage" element={<UserSubscriptionPage />} />
        <Route path="/SubscribeMessPage" element={<SubscribeMessPage />} />
        <Route path="/tiffin" element={<MessTiffins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/mess" element={<MessOwnerDashboard />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/delivery" element={<DeliveryDashboard/>}/>
        <Route path="/MessRegistration" element={<MessRegistration/>}/>
        <Route path="/DeliveryMapPage" element={<DeliveryMap/>}/>
        <Route path="/profilemess" element={<Profilemess/>}/>
        <Route path="/Updateaddress" element={<UpdateAddress/>}/>
        <Route path="/Updateaddressmess" element={<UpdateAddressmess/>}/>
        <Route path="/otppage" element = {<OTPpage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
