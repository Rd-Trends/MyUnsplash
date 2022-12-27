import React from "react";

const Logo = () => {
  return (
    <div className=" flex items-center select-none pointer-events-none text-darkgrey">
      <div className=" flex flex-col items-center mr-2">
        <span className=" inline-block w-[7px] h-[7px] rounded-[2px] bg-darkgrey mb-1"></span>
        <span className=" inline-block w-[20px] h-[7px] rounded-[2px] bg-darkgrey"></span>
      </div>
      <div className=" flex flex-col">
        <p className=" font-bold text-sm -mb-1">My Unsplash</p>
        <p className=" text-[9px] ">devchallenges.io</p>
      </div>
    </div>
  );
};

export default Logo;
