import { useState , FormEvent, useContext} from "react"
import {Grid,TextField,Button,InputAdornment,Typography} from '@mui/material'
import styles from './SearchBar.module.css'
import {Search} from '@mui/icons-material'
import { StatistaDataContext } from "../state management/SatistaDataContext"
import { SearchResultContext } from "../state management/SearchResultContext"
import { SearchList } from "./SearchList"
import { ListEmpty } from "./ListEmpty"

export const SearchBar = ()=>{
    const [searchText,setSearchText] = useState('')
    const {statistaData} = useContext(StatistaDataContext)
    const {searchResult,searchDispatch} = useContext(SearchResultContext)
    const [isSearch,setIsSearch] = useState(false)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setIsSearch(false)
        setSearchText(e.target.value)
    }
    
    const handleSearch = async(e:FormEvent)=>{
        setIsSearch(true)
        e.preventDefault()
        if(searchText.length>1){
            const result = statistaData.filter(data=>{
                return data.title.toLowerCase().includes(searchText.toLowerCase())
            })
            console.log(result)
            searchDispatch({type:'ADD_SEARCHDATA',payload:result})
        }
    }

    return(
        <div>
            <div>
                <form onSubmit={handleSearch} className={styles.boxMargin}>
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
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Statista Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {
                (isSearch && searchText.length>0) &&
                (
                    (searchResult.length>0)?
                    <SearchList/> :
                    <ListEmpty/>
                )
            }
            {
                (isSearch && searchText.length ===0) &&
                (
                    <Typography className={`${styles.error} ${styles.margin}`}>
                        Search query can't be empty , please type search query to find the results !
                    </Typography>
                )
            } 
        </div>
    )
}