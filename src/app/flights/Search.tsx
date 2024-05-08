import React, { useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlightModeType, UserFilterType } from "@/types/types";
import { MdEventSeat } from "react-icons/md";
import { useFormik } from "formik";
import useFlightDataStore from "@/store/useFlightData";

const Search = () => {
  const { filterFlightDataSearch } = useFlightDataStore();
  const [date, setDate] = useState<Date>();
  const [numberOfTravellers, setTravellers] = useState<number>(1);
  const [flightClassSelected, setFlightClassSelected] =
    useState<string>("first class");
  const [selectedFlightType, setSelectedFlightType] =
    useState<string>("one-way");

  const travellers = [1, 2, 3, 4];
  const flightClass = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "first class", label: "First Class" },
  ];
  const searchFlightType = [
    { value: "one-way", label: "One Way" },
    { value: "round-trip", label: "Round Trip" },
    { value: "multi-city", label: "Multi City" },
  ];

  const initialSearchValues: UserFilterType = {
    startLocation: "",
    destination: "",
    startAirport: "",
    destinationAirport: "",
    startTime: "",
    numberOfTravellers: 1,
    flightClass: "first class",
    flightType: "one-way",
  };

  const onSubmit = (data: UserFilterType) => {
    console.log(data);
    filterFlightDataSearch(data);
  };

  const { values, handleSubmit, handleReset, setValues } = useFormik({
    initialValues: initialSearchValues,
    onSubmit,
  });

  return (
    <div className="bg-white w-full rounded-[2rem] flex flex-col gap-y-6 lg:grid grid-cols-12 p-2 lg:p-6 lg:gap-x-6 mt-6">
      <form action="" onSubmit={handleSubmit} className="hidden">
        <input type="text" name="startLocation" value={values.startLocation} />
        <input type="text" name="destination" value={values.destination} />
        <input type="text" name="startAirport" value={values.startAirport} />
        <input
          type="text"
          name="destinationAirport"
          value={values.destinationAirport}
        />
        <input type="date" name="date" value={values.startTime} />
        <input
          type="number"
          name="numberOfTravellers"
          value={values.numberOfTravellers}
        />
        <input
          type="text"
          name="flightClass"
          value={values.flightClass}
          onChange={(e) => setFlightClassSelected(e.target.value)}
        />
        <input
          type="text"
          name="flightType"
          value={values.flightType}
          onChange={(e) => setSelectedFlightType(e.target.value)}
        />
      </form>
      <div className="col-span-7 flex flex-col gap-6">
        <div className="flex bg-[#E1ECEB] rounded-full h-[45px] px-[1.5rem] gap-[1.5rem] items-center justify-between">
          <div className="flex items-center gap-2">
            <ImLocation size={20} color="#3C5754" />
            <input
              type="text"
              className="h-full w-full bg-transparent outline-none border-none focus-within:ring-0 focus-visible:ring-0 text-[#435B5A] text-xs font-medium"
              placeholder="Start Location/Airport"
              value={values.startLocation}
              onChange={(e) =>
                setValues({ ...values, startLocation: e.target.value })
              }
            />
          </div>
          <div className="bg-[#3b4b48] w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer">
            <TbArrowsExchange size={20} color="white" />
          </div>
          <div className="border flex items-center gap-2">
            <ImLocation size={20} color="#3C5754" />
            <input
              type="text"
              className="h-full w-full bg-transparent outline-none border-none focus-within:ring-0 focus-visible:ring-0 text-[#435B5A] text-xs font-medium"
              placeholder="End Destination/Airport"
              value={values.destination}
              onChange={(e) =>
                setValues({ ...values, destination: e.target.value })
              }
            />
          </div>
        </div>
        <Tabs
          value={selectedFlightType}
          onValueChange={(value) => {
            setSelectedFlightType(value);
            setValues({ ...values, flightType: value });
          }}
          className="w-full border rounded-full bg-[#E1ECEB] h-[45px] flex items-center"
        >
          <TabsList className="w-full space-x-1 lg:space-x-6 px-[2px] py-0">
            {searchFlightType.map((type: FlightModeType) => {
              return (
                <TabsTrigger
                  value={type.value}
                  key={type.value}
                  className="data-[state=active]:bg-[#435b5a] w-full h-full data-[state=active]:rounded-full data-[state=active]:text-white text-xs text-[#435b5a]"
                >
                  {type.label.toUpperCase()}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>{" "}
      </div>
      <div className="col-span-5 flex flex-col gap-6">
        <div className="flex gap-x-1 lg:gap-x-6">
          <div className="flex-1 bg-[#E1ECEB] rounded-full h-[45px] px-6 flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left border-none text-[#435B5A] text-xs px-0 font-medium",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#435B5A]" />
                  {date ? (
                    format(date, "dd MMMM yyyy")
                  ) : (
                    <span className="text-xs text-[#435B5A]">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#3C5754]">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    console.log(selectedDate);
                    const dateObject = new Date(selectedDate as Date);
                    console.log(dateObject);
                    setDate(selectedDate);

                    setValues({
                      ...values,
                      startTime: format(dateObject, "yyyy-MM-dd'T'HH:mm:ss"),
                    });
                  }}
                  initialFocus
                  className="text-white "
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1 bg-[#E1ECEB] rounded-full h-[45px] flex items-center px-6 gap-2">
            <FaUser color="#435B5A" size={14} />
            <DropdownMenu>
              <DropdownMenuTrigger className="text-[#435B5A] text-[0.7rem] font-medium outline-none">
                {numberOfTravellers}{" "}
                {numberOfTravellers === 1 ? "TRAVELLER" : "TRAVELLERS"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#3C5754] text-white mt-2">
                <DropdownMenuLabel>Travellers</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {travellers.map((traveller) => (
                  <div key={traveller}>
                    <DropdownMenuItem
                      onClick={() => {
                        setTravellers(traveller);
                        console.log(traveller);
                        setValues({
                          ...values,
                          numberOfTravellers: traveller,
                        });
                      }}
                    >
                      {traveller}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex gap-x-1 lg:gap-x-6">
          <div className="flex-1 bg-[#E1ECEB] rounded-full h-[45px] px-6 flex items-center gap-2">
            <MdEventSeat color="#435B5A" />{" "}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-[#435B5A] text-xs font-medium outline-none">
                {flightClassSelected === "economy"
                  ? "ECONOMY"
                  : flightClassSelected === "business"
                  ? "BUSINESS"
                  : "FIRST CLASS"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#3C5754] text-white mt-2">
                <DropdownMenuLabel>Flight Class</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {flightClass.map((fClass) => (
                  <div key={fClass.value}>
                    <DropdownMenuItem
                      onClick={() => {
                        setFlightClassSelected(fClass.value);
                        setValues({
                          ...values,
                          flightClass: fClass.value,
                        });
                      }}
                    >
                      {fClass.label}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            className="flex-1 bg-[#C99C33] rounded-full h-[45px] flex items-center justify-center px-6 text-xs text-white"
            onClick={() => {
              handleSubmit();
            }}
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
