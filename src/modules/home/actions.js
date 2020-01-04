import { createAction, handleActions, combineActions } from 'redux-actions';

export const SAY_SMTH = 'SAY_SMTH';
export const SAY_SMTH_S = 'SAY_SMTH_S';

export const saySmthAction = createAction(SAY_SMTH);
export const saySmthSuccessAction = createAction(SAY_SMTH_S);