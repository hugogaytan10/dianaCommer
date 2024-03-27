import React from "react";
import fb from "../assets/logo-facebook.svg";
export const Footer = () => {
  return (
    <footer className='bg-primary h- w-full'>
      <h3 className="text-white text-center text-2xl font-bold uppercase mt-4">Diaz zapatos y accesorios</h3>

      <div className="flex justify-center gap-2 mt-5">
        <a
          target="_blank"
          href="https://www.facebook.com/profile.php?id=100068048930464"
        >
          <img src={fb} alt="fb" />
        </a>
       
      </div>
    </footer>
  );
};
