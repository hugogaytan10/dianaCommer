import React, {useEffect, useState} from "react";
import { BtnImprimir } from "./BtnImprimir";
import { URL } from "../Const/Const";
export const Reportes = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const getProductos = async () => {
          try {
            const url = `${URL}/producto/conseguir`;
            const response = await fetch(url);
            const data = await response.json();
            setProductos(data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        getProductos();
      }, []);
    return (
        <div>
          <BtnImprimir productos={productos} />
        </div>
    );
}