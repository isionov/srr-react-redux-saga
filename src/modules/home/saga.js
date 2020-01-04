import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SAY_SMTH } from './actions';
import { saySmthAction, saySmthSuccessAction } from './actions';

function* smthSaid(action) {
    console.log('in saga', action)
    yield put(saySmthSuccessAction("From Saga" + action.payload));
}

export function* homeSaga() {
    yield takeEvery(SAY_SMTH, smthSaid);
}