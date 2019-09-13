import * as ActionTypes from '../constants/actionTypes';

const words = (state = { items: {}, error: null, loading: false, success: '' }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DEFINITION_SUCCEEDED: {
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.wordResponse.word]: action.wordResponse.definition
                },
                error: null,
                loading: false,
                success: action.wordResponse.word
            };
        }
        case ActionTypes.FETCH_DEFINITION_FAILED: {
            return {
                ...state,
                error: `error: ${action.message}`,
                loading: false,
                success: ''
            };
        }
        case ActionTypes.FETCH_DEFINITION_REQUESTED: {
            return {
                ...state,
                error: null,
                loading: true
            };
        }
        default:
            return state;
    }
};

export default words;
