import { set } from "@cloudinary/url-gen/actions/variable";
import React, { useEffect, useState } from "react";

const Filtrador = (props) => {
  const { cards, setCardFilter } = props;
  const [rangeOne, setRangeOne] = useState(0);
  const [rangeTwo, setRangeTwo] = useState(0);
  const Filtrar = (e) => {
    e.preventDefault();
    //create a function to filter the cards by tallas, but tallas is an array
    setCardFilter([]);
    const cardsFil = cards.filter((card) => {
      const tallas = card.ListaTallas;
      const tallasFiltered = tallas.filter((talla) => {
        return talla >= rangeOne && talla <= rangeTwo;
      });
      if (tallasFiltered.length > 0) {
        setCardFilter((prev) => [...prev, card]);
      }
      //close the modal
      document.getElementById("modal_filtrar").close();
    });
    
    console.log(cardsFil)
  };
  useEffect(() => {}, []);
  return (
    <dialog id="modal_filtrar" className="modal">
      <div className="modal-box w-11/12 max-w-xl bg-white">
        <form method="dialog w-full" onSubmit={(e) => {}}>
          <div className="w-full flex flex-wrap justify-around items-center mb-4 ">
            <input
              type="text"
              placeholder="23"
              className="input input-bordered w-full max-w-32 text-center bg-white border-2 border-gray-600 placeholder:text-gray-800 text-gray-700"
              onChange={(e) => {
                setRangeOne(e.target.value);
              }}
            />
            <p className="text-gray-700">A</p>
            <input
              type="text"
              placeholder="26"
              className="input input-bordered w-full max-w-32 text-center bg-white border-2 border-gray-600 placeholder:text-gray-800 text-gray-700"
              onChange={(e) => {
                setRangeTwo(e.target.value);
              }}
            />
          </div>

          <div className="flex w-full justify-around">
            <button
              className="btn-cancelar"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("modal_filtrar").close();
              }}
            >
              Cancelar
            </button>
            <button className="btn-siguiente" onClick={Filtrar}>
              Filtrar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Filtrador;
