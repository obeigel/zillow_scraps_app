import { REQUEST_RENTALS, REQUEST_FORSALE, GET_RENTALS, GET_FORSALE } from '../actions';

function reducer(state = false, action) {
    switch (action.type) {
        case REQUEST_RENTALS:
            return true;

        case GET_RENTALS:
            return false;

        case REQUEST_FORSALE:
            return true;

        case GET_FORSALE:
            return false;

        default:
            return state;
    }
}

export default reducer;