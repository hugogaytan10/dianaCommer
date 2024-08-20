import { URL } from "../../Const/Const";

export const getOrdenes = async (token: string) => {
  const response = await fetch(`${URL}/orden`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         token: `${token}`
        }
    }
  );
  return await response.json();
}

export const getOrden = async (token: string, id: string) => {
  const response = await fetch(`${URL}/producto/conseguir/orden/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         token: `${token}`
        }
    }
  );
  return await response.json();
}

export const marcarEnviado = async (token: string, id: string) => {
  const response = await fetch(`${URL}/orden/estado/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         token: `${token}`
        },
        body: JSON.stringify({Estado: "EN CAMINO"})
    }
  );
  return await response.json();
}
export const cancelarOrden = async (token: string, id: string) => {
  const response = await fetch(`${URL}/orden/estado/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         token: `${token}`
        },
        body: JSON.stringify({Estado: "CANCELADO"})
    }
  );
  return await response.json();
}