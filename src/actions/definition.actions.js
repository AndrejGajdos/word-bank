import * as ActionTypes from '../constants/actionTypes';

export const getDefinition = word => ({
    type: ActionTypes.FETCH_DEFINITION_REQUESTED,
    word
});
