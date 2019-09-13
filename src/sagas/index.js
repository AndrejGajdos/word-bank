import { all, fork } from 'redux-saga/effects';
import watchGetDefinition from './definition.sagas';

export default function* rootSaga() {
    yield all([
        fork(watchGetDefinition),
    ]);
}

