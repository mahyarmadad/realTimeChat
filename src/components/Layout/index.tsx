import React from "react";
import Navbar from "../Navbar";

type Props = {
  className?: string;
  children: React.ReactNode;
  noNavbar?: Boolean;
};
export default function Layout({className = "", children, noNavbar, ...props}: Props) {
  return (
    <div className={`flex flex-col h-screen ${noNavbar ? "" : "pt-14"} ${className}`} {...props}>
      {noNavbar ? null : <Navbar />}
      <div className="grow">{children}</div>
    </div>
  );
}
