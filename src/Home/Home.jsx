import React, { useContext, useEffect, useState } from "react";
import buscador from "../assets/search.svg";
import "./Home.css";
import { Card } from "./card/Card";
import perrito from "../assets/Perrito.webp";
import af1 from "./assetsHome/Af1/AF1.jpg";
import nikeMujer from "./assetsHome/nikeMujer/nike.jpg";
import reebok from "./assetsHome/reebok/reebok.jpg";
import vans from "./assetsHome/vans/vans.jpg";
import adidas from "./assetsHome/Adidas/adidas.jpg";
import af1Negro from "./assetsHome/Af1Negro/af1Negros.jpg";
import nikeMujerBota from "./assetsHome/nikeMujerBota/nikeMujerBota.jpg";
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
      tallas: ["23", "23.5", "24", "24.5", "25", "25.5", "26"],
    },
    {
      id: 2,
      title: "Nike AF1 Negro",
      price: 300,
      img: af1Negro,
      description:
        "Tennis Nike Air Force 1, color Negro. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: ["23", "23.5", "24", "24.5", "25", "25.5", "26"],
    },
    {
      id: 3,
      title: "Nike Air Max 90",
      price: 280,
      img: nikeMujer,
      description:
        "Presentamos el icónico Nike Air Max 90, una verdadera joya en la corona del calzado deportivo. Este modelo clásico, conocido por su durabilidad y diseño estilizado, ofrece una combinación perfecta de tradición y tecnología. ",
      tallas: ["23.5", "24", "24.5", "25", "25.5", "26.5"],
    },
    {
      id: 4,
      title: "Reebok Classic",
      price: 285,
      img: reebok,
      description:
        "Tennis Reebok color blanco con franja negra. Unos tennis casuales para cualquier reunión",
      tallas: ["24", "24.5", "25", "25.5", "26.5"],
    },
    {
      id: 5,
      title: "Vans Old Skool",
      price: 280,
      img: vans,
      description: "Explora las calles con estilo con el icónico Vans Old Skool, un verdadero clásico en el mundo del skate y la moda urbana. Estos tenis representan la esencia de la cultura skate, combinando funcionalidad y moda de una manera única. ",
      tallas: ["26", "26.5", "27"],
    },
    {
      id: 6,
      title: "Adidas Grand Court",
      price: 285,
      img: adidas,
      description:
        "Revive el espíritu del tenis clásico con las Adidas Grand Court, una fusión perfecta de patrimonio y moda moderna. Inspiradas en el icónico calzado de tenis de décadas pasadas, estas zapatillas traen un toque de nostalgia a tu colección de calzado con su diseño atemporal.",
      tallas: ["23", "24.5", "25"],
    },
    {
      id: 7,
      title: "Nike Air Force 1 Mid",
      price: 300,
      img: nikeMujerBota,
      description:
        "Este modelo es conocido por su diseño icónico de corte medio, su correa ajustable en el tobillo para un ajuste seguro y su clásico logotipo de Nike Swoosh en los lados.",
        tallas: ["23", "23.5", "24", "24.5", "25", "25.5", "26"],
    },
  ]);
  const [cardFilter, setCardFilter] = useState(cards);

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
            placeholder="AF1"
            onChange={(e) => {
              Buscador(e.target.value);
            }}
          />
          <img src={buscador} alt="buscador" />
        </div>
      </div>
            <h1 className="text-center font-thin m-4 text-gray-500">Zapatos y accesorios </h1>
      <div className="w-full flex flex-wrap gap-1 justify-between p-2">
        {cardFilter.length > 0 ? (
          cardFilter.map((card) => {
            return (
              <div
                key={`tennis-home-${card.id}`}
                className={`contenedor-card rounded-none ${
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
          })
        ) : (
          <div className="w-full flex flex-wrap justify-center items-center mt-8">
            <h3 className="w-full text-center font-extrabold text-xl text-gray-400">
              No se encontraron resultados
            </h3>
            <img
              src={perrito}
              alt="imagen"
              className="w-3/4 h-96 object-contain"
            />
            <p className="text-gray-400 font-thin">
              Con cada par que compres un perrito será alimentado con croquetas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
