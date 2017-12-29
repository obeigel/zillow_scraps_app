import { GET_RENTALS, GET_RENTALS_FILTER } from '../actions';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_RENTALS:
            return action.rentals;
        case GET_RENTALS_FILTER:
            return action.rentals;
        default:
            return state;
    }
}