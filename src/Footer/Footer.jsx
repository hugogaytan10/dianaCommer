import React from "react";
import fb from "../assets/logo-facebook.svg";
import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="bg-primary h-28 w-full">
      <h3 className="text-white text-center text-2xl font-bold uppercase mt-4">
        Diaz zapatos y accesorios
      </h3>

      <div className="flex justify-around gap-2 mt-5 items-center">
        <a
          target="_blank"
          href="https://www.facebook.com/profile.php?id=100068048930464"
        >
          <img src={fb} alt="fb" />
        </a>
        <NavLink
          to="/politica"
          className="text-white text-center block    bg-primary "
        >
          Política de privacidad
        </NavLink>
        <a href="https://www.ravekh.com" target="_blank">&copy; Powered by Ravekh</a>
      </div>
    </footer>
  );
};
