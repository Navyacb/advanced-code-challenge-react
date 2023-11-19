import { useState , FormEvent, useContext,ChangeEvent, useEffect} from "react"
import {Grid,TextField,Button,InputAdornment} from '@mui/material'
import styles from './SearchBar.module.css'
import {Search} from '@mui/icons-material'
import { StatistaContextData } from "../state management/StatistaContextData"
import { StatistaList } from "./StatistaList"
import { ErrorMessage } from "./ErrorMessage"
import { useLocation, useNavigate } from "react-router-dom"

export const SearchBar = ()=>{
    const navigate = useNavigate()
    const { search } = useLocation()
    const [searchText,setSearchText] = useState('')
    const {statistaData,favoritesData,searchResult,searchDispatch} = useContext(StatistaContextData)
    const [isSearch,setIsSearch] = useState(false)

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setIsSearch(false)
        setSearchText(e.target.value)
        if(e.target.value === ''){
            searchDispatch({type:'EMPTY_SEARCH_LIST',payload:[]})
            navigate('/');
        }
    }
    
    const handleSearch = async(e:FormEvent)=>{
        setIsSearch(true)
        e.preventDefault()
        if(searchText.length>0){
            getSearchList(searchText)
            navigate(`/?search=${searchText}`)
        }else{
            searchDispatch({type:'EMPTY_SEARCH_LIST',payload:[]})
        }
    }

    const getSearchList = (value: string)=>{
        if(statistaData){
            const searchResult = statistaData.filter(data=>{
                return data.title.toLowerCase().includes(value.toLowerCase())
            })
            const favResult = searchResult.map(data=>{
                if(favoritesData.includes(data.identifier)){
                    return {...data, favColor : '#0666e5'}
                }else{
                    return {...data, favColor : 'inherit'}
                }
            })
            searchDispatch({type:'ADD_SEARCH_LIST',payload:favResult})
        }
    }

     useEffect(()=>{
        setSearchText(search.includes('search=')?  search.split('?search=')[1]:'')
        setIsSearch(search.includes('search='))
        search.includes('search=') && getSearchList(search.split('?search=')[1])
    },[statistaData,search])

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
                    <StatistaList list={searchResult}/> 
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