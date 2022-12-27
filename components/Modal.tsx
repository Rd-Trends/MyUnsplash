import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";

interface modalProp {
  children: React.ReactNode;
}

const Modal = ({ children }: modalProp) => {
  const dropIn = {
    hidden: {
      y: "-20px",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 40,
        stiffness: 500,
      },
    },
    exit: {
      y: "20px",
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" bg-[rgba(0,0,0,0.4)] w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white w-[450px] shadow-lg z-10 rounded-xl relative max-w-[85%] m-auto whitespace-pre-wrap"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
