import { URL } from "../Const/Const";
export const conseguirCategorias = async () => {
    try {
        const url = `${URL}/categoria/conseguir/subcategoria`;
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