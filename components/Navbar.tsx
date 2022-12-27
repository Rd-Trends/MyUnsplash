import React from "react";
import Logo from "./Logo";
import { AiOutlineSearch } from "react-icons/ai";
import { useAtom } from "jotai";
import { searchAtom } from "../store";
import Button from "./Button";

interface props {
  setShowAddImageModal: (statuse: boolean) => void;
  // setSearch: (search: string) => void;
}

const Navbar = ({ setShowAddImageModal }: props) => {
  const [search, setSearch] = useAtom(searchAtom);
  return (
    <nav className="flex bg-white flex-col md:flex-row md:justify-between mx-4 md:mx-8 lg:mx-20 pt-4 md:pt-6">
      <div className="flex flex-col md:flex-row">
        <Logo />
        <div className="my-4 md:my-0 flex items-center border-secondary border w-full md:w-[300px] rounded-xl md:ml-8 ">
          <button className=" bg-transparent border-none outline-none py-3 px-2">
            <AiOutlineSearch color="#BDBDBD" />
          </button>
          <input
            type="text"
            placeholder="search by name"
            className=" outline-none border-none bg-transparent py-3 px-2 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={() => setShowAddImageModal(true)}>Add a photo</Button>
    </nav>
  );
};

export default Navbar;
