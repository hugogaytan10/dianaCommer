import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
import { ItemDesktop } from "./itemDesktop";
import { ItemMobile } from "./ItemMobile";
export const Item = (props) => {
  const parametros = useParams();
  const id = parametros.id;
  //hacer una varibale que escuche cuando la pantalla sea mayor a 768px
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  return (
    <div>
      <div className="p-2 absolute z-10">
        <NavLink
          to={"/"}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
      </div>
      {(isLargeScreen) ? (
        <ItemDesktop id={id} />
      ) : (
        <ItemMobile id={id} />
      )}
    </div>
  );
};
