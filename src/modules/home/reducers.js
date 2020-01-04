import {
    SAY_SMTH,
    SAY_SMTH_S,
} from './actions';
import { handleActions } from 'redux-actions';

const initialState = {};

export const home = handleActions(
    {
        [SAY_SMTH]: (state, action) => ({
            ...state, 
            phrase: action.payload,
        }),
        [SAY_SMTH_S]: (state, action) => ({
            ...state, 
            phrase: action.payload,
        })
    }, 
    initialState
)
