import { GET_FORSALE, GET_FORSALE_FILTER } from '../actions';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_FORSALE:
            return action.forsale;
        case GET_FORSALE_FILTER:
            return action.forsale;
        default:
            return state;
    }
}