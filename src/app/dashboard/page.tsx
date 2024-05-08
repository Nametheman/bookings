import React from "react";
import notFoundImage from "@/assets/images/404.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src={notFoundImage}
        alt="not found"
        className="w-[300px] opacity-70"
      />
      <p className="text-[#435B5A] font-semibold">Page Incoming</p>
    </div>
  );
};

export default page;
