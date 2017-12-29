import axios from 'axios';

export const GET_RENTALS  = 'GET_RENTALS';
export const GET_RENTALS_FILTER  = 'GET_RENTALS';
export const REQUEST_RENTALS  = 'REQUEST_RENTALS';
export const GET_FORSALE  = 'GET_FORSALE';
export const GET_FORSALE_FILTER = 'GET_FORSALE_FILTER';
export const REQUEST_FORSALE  = 'REQUEST_FORSALE';

const rentals_url = 'http://localhost:8000/api/rentals';
const forsale_url = 'http://localhost:8000/api/forsale';

export function getRentals() {
    return dispatch => {
        dispatch({
            type: REQUEST_RENTALS
        });

        return axios.get(rentals_url)
            .then(response => {
                return response.data;
            })
            .then(rentals => {
                dispatch({
                    type: GET_RENTALS,
                    rentals
                })
            });
    };
}

export function getForSale() {
    console.log("getForSale");
    return dispatch => {
        dispatch({
            type: REQUEST_FORSALE
        });

        return axios.get(forsale_url)
            .then(response => {
                return response.data;
            })
            .then(forsale => {
                dispatch({
                    type: GET_FORSALE,
                    forsale
                })
            });
    };
}

function createMongoFilter(postal_codes, black_list_tags) {
    console.log("createMongoFilter postal_codes:", postal_codes, " black list: ", black_list_tags);
    if (!postal_codes && !black_list_tags) {
        return "";
    }

    let p = "p=";
    if (postal_codes.length === 0) {
        p = "";
    }
    else if (postal_codes.length === 1) {
        p += postal_codes[0];
    } else if (postal_codes.length > 1) {
        postal_codes.forEach(elem => {
            p += elem + '&';
        });
        p = p.substring(0, p.length -1);
    }

    let b = "b=";
    if (black_list_tags.length === 0) {
        b = "";
    }
    else if (black_list_tags.length === 1) {
        b += black_list_tags[0];
    } else if (black_list_tags.length > 1) {
        black_list_tags.forEach(elem => {
            b += elem + '&';
        });
        b = b.substring(0, b.length -1);
    }

    let filter = `${p};${b}`;
    if (p === "") {
        filter = `${b}`;
    } else if (b === "") {
        filter = `${p}`;
    }
    console.log("createMongoFilter p:", p, " b:", b, " filter:", filter);
    return filter;
}

export function getForRentFilter(postal_codes, black_list_tags) {
    const filter = createMongoFilter(postal_codes, black_list_tags);
    if (filter === "")
        return getRentals();

    return dispatch => {
        dispatch({
            type: REQUEST_RENTALS
        });
        return axios.get(`${rentals_url}/${filter}`)
            .then(response => {
                return response.data;
            })
            .then(rentals => {
                dispatch({
                    type: GET_RENTALS_FILTER,
                    rentals
                })
            });
    };
}

export function getForSaleFilter(postal_codes, black_list_tags) {
    const filter = createMongoFilter(postal_codes, black_list_tags);
    if (filter === "")
        return getForSale();

    return dispatch => {
        dispatch({
            type: REQUEST_FORSALE
        });

        return axios.get(`${forsale_url}/${filter}`)
            .then(response => {
                return response.data;
            })
            .then(forsale => {
                dispatch({
                    type: GET_FORSALE_FILTER,
                    forsale
                })
            });
    };
}
