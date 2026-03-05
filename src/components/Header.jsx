import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

function NavItem({ text, to }) {
  return (
    <NavLink to={to} className="group relative h-10 overflow-hidden">
      <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
        <span className="h-10 flex items-center justify-center">{text}</span>

        <span className="h-10 flex items-center justify-center">{text}</span>
      </div>
    </NavLink>
  );
}

function Header() {
  return (
    <div
      className="flex justify-center 
    items-center  gap-5 bg-gradient-to-r 
    from-[#e0eefb] via-[#4fabf3] to-[#dfedfb] h-[10rem]"
    >
      <nav
        className="flex justify-center 
      items-center mb-10 pl-6 pr-8 gap-8 relative 
      border border-white/40 p-1 text-white text-md shadow-[0_2px_8px_rgba(255,255,255,0.2)] "
      >
        {/* Corner dots */}
        <span className="absolute top-0 left-0 w-1 h-1 bg-white -translate-x-1/2 -translate-y-1/2"></span>
        <span className="absolute top-0 right-0 w-1 h-1 bg-white translate-x-1/2 -translate-y-1/2"></span>
        <span className="absolute bottom-0 left-0 w-1 h-1 bg-white -translate-x-1/2 translate-y-1/2"></span>
        <span className="absolute bottom-0 right-0 w-1 h-1 bg-white translate-x-1/2 translate-y-1/2"></span>

        {/* Nav Items */}
        <NavItem text="Home" to="/" />
        <NavItem text="Works" to="/Works" />
        <NavItem text="Approach" to="/Approach" />
        <NavItem text="Plans" to="/Plans" />
      </nav>
    </div>
  );
}

export default Header;
