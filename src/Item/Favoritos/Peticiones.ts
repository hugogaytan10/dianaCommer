import { URL } from "../../Const/Const";
export const agregarFavorito = async (id: number, userId: number, token: string) => {
    const body = {
      ProductoId: id,
      UsuarioId: userId
    }
    const response = await fetch(`${URL}/listadeseos/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return true;
    }
  
  return false;
}
export const eliminarFavorito = async (id: number, user: any) => {
    const response = await fetch(`${URL}/listadeseos/eliminar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${user.token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      return true;
    }
  
  return false;
}