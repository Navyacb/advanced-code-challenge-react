import { createContext } from "react"

interface IStatistaData{
    identifier: number,
    title: string,
    link:string,
    subject:string,
    description:string,
    date:string,
    premium: number,
    image_url:string,
    teaser_image_urls:[],
    starColor:string
}

interface ISearchResultContextType {
    searchResult : IStatistaData[],
    searchDispatch : any
}

export const SearchResultContext = createContext<ISearchResultContextType>({
    searchResult : [],
    searchDispatch : ()=>{},
})