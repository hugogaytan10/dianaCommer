import React, { useState, useEffect, useContext } from "react";
import "./SubCategorias.css";
import { useNavigate, useParams } from "react-router-dom";
import { conseguirSubCategorias } from "./Peticiones";
import { CardSub } from "./card/CardSub.jsx";
import perrito from "../assets/Perrito.webp";
import { AppContext } from "../Context/AppContext";
import { Card } from "../models/Card";

export const SubCategoriaMain = () => {
  const navigate = useNavigate();
  const contexto = useContext(AppContext);
  const { id } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [cardFilter, setCardFilter] = useState<Card[]>(cards);
  useEffect(() => {
    conseguirSubCategorias(id || "1").then((res) => {
      setCards(res);
      setCardFilter(res);
    });
  }, [id]);
  return (
    <div>
      <div className="w-11/12 flex flex-wrap justify-between p-2 items-center m-auto">
        {cardFilter.length > 0 ? (
          cardFilter.map((card) => {
            return (
              <div
                key={`tennis-home-${card.Id}`}
                className={`contenedor-card rounded-none scroll-content ${
                  card.Id !== undefined && card.Id % 2 === 0 ? "mt-16" : "mt-0"
                }
                  {card.Id !== undefined && card.Id > 4 ? "fadeRight" : ""}
                  `}
                onClick={() => {
                  contexto.setCard(card);
                }}
              >
                <CardSub
                  title={card.Titulo}
                  price={card.PrecioVenta}
                  img={card.URLImagen}
                  description={card.Descripcion}
                  id={card.Id}
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
