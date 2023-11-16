import { useContext } from 'react'
import { SearchResultContext } from '../state management/SearchResultContext'
import { StatistaList } from './StatistaList'

export const SearchList = ()=>{
    const {searchResult} = useContext(SearchResultContext)
   
    return (
        <StatistaList list={searchResult}/>
    )
}