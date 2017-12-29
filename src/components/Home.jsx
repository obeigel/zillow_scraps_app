import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import DataTable from './DataTable';
import {Tabs, Tab} from 'material-ui/Tabs';
import ChipInput from 'material-ui-chip-input';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function zratioc(price, zestimate) {
    console.log("price:", price, " zestimate:", zestimate);
    if (zestimate === null) {
      return null;
    } 
    else {
      return parseFloat(price/zestimate).toFixed(2)
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            headline: {
              fontSize: 24,
              paddingTop: 16,
              marginBottom: 12,
              fontWeight: 400,
              margin: 20
            },
            bar: {
                margin: 30,
                padding: 30
            }
        };
        this.state = {
            value: 'a',
            postal_codes: [],
            black_list_tags: []
        };

        this.handleAddPostalCode = this.handleAddPostalCode.bind(this);
        this.handleDeletePostalCode = this.handleDeletePostalCode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.convert_zillow_sales_data = this.convert_zillow_sales_data.bind(this);
        this.convert_zillow_rentals_data = this.convert_zillow_rentals_data.bind(this);
    }

    handleChange (value) {
        console.log("handleChange value:", value);
        this.setState({
          value: value,
        });
        console.log("handleChange value:", value);
    }

    componentWillMount() {
        if(!this.props.rentals || !this.props.rentals.length) {
            this.props.getRentals();
            console.log("Rentals are ready!")
        }
        if(!this.props.forsale || !this.props.forsale.length) {
            this.props.getForSale();
            console.log("For Sale are ready!")
        }
    }

    handleAddPostalCode(key) {
        let postal_codes = [...this.state.postal_codes, key];
        this.setState({postal_codes});
        console.log('handleAddPostalCode:', postal_codes);
        if (this.state.value === 'b') {
            this.props.getForSaleFilter(postal_codes, this.state.black_list_tags);
        } else if (this.state.value === 'a') {
            this.props.getForRentFilter(postal_codes, this.state.black_list_tags);
        }
    }
    
    handleDeletePostalCode(key, index) {
        let postal_codes = this.state.postal_codes
        postal_codes.splice(index, 1);
        this.setState({postal_codes});
        console.log('handleDeletePostalCode:', this.state.postal_codes);
        if (this.state.value === 'b') {
            this.props.getForSaleFilter(postal_codes, this.state.black_list_tags);
        } else if (this.state.value === 'a') {
            this.props.getForRentFilter(postal_codes, this.state.black_list_tags);
        }
    }

    handleAddBlackListTag(key) {
        let black_list_tags = [...this.state.black_list_tags, key];
        this.setState({black_list_tags});
        console.log('handleAddBlackListTag:', black_list_tags);
        if (this.state.value === 'b') {
            this.props.getForSaleFilter(this.state.postal_codes, black_list_tags);
        } else if (this.state.value === 'a') {
            this.props.getForRentFilter(this.state.postal_codes, black_list_tags);
        }
    }
    
    handleDeleteBlackListTag(key, index) {
        let black_list_tags = this.state.black_list_tags
        black_list_tags.splice(index, 1);
        this.setState({black_list_tags});
        console.log('handleDeleteBlackListTag:', this.state.black_list_tags);
        if (this.state.value === 'b') {
            this.props.getForSaleFilter(this.state.postal_codes, black_list_tags);
        } else if (this.state.value === 'a') {
            this.props.getForRentFilter(this.state.postal_codes, black_list_tags);
        }
    }
      
    convert_zillow_sales_data() {
        let zillow_data = this.props.forsale.map((zillow, i) => {
            return {key: i, address: zillow.address, title: zillow.title,
              postal_code: zillow.postal_code, price: zillow.price, info: zillow.info, 
              zestimate: zillow.zestimate, zratio: zratioc(zillow.price, zillow.zestimate),
              url: <RaisedButton
                href={zillow.url}
                target="_blank"
                label="Zillow Link"
                secondary={true}
              />, date: zillow.date.substring(0, 10)} ;
          });
        return zillow_data;
    }

    convert_zillow_rentals_data() {
        let zillow_data = this.props.rentals.map((zillow, i) => {
            return {key: i, address: zillow.address, title: zillow.title,
              postal_code: zillow.postal_code, price: zillow.price, info: zillow.info, 
              url: <RaisedButton
                href={zillow.url}
                target="_blank"
                label="Zillow Link"
                secondary={true}
              />, date: zillow.date.substring(0, 10)} ;
          });
        return zillow_data;
    }

    render() {
        console.log("Home Render props:", this.props);
        return (
            <MuiThemeProvider>
            <div style={this.styles.bar}>
            <p>
            <strong>07024 </strong>Fort Lee | <strong>07020 </strong>Edgewater | <strong>07010 </strong>Cliffside Park | <strong>07650 </strong>Palisades Park | <strong>07631 </strong>Englewood | <strong>07047 </strong>North Bergen | <strong>07093 </strong>West New York | <strong>07605 </strong>Leonia | <strong>07661</strong>River Edge | <strong>07621 </strong>Bergenfield | <strong>07070 </strong>Rutherford | <strong>07657 </strong>Ridgefield
            </p>
            <ChipInput value={this.state.postal_codes} floatingLabelText="POSTAL CODES" fullWidth = "true"
                onRequestAdd={(chip) => this.handleAddPostalCode(chip)}
                onRequestDelete={(chip, index) => this.handleDeletePostalCode(chip, index)} />
            <br />
            <ChipInput value={this.state.black_list_tags} floatingLabelText="BLACK LIST" fullWidth = "true"
                onRequestAdd={(chip) => this.handleAddBlackListTag(chip)}
                onRequestDelete={(chip, index) => this.handleDeleteBlackListTag(chip, index)} />
            <br />
            <Tabs
                value={this.state.value}
                onChange = {(value) => this.handleChange(value)}
                style={this.styles.bar}
            >
                <Tab label="Rent" value="a" >
                <div>
                    {this.props.rentals && this.props.rentals.length ? 
                        <div>
                            <DataTable zillows = {this.convert_zillow_rentals_data(this.props.rentals)}/>
                        </div>
                        : <div className="loading">Loading...</div>
                    }
                </div>
                </Tab>
                <Tab label="Buy" value="b">
                <div>
                    {this.props.forsale && this.props.forsale.length ? 
                        <div>
                            <DataTable zillows = {this.convert_zillow_sales_data(this.props.forsale)}/>
                        </div>
                        : <div className="loading">Loading...</div>
                    }
                </div>
                </Tab>
            </Tabs>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Home;