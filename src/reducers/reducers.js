import { SEARCH_TEXT_SUCCESS, SEARCH_TEXT, SEARCH_TEXT_ERROR } from '../constants'
const initialState = {
    searchResults: [],
    length: 0,
    error: {
        val: false,
        message: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TEXT_SUCCESS:
            return {
                ...state,
                searchResults: action.results,
                length: action.results.length
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