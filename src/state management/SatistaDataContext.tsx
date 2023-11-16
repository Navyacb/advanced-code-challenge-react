import { createContext } from "react"

interface IStatistaData{
    identifier: Number,
    title: String,
    link:String,
    subject:String,
    description:String,
    date:String,
    premium: Number,
    image_url:String,
    teaser_image_urls:[]
}

interface IStatistaDataType{
    statistaData : IStatistaData[],
}

export const StatistaDataContext = createContext<IStatistaDataType>({
    statistaData : [],
})