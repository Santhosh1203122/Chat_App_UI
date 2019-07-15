import { fork } from 'redux-saga/effects';
import commonSaga from './commonsaga';
import directMessageSaga from './directMessageSaga';

export default function* rootSaga() {
    yield [
        fork(commonSaga),
        fork(directMessageSaga),
    ];
}