import { put, takeLatest, select } from 'redux-saga/effects';
import { API_ADDRESS } from '../constants/config';
import * as ActionTypes from '../constants/actionTypes';

function* fetchDefinition(action) {
  const { word } = action;
  try {
    const state = yield select();
    if (word in state.words.items) {
      yield put({ type: ActionTypes.FETCH_DEFINITION_FAILED, message: `word ${word} was already added` });
    } else {
      const wordResponse = yield fetch(`${API_ADDRESS}?word=${word}`).then(response => response.json());
      if (wordResponse.error != null) {
        yield put({ type: ActionTypes.FETCH_DEFINITION_FAILED, message: wordResponse.error });
      } else {
        yield put({ type: ActionTypes.FETCH_DEFINITION_SUCCEEDED, wordResponse });
      }
    }
  } catch (e) {
    yield put({ type: ActionTypes.FETCH_DEFINITION_FAILED, message: e.message });
  }
}

export default function* watchGetDefinition() {
  yield takeLatest(ActionTypes.FETCH_DEFINITION_REQUESTED, fetchDefinition);
}
