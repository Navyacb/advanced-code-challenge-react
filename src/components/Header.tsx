import {AppBar, Toolbar , Button} from '@mui/material';
import {Favorite}  from '@mui/icons-material'
import styles from './Header.module.css'
import Logo from '../images/statista-header-logo.png'
import {Link,Outlet} from 'react-router-dom'

export const Header = ()=>{
    return (
        <>
        <AppBar position="static" className={`${styles.header} ${styles.appBar}`}>
            <Toolbar className={`${styles.toolBar}`}>
            <Link to='/'><img src= {Logo} className={`${styles.logo}`} alt='Logo'/></Link>
                <Button color="inherit">
                    <Favorite sx={{ mr: 1 }} />
                    Favorites List
                </Button>
            </Toolbar>
        </AppBar>
        <Outlet/>
        </>
    )
}