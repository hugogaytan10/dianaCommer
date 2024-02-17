import React, { useContext, useEffect, useState } from "react";
import buscador from "../assets/search.svg";
import "./Home.css";
import { Card } from "./card/Card";

import af1 from "./assetsHome/Af1/AF1.jpeg";
import nikeMujer from "./assetsHome/nikeMujer/nike.jpg";
import reebok from "./assetsHome/reebok/reebok.jpg";
import vans from "./assetsHome/vans/vans.jpg";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
export const Home = () => {
  const contexto = useContext(AppContext);
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Nike AF1",
      price: 300,
      img: af1,
      description:
        "Tennis Nike Air Force 1, color blanco. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: ["24", "25", "26", "27"],
    },
    {
      id: 2,
      title: "Nike Deportivo",
      price: 280,
      img: nikeMujer,
      description:
        "Tennis Nike para mujer, color negro. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: ["24", "25", "26", "27"],
    },
    {
      id: 3,
      title: "Reebok Classic",
      price: 285,
      img: reebok,
      description:
        "Tennis Reebok color blanco con franja negra. Unos tennis casuales para cualquier reunión",
      tallas: ["24", "25", "26", "27"],
    },
    {
      id: 4,
      title: "Vans Old Skool",
      price: 280,
      img: vans,
      description: "Vans clásicos para un estilo urbano y juvenil",
      tallas: ["24", "25", "26", "27"],
    },
  ]);
  const [cardFilter, setCardFilter] = useState([
    {
      id: 1,
      title: "Nike AF1",
      price: 300,
      img: af1,
      description:
        "Tennis Nike Air Force 1, color blanco. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: ["24", "25", "26", "27", "28", "29"],
    },
    {
      id: 2,
      title: "Nike Deportivo",
      price: 280,
      img: nikeMujer,
      description:
        "Tennis Nike para mujer, color negro. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: ["24", "25", "26", "27"],
    },
    {
      id: 3,
      title: "Reebok Classic",
      price: 285,
      img: reebok,
      description:
        "Tennis Reebok color blanco con franja negra. Unos tennis casuales para cualquier reunión",
      tallas: ["24", "25", "26", "27"],
    },
    {
      id: 4,
      title: "Vans Old Skool",
      price: 280,
      img: vans,
      description: "Vans clásicos para un estilo urbano y juvenil",
      tallas: ["24", "25", "26", "27"],
    },
  ]);

  const Buscador = (texto) => {
    const textoMinusculas = texto.toLowerCase();
    const filtro = cards.filter((card) => {
      const tituloMinusculas = card.title.toLowerCase();
      if (tituloMinusculas.includes(textoMinusculas)) {
        return card;
      }
    });
    setCardFilter(filtro);
  };
  useEffect(() => {
    const itemsCart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(itemsCart.length);
  }, []);
  return (
    <div className="block min-h-screen w-full bg-white">
      <div className="contenedor-buscador">
        <div className="inputIcono">
          <input
            type="text"
            className="inputBuscador"
            placeholder="Tennis AF1"
            onChange={(e) => {
              Buscador(e.target.value);
            }}
          />
          <img src={buscador} alt="buscador" />
        </div>
       
      </div>

      <div className="w-full flex flex-wrap gap-1 justify-between p-2">
        {cardFilter.map((card) => {
          return (
            <div
              key={`tennis-home-${card.id}`}
              className={`contenedor-card ${
                card.id % 2 == 0 ? "mt-8" : "mt-0"
              }`}
            >
              <Card
                title={card.title}
                price={card.price}
                img={card.img}
                description={card.description}
                tallas={card.tallas}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
