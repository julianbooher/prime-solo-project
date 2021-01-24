import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import FixtureTableRow from '../FixtureTableRow/FixtureTableRow'

// css
import './FixtureTable.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
// import { Block } from '@material-ui/icons';

// Material UI styles
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflow: 'auto',
    height: 100,
  },
  table: {
    minWidth: 300,
    maxWidth: '100%',
  },
});


class FixtureTable extends Component {

  state = {
    page: 0,
    rowsPerPage: 10,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { classes } = this.props;
    const { fixtures } = this.props.store;


    return (
      <div>
        {/* {JSON.stringify(fixtures)} */}
        <Table className={classes.table}>
          <TableBody>
            {fixtures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(fixture=> (
              <FixtureTableRow key={fixture.id} fixture={fixture}/>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={fixtures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(FixtureTable));
