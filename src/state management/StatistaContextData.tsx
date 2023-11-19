import { createContext } from "react"

export interface IStatistaData{
    identifier: number,
    title: string,
    link:string,
    subject:string,
    description:string,
    date:string,
    premium: number,
    image_url:string,
    teaser_image_urls:{width:number, src: string}[],
    favColor?: string
}

interface IStatistaDataType{
    statistaData : IStatistaData[],
    searchResult : IStatistaData[],
    searchDispatch : React.Dispatch<{
        type: string;
        payload: any;
    }>,
    favoritesData : number[],
    favDispatch : React.Dispatch<{
        type: string;
        payload: any;
    }>,
}

export const StatistaContextData = createContext<IStatistaDataType>({
    statistaData : [],
    searchResult : [],
    searchDispatch : ()=>{},
    favoritesData : [],
    favDispatch : ()=>{},
})