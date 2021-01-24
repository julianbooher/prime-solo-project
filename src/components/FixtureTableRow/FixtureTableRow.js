import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';
import './FixtureTableRow.css';

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
    const {fixture} = this.props;

    if (goals == null){
      return <Grid item xs={12}>{teamName} - {`POSTPONED`}</Grid>;
    }
    if (team === 'home'){
      if (fixture.home_team_goals > fixture.away_team_goals ){
        return <Grid container item xs={12}>
                <Link to ={`/team/${fixture.away_team_id}`}>
                  <Grid item >
                      <img 
                        className="fixture-table-crest"
                        alt={fixture.home_team_name} 
                        src={`https://media.api-sports.io/football/teams/${fixture.home_team_id}.png`}/>
                        <b>{teamName} - {goals}</b>
                  </Grid>
                </Link>
                <Grid item>
                <ArrowLeftIcon fontSize={'small'}/>
                </Grid>
              </Grid>
      } else {
        return <Grid item xs={12}>
                <Link to ={`/team/${fixture.home_team_id}`}>
                  <img 
                    className="fixture-table-crest"
                    alt={fixture.home_team_name} 
                    src={`https://media.api-sports.io/football/teams/${fixture.home_team_id}.png`}/>
                  {teamName} - {goals}
                </Link>
              </Grid>
      }
    }
    if (team === 'away'){
      if (fixture.home_team_goals < fixture.away_team_goals ){
        return <Grid container item xs={12}>
                <Link to ={`/team/${fixture.away_team_id}`}>
                  <Grid item >
                      <img 
                        className="fixture-table-crest"
                        alt={fixture.away_team_name} 
                        src={`https://media.api-sports.io/football/teams/${fixture.away_team_id}.png`}/>
                        <b>{teamName} - {goals}</b>
                  </Grid>
                </Link>
                <Grid item>
                  <ArrowLeftIcon fontSize={'small'}/>
                </Grid>
              </Grid>
      } else {
        return <Grid item xs={12}>
                <Link to ={`/team/${fixture.away_team_id}`}>
                    <img 
                      className="fixture-table-crest"
                      alt={fixture.away_team_name} 
                      src={`https://media.api-sports.io/football/teams/${fixture.away_team_id}.png`}/>
                    {teamName} - {goals}
                  </Link>      
                </Grid>
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
          <Grid container item xs={12}>
          {this.handleWinner('home', fixture.home_team_goals, fixture.home_team_name)}
          {this.handleWinner('away', fixture.away_team_goals, fixture.away_team_name)}
          </Grid>
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
