import { connect } from 'react-redux';
import Home from '../components/Home';
import { getRentals, getForSale, getForSaleFilter, getForRentFilter } from '../actions';

function mapStateToProps(state) {
    return {
        rentals: state.rentals,
        forsale: state.forsale
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRentals: () => dispatch(getRentals()),
        getForSale: () => dispatch(getForSale()),
        getForSaleFilter: (postal_codes, black_list_tags) => dispatch(getForSaleFilter(postal_codes, black_list_tags)),
        getForRentFilter: (postal_codes, black_list_tags) => dispatch(getForRentFilter(postal_codes, black_list_tags)),
    };
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;