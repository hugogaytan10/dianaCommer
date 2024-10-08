import React, { useEffect, useState, useContext } from "react";
import "./Categoria.css";
import image from "./images-outline.svg";
import lupa from "./search.svg";
import add from "./add.svg";
import trash from "./trash.svg";
import { ModalAgregarCategoria } from "./ModalAgregarCategoria";
import { ModalEditarCategoria } from "./ModalEditarCategoria"
import { URL } from '../Const/Const'
import { HeaderAdmin } from "./HeaderAdmin";
import { AppContext } from "../Context/AppContext";

export const Subcategoria = () => {
    const [loaded, setLoaded] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [idProducto, setIdProducto] = useState(0);
    const [nombre, setNombre] = useState("");
    const [pdfLoader, setPdfLoader] = useState(true);
    const context = useContext(AppContext);

    useEffect(() => {
        const getProductos = async () => {
            try {
                const url = `${URL}/categoria/conseguir`;
                const response = await fetch(url);
                const data = await response.json();
                setProductos(data);
                setProductosFiltrados(data);
                setPdfLoader(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProductos();
    }, []);

    const handlerDelete = async (e) => {
        e.preventDefault();
        const url = `${URL}/categoria/eliminar/${idProducto}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                mode: "cors",
                "Content-Type": "application/json",
                token: context.user.Token
            },
        });
        document.getElementById("my_eliminar").close();
    };

    return (
        <div>
            <HeaderAdmin productosFiltrados={productosFiltrados} productos={productos} setProductosFiltrados={setProductosFiltrados} />

            <div className="w-11/12 flex flex-wrap justify-between p-2 items-center mx-96">
                <h2 className="text-black text-md md:text-lg font-semibold flex justify-between ml-24 w-3/5">
                    heyyyyy
                </h2>
            </div>

            <div className={pdfLoader ? 'none' : `w-11/12 flex flex-wrap justify-between p-2 items-center m-auto`}>

                {productosFiltrados.map((producto) => (
                    <div
                        className={`contenedor-card border-b-2 w-7/12 h-20 rounded-md mx-auto ${producto.Id % 2 === 0 ? "mt-6" : "mt-6"}`}
                        key={`producto-${producto.Id}`}
                    >
                        <div className="card" id="a">
                            <div className="card-body p-1">
                                <div className="card-actions flex justify-between items-end w-full mt-2 ">
                                    <h2 className="text-black text-md md:text-lg font-semibold flex justify-between mt-1 w-3/5">
                                        {producto.Nombre}
                                    </h2>
                                    <div className="flex justify-between w-1/5">
                                        <img
                                            src={trash}
                                            alt="trash"
                                            className="h-6 w-6"
                                            onClick={() => {
                                                document.getElementById("my_eliminar").showModal();
                                                setNombre(producto.Nombre);
                                                setIdProducto(producto.Id);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ModalAgregarCategoria
                nombre={nombre}
                setNombre={setNombre}
            />

            <ModalEditarCategoria
                nombre={nombre}
                setNombre={setNombre}
            />

            <dialog id="my_eliminar" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg text-primary text-center">
                        Eliminar Categoria
                    </h3>
                    <p className="py-4 text-primary text-center">
                        Deseas eliminar {nombre} ?
                    </p>
                    <div className="modal-action block w-full">
                        <form
                            method="dialog"
                            onSubmit={(e) => {
                                handlerDelete(e);
                            }}
                        >
                            {/*<img src={preview} alt="" className="h-40 m-auto" />*/}
                            <div className="flex justify-center gap-4">
                                <button
                                    type="submit"
                                    className="w-1/3 border-2 p-2 border-red-500 rounded-lg text-red-500"
                                >
                                    eliminar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById("my_eliminar").close()}
                                    className="w-1/3 border-2 p-2 border-red-500 rounded-lg text-white bg-red-500"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
