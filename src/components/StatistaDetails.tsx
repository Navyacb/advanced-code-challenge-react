import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchResultContext } from "../state management/SearchResultContext";
import {Paper,IconButton,Box,Typography} from "@mui/material"
import styles from './StatistaDetails.module.css';
import {ArrowBackIos} from '@mui/icons-material'

export const StatistaDetails = ()=>{
    const {searchResult} = useContext(SearchResultContext)
    const {id} = useParams()

    const statistics = searchResult.find((data:any)=>{
        return data.identifier==id
    })

    return (
        <Paper elevation={0} className={styles.background}>
            <Link to='/' className={styles.link}>
                <IconButton type="button" className={styles.icon} aria-label="back">
                    <ArrowBackIos/>
                </IconButton>
                Back
            </Link>
            <Box>
                <Typography variant="h2">
                    {/* {statistics.subject} */}
                </Typography>
            </Box>
        </Paper>
    )
}