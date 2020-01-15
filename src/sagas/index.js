import { put, takeLatest, all, delay } from 'redux-saga/effects';
import { SEARCH_TEXT, SEARCH_TEXT_SUCCESS, SEARCH_TEXT_ERROR } from '../constants'
import { searchQuestion } from '../apis';
function* fetchQuestions(action) {
    // console.log(str);
    const json = yield searchQuestion(action.payload);
    yield put({ type: SEARCH_TEXT_SUCCESS, results: json.items });
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