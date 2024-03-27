import React from "react";
import fb from "../assets/logo-facebook.svg";
export const Footer = () => {
  return (
    <footer className='bg-primary h-52 w-full'>
      <h3 className="text-white text-center text-2xl font-bold uppercase mt-4">Diaz zapatos y accesorios</h3>
      <h4 className="text-white w-3/4 text-center m-auto mt-2">
        Adquiere los mejores zapatos y accesorios en nuestra tienda en línea
      </h4>
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
