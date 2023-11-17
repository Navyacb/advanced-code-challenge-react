import { useState , FormEvent, useContext,ChangeEvent} from "react"
import {Grid,TextField,Button,InputAdornment} from '@mui/material'
import styles from './SearchBar.module.css'
import {Search} from '@mui/icons-material'
import { StatistaDataContext } from "../state management/SatistaDataContext"
import { SearchResultContext } from "../state management/SearchResultContext"
import { StatistaList } from "./StatistaList"
import { ListEmpty } from "./ListEmpty"
import { FavoritesDataContext } from "../state management/FavoritesDataContext"
import { ErrorMessage } from "./ErrorMessage"

export const SearchBar = ()=>{
    const [searchText,setSearchText] = useState('')
    const {favoritesData} = useContext(FavoritesDataContext)
    const {statistaData} = useContext(StatistaDataContext)
    const {searchResult,searchDispatch} = useContext(SearchResultContext)
    const [isSearch,setIsSearch] = useState(false)

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setIsSearch(false)
        setSearchText(e.target.value)
    }
    
    const handleSearch = async(e:FormEvent)=>{
        setIsSearch(true)
        e.preventDefault()
        if(searchText.length>0){
            const searchResult = statistaData.filter(data=>{
                return data.title.toLowerCase().includes(searchText.toLowerCase())
            })
            const favResult = searchResult.map(data=>{
                if(favoritesData.includes(data.identifier)){
                    return {...data, starColor : '#0666e5'}
                }else{
                    return {...data, starColor : 'inherit'}
                }
            })
            searchDispatch({type:'ADD_SEARCH_LIST',payload:favResult})
        }
    }

    return(
        <div>
            <div className={styles.position}>
                <form onSubmit={handleSearch}>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                            fullWidth
                            placeholder="Find Statistics"
                            variant="outlined"
                            value={searchText}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                                ),
                            }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth className={styles.buttonHeight}>
                                Statista Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {
                ((isSearch || searchResult.length > 0) && searchText.length > 0) &&
                (
                    (searchResult.length>0)?
                    <StatistaList list={searchResult}/> :
                    <ListEmpty/>
                )
            }
            {
                (isSearch && searchText.length ===0) &&
                (
                   <ErrorMessage message= "Search query can't be empty , please type search query to find the results !" />
                )
            } 
        </div>
    )
}