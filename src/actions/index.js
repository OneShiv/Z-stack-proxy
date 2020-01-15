import { SEARCH_TEXT } from '../constants'
export const seachQuestionString = (str) => {
    return {
        type: SEARCH_TEXT,
        payload: str
    }
}