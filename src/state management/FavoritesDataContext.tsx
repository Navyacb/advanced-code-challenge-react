import { createContext } from "react";

interface IFavDataType {
    favoritesData : number[],
    favDispatch : any
}

export const FavoritesDataContext = createContext<IFavDataType>({
    favoritesData : [],
    favDispatch : ()=>{},
})