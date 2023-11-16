import React, { useReducer } from 'react';
import './App.css';
import { RouterLinks } from './RouterLinks';
import { SearchResultContext } from './state management/SearchResultContext';
import { StatistaDataContext } from './state management/SatistaDataContext';
import axios from 'axios'
import { useQuery} from 'react-query'

const App=()=>{

  const searchReducer = (state:any,action:any)=>{
    return action.payload
  }

  const fetchStatistaData = async()=>{
    try{
      const response = await axios.get('/json-data/statistaData.json')
      const result = response.data.items.map((data:any)=>{
        return {...data,favColor:'inherit'}
      })
      return result
    }
    catch(error){
        console.log('error while fetching data from json file',error)
    }
  }

  const [searchResult,searchDispatch] = useReducer(searchReducer,[])
  
  const {data:statistaData} = useQuery({
    queryFn : ()=>fetchStatistaData(),
    queryKey : ["StatistaData"]
  })


  return (
    <StatistaDataContext.Provider value={{statistaData}}>
      <SearchResultContext.Provider value={{searchResult,searchDispatch}}>
          <RouterLinks />
      </SearchResultContext.Provider>
    </StatistaDataContext.Provider>
  )
}

export default App;
