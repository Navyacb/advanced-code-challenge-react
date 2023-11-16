import {Card,CardContent,Typography,Paper,IconButton,Tooltip,Pagination} from '@mui/material'
import {Favorite}  from '@mui/icons-material'
import styles from './StatistaList.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export const StatistaList = (props:any)=>{
    const {list} = props
    const itemsPerPage = 10

    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem)

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
        return formattedDate
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }


    return(
        <Paper elevation={0} className={`${styles.paper} ${styles.background}`}>
            <Typography className={`${styles.padding}`}><b>TOTAL RESULTS</b> : {list.length} results</Typography>
            <Paper elevation={0} className={`${styles.padding}`}>
            {
                currentItems.map((data:any) => {
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
                        <Link to = {`/statistaData/${data.identifier}`} className={styles.cardLink}>
                        <Card className={`${styles.cardBox} ${styles.shadow}`}>
                            <CardContent>
                                <div className={`${styles.display}`}>
                                    <Typography className={`${styles.topDate} ${styles.font}`}>
                                        Statistic | {formatDate(data.date)}
                                    </Typography>
                                    <IconButton className={`${styles.favoriteIcon}`} aria-label="favorite">
                                        <Favorite style={{ color: data.favColor }}  />
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
                })
            }
            </Paper>
            <div className={`${styles.pagination}`}>
                <Pagination
                    count={Math.ceil(list.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </Paper>
    )
}