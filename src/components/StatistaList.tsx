import {Card,CardContent,Typography,Paper,IconButton,Tooltip,Pagination} from '@mui/material'
import {Favorite}  from '@mui/icons-material'
import styles from './StatistaList.module.css'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../helper/formatDate';
import { handleFavorites } from '../helper/handleFavorites';
import { StatistaContextData } from '../state management/StatistaContextData';
import { IStatistaData } from '../state management/StatistaContextData';
import { ListEmpty } from './ListEmpty';

interface IStatistaList{
    list: IStatistaData[]
}

export const StatistaList = (props:IStatistaList)=>{
    const {list} = props
    const itemsPerPage = 10
    const {searchResult,searchDispatch,favDispatch} = useContext(StatistaContextData)
    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const handleFav = (data:IStatistaData)=>{
        handleFavorites(data,searchResult,searchDispatch,favDispatch)
    }

    return(
        <Paper elevation={0} className={`${styles.paper} ${styles.background}`}>
            <Typography className={`${styles.padding}`}><b>TOTAL RESULTS</b> : {list.length} results</Typography>
                { list.length>0 ? 
                    (<Paper elevation={0} className={`${styles.padding}`}>
                        <div>
                            {currentItems.map(data => {
                            return(
                                <Tooltip key={data.identifier}
                                title={
                                    <div className={styles.content}>
                                        <div><img src={data.teaser_image_urls[2].src} alt="Tooltip" /></div>
                                        <div className={`${styles.contentRight}`}>
                                            <Typography variant="h6" className={`${styles.title} ${styles.font}`}>
                                                {data.title}
                                            </Typography>
                                            <Typography variant="h6" className={`${styles.subject} ${styles.font}`}>
                                                {data.subject}
                                            </Typography>
                                        </div>
                                    </div>
                                } arrow
                                placement="top"
                                >
                                <Link to = {`/statistaData/${data.identifier}`} className={styles.cardLink} data-testid={data.identifier}>
                                    <Card className={`${styles.cardBox} ${styles.shadow}`}>
                                        <CardContent>
                                            <div className={`${styles.display}`}>
                                                <Typography className={`${styles.topDate} ${styles.font}`}>
                                                    Statistic | {formatDate(data.date)}
                                                </Typography>
                                                <IconButton
                                                    className={`${styles.favoriteIcon}`}
                                                    aria-label="favorite"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        handleFav(data);
                                                    }}
                                                >
                                                    <Favorite style={{ color: data.favColor }} />
                                                </IconButton>
                                            </div>
                                            <Typography variant="h6" className={`${styles.title} ${styles.font}`}>
                                                {data.title}
                                            </Typography>
                                            <Typography variant="h6" className={`${styles.subject} ${styles.font}`}>
                                                {data.subject}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                                </Tooltip>
                            )
                            })}
                        </div>
                        <div className={`${styles.pagination}`}>
                            <Pagination
                                count={Math.ceil(list.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </Paper>):
                    (
                        <ListEmpty/>
                    )
                }
        </Paper>
    )
}