import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

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


class Fixtures extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_FIXTURES'});
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { classes } = this.props;


    return (
      <div>
        <h1>Fixtures</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <TableCell>Fixture Date</TableCell>
            <TableCell>Home Team</TableCell>
            <TableCell>Away Team</TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.store.fixtures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(fixture=> (
              <TableRow key={fixture.id}>
                <TableCell>{fixture.date}</TableCell>
                <TableCell>{fixture.home_team_name}</TableCell>
                <TableCell>{fixture.away_team_name}</TableCell>
                <TableCell><button>Rate</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.props.store.fixtures.length}
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

export default connect(mapStoreToProps)(withStyles(styles)(Fixtures));
