import React, { useContext, useEffect, useState } from "react";
import buscador from "../assets/search.svg";
import "./Home.css";
import { Card } from "./card/Card";
import perrito from "../assets/Perrito.webp";
import Banner from "../assets/bannerDiana.png";
import af1 from "./assetsHome/Af1/AF1.jpg";
import nikeMujer from "./assetsHome/nikeMujer/nike.jpg";
import reebok from "./assetsHome/reebok/reebok.jpg";
import vans from "./assetsHome/vans/vans.jpg";
import adidas from "./assetsHome/Adidas/adidas.jpg";
import af1Negro from "./assetsHome/Af1Negro/af1Negros.jpg";
import nikeMujerBota from "./assetsHome/nikeMujerBota/nikeMujerBota.jpg";
import nikeCafe from "./assetsHome/NikeCafe/nikeCafe.jpg";
import nikeNina from "./assetsHome/NikeNina/nikeNina.jpg";
import nikeForceRojos from "./assetsHome/NikeForceRojos/NikeForceRojos.jpg";
import nikeForceRojosNino from "./assetsHome/NikeForceRojosNino/nikeNino.jpg";
import nikeForceAzules from "./assetsHome/NikeForceAzules/NikeForceAzules.jpg";
import pumaMujer from "./assetsHome/PumaMujer/pumaMujer.jpg";
import { AppContext } from "../Context/AppContext";
export const Home = () => {
  const contexto = useContext(AppContext);
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Nike AF1",
      price: 270,
      img: af1,
      description:
        "Tennis Nike Air Force 1, color blanco. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: [
        "22",
        "23",
        "23.5",
        "24",
        "24.5",
        "25",
        "26",
        "26.5",
        "27",
        "27.5",
        "28",
      ],
    },
    {
      id: 2,
      title: "Nike AF1 Negro",
      price: 270,
      img: af1Negro,
      description:
        "Tennis Nike Air Force 1, color Negro. Sube de nivel tu estilo con estos nuevos snickers!",
      tallas: ["25", "26", "26.5", "27", "27.5", "28", "28.5"],
    },
    {
      id: 3,
      title: "Nike Air Max 90",
      price: 250,
      img: nikeMujer,
      description:
        "Presentamos el icónico Nike Air Max 90, una verdadera joya en la corona del calzado deportivo. Este modelo clásico, conocido por su durabilidad y diseño estilizado, ofrece una combinación perfecta de tradición y tecnología. ",
      tallas: ["23.5", "24.5", "25", "25.5", "26.5"],
    },
    {
      id: 4,
      title: "Reebok Classic",
      price: 270,
      img: reebok,
      description:
        "Tennis Reebok color blanco con franja negra. Unos tennis casuales para cualquier reunión",
      tallas: ["24", "25.5"],
    },
    {
      id: 5,
      title: "Vans Old Skool",
      price: 270,
      img: vans,
      description:
        "Explora las calles con estilo con el icónico Vans Old Skool, un verdadero clásico en el mundo del skate y la moda urbana. Estos tenis representan la esencia de la cultura skate, combinando funcionalidad y moda de una manera única. ",
      tallas: ["26.5"],
    },
    {
      id: 6,
      title: "Adidas Grand Court",
      price: 270,
      img: adidas,
      description:
        "Revive el espíritu del tenis clásico con las Adidas Grand Court, una fusión perfecta de patrimonio y moda moderna. Inspiradas en el icónico calzado de tenis de décadas pasadas, estas zapatillas traen un toque de nostalgia a tu colección de calzado con su diseño atemporal.",
      tallas: ["23", "24.5", "25"],
    },
    {
      id: 7,
      title: "Nike Air Force 1 Mid",
      price: 270,
      img: nikeMujerBota,
      description:
        "Este modelo es conocido por su diseño icónico de corte medio, su correa ajustable en el tobillo para un ajuste seguro y su clásico logotipo de Nike Swoosh en los lados.",
      tallas: ["23", "25", "25.5", "26.5"],
    },
    {
      id: 8,
      title: "Nike Air Force 1 with Supreme",
      price: 270,
      img: nikeCafe,
      description:
        "Estas zapatillas Nike Air Force 1 destacan por su diseño elegante y contemporáneo, perfectas para amantes del estilo urbano. Con acabados de alta calidad y una comodidad inigualable, se adaptan perfectamente a cualquier ocasión. La colaboración con marcas icónicas añade un toque exclusivo y distintivo. Ideales para quienes buscan combinar moda y funcionalidad en su calzado diario.",
      tallas: ["26.5", "27", "27.5", "28"],
    },
    {
      id: 9,
      title: "Nike Air Force Negros Infantil",
      price: 200,
      img: nikeNina,
      description:
        "Estas zapatillas Nike destacan por su diseño elegante y contemporáneo, perfectas para amantes del estilo urbano. Con acabados de alta calidad y una comodidad inigualable, se adaptan perfectamente a cualquier ocasión. La colaboración con marcas icónicas añade un toque exclusivo y distintivo. Ideales para quienes buscan combinar moda y funcionalidad en su calzado diario.",
      tallas: ["18", "18.5", "19.5", "20", "20.5", "21.5"],
    },
    {
      id: 10,
      title: "Nike Air Force Rojos Infantil",
      price: 200,
      img: nikeForceRojosNino,
      description:
        "Estas zapatillas Nike destacan por su diseño elegante y contemporáneo, perfectas para amantes del estilo urbano. Con acabados de alta calidad y una comodidad inigualable, se adaptan perfectamente a cualquier ocasión. La colaboración con marcas icónicas añade un toque exclusivo y distintivo. Ideales para quienes buscan combinar moda y funcionalidad en su calzado diario.",
      tallas: ["15", "15.5", "16", "16.5", "17", "17.5"],
    },
    {
      id: 11,
      title: "Puma",
      price: 270,
      img: pumaMujer,
      description:
        "Sumérgete en el equilibrio perfecto entre estilo y confort con nuestras Zapatillas Deportivas Puma Clásicas en colores blanco y negro. Diseñadas para aquellos que aprecian tanto la moda como la funcionalidad, estas zapatillas ofrecen una estética atemporal que no pasará desapercibida.",
      tallas: ["23", "24", "24.5", "25", "25.5", "26"],
    },
    {
      id: 12,
      title: "Nike Force Azules",
      price: 270,
      img: nikeForceAzules,
      description:
        "Estas zapatillas Nike destacan por su diseño elegante y contemporáneo, perfectas para amantes del estilo urbano. Con acabados de alta calidad y una comodidad inigualable, se adaptan perfectamente a cualquier ocasión. La colaboración con marcas icónicas añade un toque exclusivo y distintivo. Ideales para quienes buscan combinar moda y funcionalidad en su calzado diario.",
      tallas: ["23", "24", "24.5", "25", "25.5", "26"],
    },
    {
      id: 13,
      title: "Nike Air Force Rojos",
      price: 270,
      img: nikeForceRojos,
      description:
        "Estas zapatillas Nike destacan por su diseño elegante y contemporáneo, perfectas para amantes del estilo urbano. Con acabados de alta calidad y una comodidad inigualable, se adaptan perfectamente a cualquier ocasión. La colaboración con marcas icónicas añade un toque exclusivo y distintivo. Ideales para quienes buscan combinar moda y funcionalidad en su calzado diario.",
      tallas: ["25", "26", "26.5", "26.5", "27", "27.5", "28"],
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
      {
        /**
         * <div className="banner">
      </div>
         */
      }
      <h1 className="text-center font-thin m-4 text-gray-500 text-xl">
        Zapatos y accesorios{" "}
      </h1>
      <div className="w-11/12 flex flex-wrap justify-between p-2 items-center m-auto">
        {cardFilter.length > 0 ? (
          cardFilter.map((card) => {
            return (
              <div
                key={`tennis-home-${card.id}`}
                className={`contenedor-card rounded-none scroll-content ${
                  card.id % 2 == 0 ? "mt-8" : "mt-0"}
                  ${card.id > 4 ? "fadeRight" : ""}
                  `}
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
