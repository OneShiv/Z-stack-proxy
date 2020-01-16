import { SEARCH_TEXT_SUCCESS, SEARCH_TEXT, SEARCH_TEXT_ERROR } from '../constants'
const initialState = {
    searchResults: [],
    length: 0,
    error: {
        val: false,
        message: ''
    },
    cachedSearchResults:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TEXT_SUCCESS:
                debugger;
            let newCacheResult = state.cachedSearchResults;
            if(state.cachedSearchResults.length ===5) {
                newCacheResult = state.cachedSearchResults.splice(4,1,{
                    string: action.payload.string,
                    results: action.payload.results
                });
            }else{
                let searchStringArr = state.cachedSearchResults.map(cac => cac.string);
                if(searchStringArr.find( str => str ===action.payload.string)){
                    return state;
                }
                newCacheResult = newCacheResult.concat({
                    string: action.payload.string,
                    results: action.payload.results
                })
            }
            return {
                ...state,
                searchResults: action.payload.results,
                length: action.payload.results.length,
                cachedSearchResults: newCacheResult
            }
        case SEARCH_TEXT_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer;