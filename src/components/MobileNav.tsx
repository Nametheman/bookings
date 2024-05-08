"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import drake from "@/assets/images/6lack.jpg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IoHomeOutline,
  IoNewspaperOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { BsWallet } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import flightMap from "@/assets/images/fMap.png";

const MobileNav = () => {
  const links = [
    { path: "/dashboard", name: "DASHBOARD", icon: <IoHomeOutline /> },
    { path: "/flights", name: "FLIGHTS", icon: <PiAirplaneTakeoffLight /> },
    { path: "/wallets", name: "WALLET", icon: <BsWallet /> },
    { path: "/reports", name: "REPORTS", icon: <IoNewspaperOutline /> },
    { path: "/statistics", name: "STATISTICS", icon: <AiOutlinePieChart /> },
    { path: "/settings", name: "SETTINGS", icon: <IoSettingsOutline /> },
  ];
  const pathname = usePathname();

  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <nav className="sm:block lg:hidden pt-3">
      <Sheet>
        <SheetTrigger className="w-[50px] h-[50px] bg-[#435B5A] text-white flex justify-center items-center rounded-md">
          <MdOutlineMenu size={30} />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-[#435B5A] border-none lg:grid grid-rows-12 col-span-2 rounded-r-[2rem] overflow-hidden p-0"
        >
          <div className="row-span-4 bg-[#3C5754] h-[130px] flex justify-center items-center">
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="w-[80px] h-[80px] rounded-full border-r-[#C99C33] border-r-2 border-l-2 border-l-[#c99c3388] border-b-2 border-b-[#c99c33d6] flex justify-center items-center aviShadow">
                <Image
                  src={drake}
                  alt="drake"
                  className="w-[60px] h-[60px] rounded-full hue-rotate-50 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="row-span-8">
            <div>
              <div className="flex flex-col">
                {links.map((link) => {
                  return (
                    <Link
                      href={link.path}
                      className={`flex items-center ml-[1rem] gap-3 navLink px-4 h-[45px] ${
                        activeLink.includes(link.path) ? "activeSideLink" : ""
                      }`}
                      key={link.path}
                    >
                      <div className="text-[#C99C33] text-xl">{link.icon}</div>
                      <p>{link.name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 ml-[1rem] px-4">
              <p className="text-[#C99C33] text-xs font-light">ACTIVE USERS</p>
              <div className="flex items-center mt-3">
                {[1, 2, 3, 4, 5].map((user, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-[35px] h-[35px] rounded-full flex justify-center items-center bg-[#c99c33] border-[2.5px] border-[#435B5A] ${
                        i !== 0 && "ml-[-10px] "
                      }`}
                    >
                      {i === 4 ? (
                        <p className="text-xs text-white">+70</p>
                      ) : (
                        <FaUserAlt color="#fff" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <Image src={flightMap} alt="flight map" className="w-full mt-3" />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
