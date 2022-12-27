import React from "react";

const Logo = () => {
  return (
    <div className=" flex items-center select-none pointer-events-none text-darkgrey">
      <div className=" flex flex-col items-center mr-2">
        <span className=" inline-block w-2 h-2 rounded-sm bg-darkgrey mb-1"></span>
        <span className=" inline-block w-5 h-2 rounded-sm bg-darkgrey"></span>
      </div>
      <div className=" flex flex-col">
        <p className=" font-bold text-sm -mb-1">My Unsplash</p>
        <p className=" text-[11px] ">devchallenges.io</p>
      </div>
    </div>
  );
};

export default Logo;
