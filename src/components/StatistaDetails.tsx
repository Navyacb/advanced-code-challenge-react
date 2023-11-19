import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {Paper,IconButton,Box,Typography,Button} from "@mui/material"
import styles from './StatistaDetails.module.css';
import {ArrowBackIos,Favorite} from '@mui/icons-material'
import { useQuery, useQueryClient} from 'react-query'
import { formatDate } from "../helper/formatDate";
import { ErrorMessage } from "./ErrorMessage";
import { handleFavorites } from "../helper/handleFavorites";
import { StatistaContextData } from "../state management/StatistaContextData";
import { useNavigate } from "react-router-dom";
import {IStatistaData} from '../state management/StatistaContextData'

export const StatistaDetails = ()=>{
    const navigate = useNavigate()
    const {statistaData,searchResult,searchDispatch,favDispatch,favoritesData} = useContext(StatistaContextData)
    const {id} = useParams()
    const [showFullDescription, setShowFullDescription] = useState(false);
    const queryClient = useQueryClient();

    const fetchStatisticsDetail = ()=>{
        //as we are not calling api to get data , 
            //manually computing data
        const statistics = statistaData.find(data=>{
            return data.identifier.toString() === id
        })
        if(statistics){
            if(favoritesData.includes(statistics.identifier)){
                return {...statistics,favColor:'#0666e5'}
            }else{
                return {...statistics,favColor:'inherit'}
            }
        }
    }

    const {data:statisticsDetail} = useQuery({
        queryFn : ()=>fetchStatisticsDetail(),
        queryKey : ["StatisticsDetail"],
        enabled: statistaData?.length>0
      })

    const toggleDescription = () => {
        setShowFullDescription((prev) => !prev)
    }

    const handleFav = (data:IStatistaData)=>{
        handleFavorites(data,searchResult,searchDispatch,favDispatch)
        const color = (data.favColor === 'inherit') ? ('#0666e5') : ('inherit')
        queryClient.setQueryData(['StatisticsDetail'], {...data,favColor : color});     
    }

    const handleBack = ()=>{
        navigate(-1);
    }

    return (
        <Paper elevation={0} className={styles.background}>
            <Button className={styles.link} onClick={handleBack}>
                <IconButton type="button" className={styles.icon} aria-label="back">
                    <ArrowBackIos/>
                </IconButton>
                Back
            </Button>
            {
                (!statisticsDetail) ?
                (
                    <ErrorMessage message="The statistics data details you are looking for is not in our database, please verify the data you selected" />
                ):
                (
                    <Box>
                        <div className={styles.display}>
                            <Typography variant="h4" className={styles.heading}>
                                {statisticsDetail.subject}
                            </Typography>
                            <IconButton
                                className={`${styles.favoriteIcon}`}
                                aria-label="favorite"
                                onClick={() => {handleFav(statisticsDetail);}}
                            >
                                <Favorite style={{ color: statisticsDetail.favColor }} />
                            </IconButton>
                        </div>
                        <img src={statisticsDetail.teaser_image_urls[0].src} alt="statistaImg" className={styles.imgShadow} />
                        <Paper className={styles.paperContent}>
                        <Typography variant="h6" className={styles.title}>
                            {statisticsDetail.title}
                        </Typography>
                        <Typography className={styles.dateCol}>
                            {formatDate(statisticsDetail.date)}
                        </Typography>
                        <Typography className={`${styles.description} ${styles.marginTop}`}>
                        {showFullDescription
                            ? statisticsDetail.description
                            : `${statisticsDetail.description.slice(0, 200)}....`}
                        {!showFullDescription && (
                            <div className={styles.marginButton}><Button variant="outlined" onClick={toggleDescription}>
                                Read more
                            </Button></div>
                        )}
                        {showFullDescription && (
                            <div className={styles.marginButton}><Button variant="outlined" onClick={toggleDescription}>
                                Hide
                            </Button></div>
                        )}
                        </Typography>
                        </Paper>
                    </Box>
                )
            }
        </Paper>
    )
}