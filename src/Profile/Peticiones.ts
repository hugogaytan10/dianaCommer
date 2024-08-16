import { URL } from "../Const/Const";
export const conseguirDireccionPorUsuario = async(id: string) =>{
    try{
        const url = `${URL}/direccion/conseguir/usuario/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        if(data === null)
            return [];
        return data;
    }catch(e){
        return [];
    }
}

export const guardarDireccion = async(direccion: any, token: string) => {
    try{
        const url = `${URL}/direccion/agregar`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`
            },
            body: JSON.stringify(direccion)
        });
        const data = await response.json();
        if(data)
            return true;
        return false;
    }catch(e){
        return false;
    }
} 

export const editarDireccion = async(direccion: any, token: string) => {
    try{
        const url = `${URL}/direccion/actualizar`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`
            },
            body: JSON.stringify(direccion)
        });
        const data = await response.json();
        if(data)
            return true;
        return false;
    }catch(e){
        return false;
    }
}

export const eliminarDireccion = async(id: string, token: string) => {
    try{
        const url = `${URL}/direccion/eliminar/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`
            }
        });
        const data = await response.json();
        if(data)
            return true;
        return false;
    }catch(e){
        return false;
    }
}