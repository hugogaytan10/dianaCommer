import { URL } from "../../Const/Const";
export const agregarFavorito = async (id: number, user: any) => {

    const response = await fetch(`${URL}/favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user.token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      return true;
    }
  
  return false;
}