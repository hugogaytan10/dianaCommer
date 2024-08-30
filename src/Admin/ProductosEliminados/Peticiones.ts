import { URL } from "../../Const/Const";
export const getProductosEliminados = async (token: string) => {
    try{
        const response = await fetch(`${URL}/producto/conseguir/eliminados`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        });
        const data = await response.json();
        return data;
    }catch(e){
        return [];
    }
}

export const reactivarProducto = async (token: string, id: number) => {
    try{
        const response = await fetch(`${URL}/producto/reactivar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        });
        const data = await response.json();
        return data;
    }catch(e){
        return null;
    }
}