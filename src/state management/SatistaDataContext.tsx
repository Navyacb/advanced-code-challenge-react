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
    teaser_image_urls:[]
}

interface IStatistaDataType{
    statistaData : IStatistaData[],
}

export const StatistaDataContext = createContext<IStatistaDataType>({
    statistaData : [],
})