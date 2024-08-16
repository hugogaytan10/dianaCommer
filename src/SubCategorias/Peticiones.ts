import { URL } from "../Const/Const";
export const conseguirSubCategorias = async (id: string) => {
    try {
        const url = `${URL}/producto/conseguir/subcategoria/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data === null)
            return [];
        return data;
    }
    catch (e) {
        return [];
    }
}