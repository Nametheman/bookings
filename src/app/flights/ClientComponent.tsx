"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Ticket from "@/components/Ticket";
import flightData from "@/helpers/flightData";
import { FlightType } from "@/types/types";
import flightMap from "@/assets/images/fMap.png";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RangeSlider from "rsuite/RangeSlider";

import "rsuite/RangeSlider/styles/index.css";

const ClientComponent = () => {
  const flightClass = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "first class", label: "First Class" },
  ];
  const [flightClassSelected, setFlightClassSelected] = useState<string>("");
  const [selectedFlightMode, setSelectedFlightMode] =
    useState<string>("non-stop");
  const flightMode = [
    { value: "non-stop", label: "NON STOP" },
    { value: "one-stop", label: "ONE STOP" },
    { value: "more-stop", label: "MORE STOP" },
  ];
  return (
    <div className="h-full">
      <Search />
      <>
        <div className="grid grid-cols-12 mt-8 gap-x-8">
          <p className="font-medium text-[#435B5A] col-span-8">
            TOTAL FLIGHTS (25)
          </p>
          <div className="col-span-4 flex items-center gap-6">
            <button className="text-xs text-[#435B5A] flex-[0.8] bg-white h-[35px] rounded-full">
              FILTER
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xs text-[#435B5A] flex-1 bg-white h-[35px] rounded-full text-center]">
                {flightClassSelected === "economy"
                  ? "ECONOMY"
                  : flightClassSelected === "business"
                  ? "BUSINESS"
                  : flightClassSelected === "first class"
                  ? "FIRST CLASS"
                  : "TICKET OF CLASS"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#3C5754] text-white mt-2">
                <DropdownMenuLabel>Flight Class</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {flightClass.map((fClass) => (
                  <div key={fClass.value}>
                    <DropdownMenuItem
                      onClick={() => setFlightClassSelected(fClass.value)}
                    >
                      {fClass.label}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-12 h-full max-h-[430px] overflow-y-scroll mt-8 gap-x-8">
          <div className="col-span-8">
            {flightData.map((flight: FlightType, i) => (
              <Ticket
                key={i}
                index={i}
                totalTickets={flightData.length}
                flight={flight}
              />
            ))}
          </div>
          <div className="col-span-4">
            <div className="bg-[#3C5754] w-full h-[430px] rounded-[2rem] sticky top-0 overflow-hidden">
              <div className="bg-[#435B5A] p-6">
                <div className="flex items-end justify-between text-[#eaeaea] text-[0.7rem]">
                  <div>
                    <p>FROM</p>
                    <h3 className="text-xl">JFK</h3>
                  </div>
                  <p>NON-STOP</p>
                  <div>
                    <p className="text-end">TO</p>
                    <h3 className="text-xl">ORD</h3>
                  </div>
                </div>
                <Image
                  src={flightMap}
                  alt="flight map"
                  className="w-full mt-10"
                />
              </div>
              <div className="mt-4">
                {" "}
                <Tabs
                  value={selectedFlightMode}
                  onValueChange={(value) => {
                    setSelectedFlightMode(value);
                  }}
                  className="w-full rounded-full bg-transparent flex items-center"
                >
                  <TabsList className="w-full px-4 py-0">
                    {flightMode.map((type: any) => {
                      return (
                        <TabsTrigger
                          value={type.value}
                          key={type.value}
                          className="data-[state=active]:bg-[#C99C33] w-full h-full data-[state=active]:rounded-full data-[state=active]:text-white text-[0.6rem] text-white"
                        >
                          {type.label.toUpperCase()}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>{" "}
              </div>
              <div className="mt-8 px-6">
                {" "}
                <RangeSlider defaultValue={[10, 50]} min={0} max={200} />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ClientComponent;
