"use client";
import React from "react";
import { useParams } from "next/navigation";
import flightData from "@/helpers/flightData";
import deltaLogo from "@/assets/images/delta.png";
import americanLogo from "@/assets/images/american.png";
import unitedLogo from "@/assets/images/united.png";
import Image from "next/image";
import jfkPort from "@/assets/images/jfkPort.jpeg";
import { format } from "date-fns";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const FlightDetails = () => {
  const params = useParams();
  const router = useRouter();
  const flightId =
    typeof params.flightID === "string" && params.flightID.split("_")[1];

  const flight = flightData.find(
    (flight) => flight.id.toLowerCase() === flightId
  );

  return (
    <div className="col-span-7 border-r-[3px] border-dashed h-full border-[#939393] pr-8">
      <div
        onClick={() => router.back()}
        className="flex items-center text-sm text-[#435B5A] mb-6 cursor-pointer"
      >
        <IoIosArrowRoundBack size={20} />
        <p>Back</p>
      </div>
      <div className="border-b pb-4">
        <div>
          <Image
            src={
              flight?.airline === "Delta Airlines"
                ? deltaLogo
                : flight?.airline === "American Airlines"
                ? americanLogo
                : unitedLogo
            }
            alt="logo"
            width={100}
            height={100}
          />
          <h2 className="text-[#435B5A] font-medium mt-1">{flight?.airline}</h2>
        </div>
      </div>
      <Image
        src={jfkPort}
        alt="airport_image"
        width={400}
        height={400}
        className="w-[500px] rounded-3xl"
      />
      <p className="font-medium text-[#435B5A] text-sm mt-8">Summary:</p>
      <p className="text-[#435B5A] text-sm mt-2">
        Flight starts from {flight?.start_location} on{" "}
        {format(new Date(flight?.start_time as string), "EEEE, MMMM dd, yyyy")}{" "}
        at {format(new Date(flight?.start_time as string), "h:mm a")} and the
        destination is {flight?.destination} at {flight?.destination_airport}{" "}
        airport. This is a{" "}
        {flight?.mode === "non-stop" ? "Non Stop" : "One Stop"} and you can book
        a{" "}
        {flight?.type === "round trip"
          ? "Round Trip"
          : flight?.type === "multi-city"
          ? "Multi-City"
          : "One Way"}{" "}
        trip. Your flight ticket is available for the{" "}
        {flight?.class === "economy"
          ? "Economy"
          : flight?.class === "business"
          ? "Business"
          : "First Class"}{" "}
        class.
      </p>
    </div>
  );
};

export default FlightDetails;
