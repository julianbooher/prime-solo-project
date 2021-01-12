import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// Material UI styles
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflow: 'auto',
    height: 100,
  },
  table: {
    minWidth: 300,
    maxWidth: '100%',
  },
});


class FixtureTableRow extends Component {

  render() {
    const { classes, fixture } = this.props;
    return (
      <>
      <TableRow key={fixture.id}>
        <TableCell>{fixture.date}</TableCell>
        <TableCell>{fixture.home_team_name}</TableCell>
        <TableCell>{fixture.away_team_name}</TableCell>
        <TableCell><button>Rate</button></TableCell>
      </TableRow>
      </>
            
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(FixtureTableRow));
