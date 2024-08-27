import { URL } from "../Const/Const";
export const getCarruselBanner = async () => {
    try {
        const response = await fetch(`${URL}/carruselbanner/conseguir`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        return [];
    }
}
