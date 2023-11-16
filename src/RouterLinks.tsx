import {Routes,Route} from 'react-router-dom'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { FavoritesList } from './components/FavoritesList'
import { StatistaDetails } from './components/StatistaDetails'

export const RouterLinks = ()=>{
    return(
        <Routes>
            <Route element={<Header/>}>
                <Route path="/" element={<SearchBar/>}/>
                <Route path='/favorites' element={<FavoritesList/>}  />
                <Route path='/statistaData/:id' element={(<StatistaDetails/>)} />
            </Route>
        </Routes>
    )
}