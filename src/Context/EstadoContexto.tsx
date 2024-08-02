import { Dispatch } from "react";
import { Card } from "../models/Card";
import { User } from "../models/User";

export type AppContextState = {
    card: Card;
    setCard: Dispatch<React.SetStateAction<Card>>;
    cart: number;
    setCart: Dispatch<React.SetStateAction<number>>;
    user: User;
    setUser: Dispatch<React.SetStateAction<User>>;
}