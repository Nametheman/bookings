"use client";
import React from "react";
import { useParams } from "next/navigation";
import flightData from "@/helpers/flightData";
import { format } from "date-fns";
import { convertTimeFormat } from "@/helpers/helpers";

const Checkout = () => {
  const params = useParams();
  const flightId =
    typeof params.flightID === "string" && params.flightID.split("_")[1];
  const flight = flightData.find(
    (flight) => flight.id.toLowerCase() === flightId
  );

  return (
    <div className="col-span-5 h-[91%] bg-[#435B5A] rounded-[1.5rem] p-6 shadow-2xl relative">
      <div className="flex-col flex gap-6">
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Start Location:</p>
          <p className="text-end">{flight?.start_location}</p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Start Airport:</p>
          <p className="text-end">{flight?.start_airport}</p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Destination</p>
          <p className="text-end">{flight?.destination}</p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Destination Airport:</p>
          <p className="text-end">{flight?.destination_airport}</p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Start Time:</p>
          <p className="text-end">
            {format(
              new Date(flight?.start_time as string),
              "dd MMM, yyyy hh:mm a"
            )}
          </p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Ticket Class:</p>
          <p className="text-end">
            {flight?.class === "economy"
              ? "Economy"
              : flight?.class === "business"
              ? "Business"
              : "First Class"}
          </p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Flight Mode:</p>
          <p className="text-end">
            {flight?.mode === "one-stop" ? "One Stop" : "Non Stop"}
          </p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Flight Type:</p>
          <p className="text-end">
            {flight?.type === "one-way"
              ? "One Way"
              : flight?.mode === "round-trip"
              ? "Round Trip"
              : "Multi City"}
          </p>
        </div>
        <div className="text-[#e8e8e8] text-sm border-b py-2 flex justify-between">
          <p>Flight Duration:</p>
          <p className="text-end">
            {convertTimeFormat(flight?.duration as string)}
          </p>
        </div>
      </div>
      <button className="flex-1 bg-[#C99C33] rounded-full h-[45px] flex items-center justify-center text-sm font-medium text-white absolute bottom-6 w-auto left-0 right-0 mx-6">
        Checkout (${flight?.price})
      </button>
    </div>
  );
};

export default Checkout;
