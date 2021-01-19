import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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

  handleClick = () => {
    this.props.history.push(`/fixture/${this.props.fixture.id}`)
  }

  render() {
    const { fixture, classes } = this.props;
    return (
      <>
      <TableRow key={fixture.id}>
        <TableCell>{moment(fixture.date).format('LL')}</TableCell>
        <TableCell>{fixture.home_team_name}</TableCell>
        <TableCell>{fixture.away_team_name}</TableCell>
        <TableCell>
          <Button 
          variant="contained" 
          className={classes.button}
          onClick={this.handleClick}>Discuss</Button>
        </TableCell>
      </TableRow>
      </>
            
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(withRouter(FixtureTableRow)));
