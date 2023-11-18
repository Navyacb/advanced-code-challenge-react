import React, { useReducer , useEffect} from 'react';
import './App.css';
import { RouterLinks } from './RouterLinks';
import {StatistaContextData } from './state management/StatistaContextData';
import axios from 'axios'
import { useQuery} from 'react-query'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

const App=()=>{

  const searchReducer = (state:any,action:any)=>{
      switch(action.type){
        case'ADD_SEARCH_LIST':
          return action.payload
        case 'UPDATE_SEARCH_LIST':
          return action.payload
        case 'EMPTY_SEARCH_LIST':
         return [];
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
      case 'ADD_FAV_lOCAL':
        return action.payload
      case 'default':
        return state
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

  useEffect(() => {
      const storedFavoritesData = localStorage.getItem('favoritesData')
      const favorites = storedFavoritesData ? JSON.parse(storedFavoritesData) : []
      favDispatch({ type: 'ADD_FAV_lOCAL', payload: favorites })
    }, []);

  useEffect(()=>{
    localStorage.setItem('favoritesData', JSON.stringify(favoritesData))
  },[favoritesData])


  return (
    <StatistaContextData.Provider value={{statistaData,searchResult,searchDispatch,favoritesData,favDispatch}}>
          <RouterLinks />
    </StatistaContextData.Provider>
  )
}

export default App;
