import {Paper,Card,CardContent} from '@mui/material'
import styles from './ListEmpty.module.css'

export const ListEmpty = ()=>{
    return (
        <Paper elevation={0} className={styles.paperPadding}>
        <Card className={styles.cardColor}>
            <CardContent>
                <b>No Results</b>
            </CardContent>
        </Card>
        </Paper>
    )
}