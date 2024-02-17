import { Dispatch } from "react";
import { Card } from "../models/Card";

export type AppContextState = {
    card: Card;
    setCard: Dispatch<React.SetStateAction<Card>>;
    cart: number;
    setCart: Dispatch<React.SetStateAction<number>>;
}