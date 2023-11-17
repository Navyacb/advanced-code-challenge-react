import { useContext } from "react"
import { FavoritesDataContext } from "../state management/FavoritesDataContext"
import { SearchResultContext } from "../state management/SearchResultContext"
import { StatistaList } from "./StatistaList"

export const FavoritesList = ()=>{
    const {favoritesData} = useContext(FavoritesDataContext)
    const {searchResult} = useContext(SearchResultContext)

    const favList = searchResult.filter(data=>{
        return favoritesData.includes(data.identifier)
    })

    return(
        <StatistaList list={favList}/>
    )
}