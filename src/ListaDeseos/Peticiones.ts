import { URL } from "../Const/Const";
export const getListaDeseos = async (userId: number, token: string) => {    
    const response = await fetch(`${URL}/listadeseos/conseguir/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });
    if (response.ok) {
        return response.json();
    }
    return [];
}

export const deleteListaDeseos = async (userId: number, token: string, productId: number) => {
    const response = await fetch(`${URL}/listadeseos/eliminar/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });
    return response.ok;
}