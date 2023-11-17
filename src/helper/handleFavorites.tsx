export const handleFavorites = (data:any,searchResult:any,searchDispatch:any,favDispatch:any)=>{
    const result = searchResult.map((ele:any)=>{
        if(ele.identifier === data.identifier){
            const color = (ele.starColor === 'inherit') ? ('#0666e5') : ('inherit')
            return {...ele, ...{starColor : color}}
        }else{
            return {...ele}
        }
    })
    searchDispatch({type:'UPDATE_SEARCH_LIST',payload:result})
    
    switch(data.starColor){
        case 'inherit' :
            return favDispatch({type:'ADD_FAV',payload:data.identifier})
        case '#0666e5' :
            return favDispatch({type:'UPDATE_FAV',payload:data.identifier})
    }
}