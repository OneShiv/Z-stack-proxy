import { put, takeLatest, all, delay } from 'redux-saga/effects';
import { SEARCH_TEXT, SEARCH_TEXT_SUCCESS, SEARCH_TEXT_ERROR } from '../constants'
import { searchQuestion } from '../apis';
function* fetchQuestions(action) {
    if (action.payload.results) {
        yield put({
            type: SEARCH_TEXT_SUCCESS, payload: {
                string: action.payload.string,
                results: action.payload.results
            }
        });
    } else {
        const json = yield searchQuestion(action.payload);
        const { string, unanswered, accepted, tag, score } = action.payload;
        let complexString = `${string}${tag}${score}${unanswered}${accepted}`;
        yield put({
            type: SEARCH_TEXT_SUCCESS, payload: {
                string: complexString,
                results: json.items
            }
        });
    }
}
function* actionWatcher(args) {
    delay(300);
    yield takeLatest(SEARCH_TEXT, fetchQuestions);
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}