import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card } from 'material-ui/Card';
import DataTables from 'material-ui-datatables';

class DataTable extends Component {
  constructor (props) {
    super(props);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      },
    });

    this.styles = {
      container: {
        textAlign: 'center',
        tableLayout: 'auto',
        whitespace: 'normal',
        wordWrap: 'break-word',
      },
      component: {
        margin: '60px 20px',
      },
    };

    this.columns = [
      {
        key: 'date',
        label: 'date',
        sortable: true,
        style: {
          width: '10%',
          wordwrap:'break-word'
        }
      }, {
        key: 'title',
        label: 'title',
        sortable: false,
        style: {
          width: '15%',
          wordwrap:'break-word'
        }
      }, {
        key: 'postal_code',
        label: 'postal',
        
        sortable: true,
        style: {
          width: '5%',
          wordwrap:'break-word'
        }
      }, {
        key: 'price',
        label: 'price',
        sortable: true,
        style: {
          width: '5%',
          wordwrap:'break-word'
        }
      }, {
        key: 'zratio',
        label: 'zratio',
        sortable: true,
        style: {
          width: '5%',
          wordwrap:'break-word'
        }
      },
      {
        key: 'info',
        label: 'info',
        style: {
          width: '15%',
          wordwrap:'break-word'
        }
      }, {
        key: 'url',
        label: 'url',
        style: {
          width: '10%',
          wordwrap:'break-word'
        }
      }, {
        key: 'address',
        label: 'address',
        sortable: false,
        style: {
          width: '35%',
          wordwrap:'break-word'
        }
      }
    ];
  
    this.state = {
      order: 'asc',
      orderBy: 'price',
      data: this.props.zillows
    };
    console.log("c-tor data: ", this.state.data);
  }

  handleRequestSort(property, event) {
    console.log('key:' + property + ' order: ' + event, "data:", this.state.data);
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    this.setState({ data, order, orderBy });
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps props.zillows", nextProps.zillows);
    this.setState({ data: nextProps.zillows});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div style={this.styles.container}>
          <div >
            <Card style={{margin: 2}}>
              <DataTables
                height={'auto'}
                width={'auto'}
                selectable={false}
                showRowHover={false}
                columns={this.columns}
                data={this.props.zillows}
                whitespace={'nowrap'}
                showCheckboxes={false}
                showHeaderToolbar={false}
                showFooterToolbar={false}
                TableRowColumnStyle={{wordWrap: 'break-word', whiteSpace: 'normal'}}
                onSortOrderChange={this.handleRequestSort}
                TableRowColumn wrap={false}
              />
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default DataTable;