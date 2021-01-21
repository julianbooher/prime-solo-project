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
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Grid from '@material-ui/core/Grid';

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

  handleWinner = (team, goals, teamName) => {
    if (team === 'home'){
      if (this.props.fixture.home_team_goals > this.props.fixture.away_team_goals ){
        return <Grid container direction="row" alignItems="center">
        <Grid item>
          <b>{teamName} - {goals}</b>
        </Grid>
        <Grid item>
        <ArrowLeftIcon fontSize={'small'}/>
        </Grid>
      </Grid>
        
        
      } else {
        return <>{teamName} - {goals}</>
      }
    }
    if (team === 'away'){
      if (this.props.fixture.home_team_goals < this.props.fixture.away_team_goals ){
        return <Grid container direction="row" alignItems="center">
        <Grid item>
          <b>{teamName} - {goals}</b>
        </Grid>
        <Grid item>
        <ArrowLeftIcon fontSize={'small'}/>
        </Grid>
      </Grid>
      } else {
        return <>{teamName} - {goals}</>
      }
    }
  }

  render() {
    const { fixture, classes } = this.props;
    return (
      <>
      <TableRow key={fixture.id}>
        <TableCell>{moment(fixture.date).format('LL')}</TableCell>
        <TableCell className="teams-cell">
          {this.handleWinner('home', fixture.home_team_goals, fixture.home_team_name)}
          {this.handleWinner('away', fixture.away_team_goals, fixture.away_team_name)}
        </TableCell>
        {/* <TableCell> {fixture.away_team_goals} - {fixture.away_team_name}</TableCell> */}
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
