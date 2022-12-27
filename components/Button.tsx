import React from "react";
import classNames from "classnames";

interface BtnProps {
  tag?: React.ElementType;
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  color: "primary" | "secondary" | "danger";
  className: string;
  width?: string;
  loading: boolean;
  [x: string]: any;
}

const Button = React.forwardRef(
  (
    {
      children,
      tag,
      color = "primary",
      className = "",
      size = "md",
      loading,
      ...restProps
    }: BtnProps,
    ref
  ) => {
    let Tag = tag ? tag : "button";

    const btnClassName = classNames(
      `flex items-center justify-center shadow-[0px_1px_6px_rgba(0,0,0,0.1)] outline-none disabled:opacity-70 disabled:cursor-not-allowed py-3 px-6 rounded-lg ${className}`,
      {
        "bg-primary text-white": color === "primary",
        "bg-danger text-white": color === "danger",
        "text-secondary bg-transparent": color === "secondary",
      }
    );

    return (
      <Tag {...restProps} className={btnClassName} ref={ref}>
        {loading && (
          <>
            <span className=" w-5 h-5 border-4 border-gray-200 border-b-transparent rounded-full animate-spin"></span>
            <span className="pl-4"> Processing...</span>
          </>
        )}
        {!loading && children}
      </Tag>
    );
  }
);

Button.displayName = "Button";

export default Button;
