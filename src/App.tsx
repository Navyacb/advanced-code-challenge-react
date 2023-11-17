import React, { useReducer } from 'react';
import './App.css';
import { RouterLinks } from './RouterLinks';
import { SearchResultContext } from './state management/SearchResultContext';
import { StatistaDataContext } from './state management/SatistaDataContext';
import axios from 'axios'
import { useQuery} from 'react-query'
import { FavoritesDataContext } from './state management/FavoritesDataContext';

const App=()=>{

  const searchReducer = (state:any,action:any)=>{
      switch(action.type){
        case'ADD_SEARCH_LIST':
          return action.payload
        case 'UPDATE_SEARCH_LIST' :
          return action.payload
        case 'default' :
          return state
      }
  }

  const favReducer = (state:any,action:any)=>{
    switch(action.type){
      case 'ADD_FAV':
        return [...state,action.payload]
      case 'UPDATE_FAV':
        return state.filter((ele:any) => ele!==action.payload )
    }
  }

  const fetchStatistaData = async()=>{
    try{
      const response = await axios.get('/json-data/statistaData.json')
      return response.data.items
    }
    catch(error){
        console.log('error while fetching data from json file',error)
    }
  }

  const [searchResult,searchDispatch] = useReducer(searchReducer,[])
  const [favoritesData,favDispatch] = useReducer(favReducer,[])

  const {data:statistaData} = useQuery({
    queryFn : ()=>fetchStatistaData(),
    queryKey : ["StatistaData"]
  })


  return (
    <StatistaDataContext.Provider value={{statistaData}}>
      <SearchResultContext.Provider value={{searchResult,searchDispatch}}>
        <FavoritesDataContext.Provider value={{favoritesData,favDispatch}}>
          <RouterLinks />
        </FavoritesDataContext.Provider>
      </SearchResultContext.Provider>
    </StatistaDataContext.Provider>
  )
}

export default App;
