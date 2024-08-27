import { URL } from "../../Const/Const";
export const getCategorias = async () => {
  try {
    const url = `${URL}/categoria/conseguir/subcategoria`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const eliminarCategoria = async (id: number, token: string) => {
  try {
    const url = `${URL}/categoria/eliminar/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        token: token
      },
    });
    const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return false;
  }
};

export const getSubcategorias = async () => {
  try {
    const url = `${URL}/subcategoria/conseguir`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};