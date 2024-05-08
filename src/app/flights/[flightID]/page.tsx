import React from "react";
import FlightDetails from "./FlightDetails";
import Checkout from "./Checkout";

const page = () => {
  return (
    <div className="md:m-8 m-1 flex flex-col gap-y-8 md:grid grid-cols-12 md:gap-x-8 h-full">
      <FlightDetails />
      <Checkout />
    </div>
  );
};

export default page;
