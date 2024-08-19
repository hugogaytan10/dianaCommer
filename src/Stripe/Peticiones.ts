import { URL } from "../Const/Const";
export const crearOrden = async (cart: any, token: string, UsuarioId: string, total: number) => {
   
   const orden = {
        UsuarioId: UsuarioId,
        Total: total,
    };
   
    const details = cart.map((item: any) => {
        return {
            ProductoId: item.id,
            Cantidad: item.count,
            PrecioUnitario: item.price,
            TallaId: item.talla,
        };
    });
    
  const response = await fetch(`${URL}/orden/agregar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      Order: orden,
      OrderDetail: details,
    }),
  });
  return response.json();

};
