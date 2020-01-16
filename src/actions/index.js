import { SEARCH_TEXT } from '../constants'
export const seachQuestionString = (payload) => {
    return {
        type: SEARCH_TEXT,
        payload: payload
    }
}