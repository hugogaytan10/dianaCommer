import { URL } from "../../Const/Const";
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

export const eliminarSubcategoria = async (id: number, token: string) => {
  try {
    const url = `${URL}/subcategoria/eliminar/${id}`;
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
