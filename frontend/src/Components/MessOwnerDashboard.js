import React from "react";
import Footer from "./Footer";
import MessHeading2 from "./MessHeading2";
import MessOwnersSubcribers from "../Components/MessOwnersSubcribers";

function MessOwnerDashboard() {
  return (
    <div className="bg-cyan-600">
      <MessHeading2 />
      <MessOwnersSubcribers />
      <Footer />
    </div>
  );
}

export default MessOwnerDashboard;
