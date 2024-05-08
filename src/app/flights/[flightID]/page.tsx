import React from "react";
import FlightDetails from "./FlightDetails";
import Checkout from "./Checkout";

const page = () => {
  return (
    <div className="m-8 grid grid-cols-12 gap-x-8 h-full">
      <FlightDetails />
      <Checkout />
    </div>
  );
};

export default page;
