import { useContext, useEffect, useState } from "react"
import { StatistaList } from "./StatistaList"
import { StatistaContextData } from "../state management/StatistaContextData"
import { IStatistaData } from '../state management/StatistaContextData';
import { Paper,Button,IconButton } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from './FavoritesList.module.css'

export const FavoritesList = ()=>{
    const navigate = useNavigate()
    const {favoritesData,statistaData} = useContext(StatistaContextData)
    const [favList,setFavList] = useState<IStatistaData[]>([])

    useEffect(()=>{
        if(statistaData){
            const result = statistaData.filter(data=>{
                console.log(favoritesData)
                return favoritesData.includes(data.identifier)
            })
            const fav = result.map(data=>{
                return {...data,favColor:'#0666e5'}
            })
            setFavList(fav)
        }
    },[favoritesData])

    const handleBack = ()=>{
        navigate(-1);
    }

    return(
        <Paper elevation={0} >
             <Button className={styles.link} onClick={handleBack}>
                <IconButton type="button" className={styles.icon} aria-label="back">
                    <ArrowBackIos/>
                </IconButton>
                Back
            </Button>
            <StatistaList list={favList}/>
        </Paper>
    )
}