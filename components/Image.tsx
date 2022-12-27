import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DeleteImage from "./DeleteImage";

interface props {
  src: string;
  label: string;
  id: string;
}

const Image = ({ src, label, id }: props) => {
  const [showDeleteImageModal, setShowDeleteImageModal] =
    useState<boolean>(false);

  return (
    <div>
      <div className=" group relative rounded-xl md:rounded-3xl">
        <img src={src} alt={label} className="rounded-xl md:rounded-3xl w-full" />
        <div className=" absolute top-0 left-0 bg-[rgba(0,0,0,0.38)] rounded-3xl w-full h-full hidden group-hover:flex flex-col justify-between items-end p-4">
          <button
            className=" border border-[#EB5757] text-[#EB5757] rounded-[38px] py-1 w-[63px] text-center text-[10px] float-right "
            onClick={() => setShowDeleteImageModal(true)}
          >
            delete
          </button>
          <p className="w-full text-white">{label}</p>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {showDeleteImageModal && (
          <DeleteImage
            setShowDeleteImageModal={setShowDeleteImageModal}
            id={id}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Image;
