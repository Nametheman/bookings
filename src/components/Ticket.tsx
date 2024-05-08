import React from "react";
import Image from "next/image";
import deltaLogo from "@/assets/images/delta.png";
import americanLogo from "@/assets/images/american.png";
import unitedLogo from "@/assets/images/united.png";
import { FlightType } from "@/types/types";
import { convertTimeFormat } from "@/helpers/helpers";
import Link from "next/link";

interface TicketProps {
  className?: string;
  index: number;
  totalTickets: number;
  flight: FlightType;
}

const Ticket: React.FC<TicketProps> = ({
  className,
  index,
  totalTickets,
  flight,
}) => {
  const Circles = ({ className }: { className?: string }) => (
    <div
      className={`bg-[#E1ECEB] rounded-full h-[20px] w-[20px] ${className}`}
    ></div>
  );

  return (
    <div
      className={`${index === 0 ? "rounded-tl-[2rem] rounded-tr-[2rem]" : ""} ${
        index === totalTickets - 1
          ? "rounded-bl-[2rem] rounded-br-[2rem] border-none"
          : ""
      } bg-white w-full h-[150px] px-[1.2rem] py-[1.8rem] relative  border-dashed border-b-[3px]`}
    >
      <div className="h-full flex items-center">
        <div className="flex-[0.6]">
          <Image
            src={
              flight.airline === "Delta Airlines"
                ? deltaLogo
                : flight.airline === "American Airlines"
                ? americanLogo
                : unitedLogo
            }
            alt="logo"
            width={50}
            height={50}
            className="w-[100px] h-[50px]"
          />
        </div>
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-[#435B5A] text-xl">{flight.start_airport}</h2>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[#435B5A] text-[0.4rem] font-semibold">
              {flight.airline.toUpperCase()}
            </p>
            <p className="text-sm text-[#C99C33] font-medium">
              {convertTimeFormat(flight.duration)}
            </p>
            <p className="text-[#435B5A] text-[0.8rem] font-semibold">
              {flight.mode === "one-stop"
                ? "ONE STOP"
                : flight.mode === "non-stop"
                ? "NON STOP"
                : ""}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[#435B5A] text-xl">
              {flight.destination_airport}
            </h2>
          </div>
        </div>
        <div className="flex-[0.6] flex flex-col items-end gap-4">
          <p className="text-[#435B5A] text-[0.7rem] font-semibold">
            ${flight.price.toLocaleString()}
          </p>{" "}
          <Link href={`/flights/flight_${flight.id.toLowerCase()}`}>
            <button className="flex-1 bg-[#C99C33] rounded-full py-2 flex items-center justify-center px-6 text-white text-[0.5rem]">
              BOOK NOW
            </button>
          </Link>
        </div>
      </div>
      {index === 0 || <Circles className="absolute top-[-10px] left-[-10px]" />}
      {index === totalTickets - 1 || (
        <Circles className="absolute bottom-[-10px] left-[-10px]" />
      )}
      {index === 0 || (
        <Circles className="absolute top-[-10px] right-[-10px]" />
      )}
      {index === totalTickets - 1 || (
        <Circles className="absolute bottom-[-10px] right-[-10px]" />
      )}
    </div>
  );
};

export default Ticket;
