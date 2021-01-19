import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './TeamPage.css'
import FixtureTable from '../FixtureTable/FixtureTable'
import PlayerCard from '../PlayerCard/PlayerCard'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class TeamPage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_FIXTURES', payload: this.props.match.params.id})
    this.props.dispatch({type: 'FETCH_TEAM_PLAYERS', payload: this.props.match.params.id})
    this.props.dispatch({type: 'FETCH_TEAM_INFO', payload: this.props.match.params.id})
  }


  render() {
    const { players, info } = this.props.store

    return (
      <div>
        <h1>Team Page</h1>
        {JSON.stringify(info)}
        <Grid 
            container 
            spacing={0}
          >
            <Grid item xs={12} sm={6}>
            <div className="team-info">
              <h3>{info.team_name}</h3>
              <p>Founded: {info.founded}</p>
              <img alt={info.venue_name} src={`https://media.api-sports.io/football/venues/${info.venue_id}.png`}/>
            </div>

              <FixtureTable />
            </Grid>
            <Grid item container xs={12} sm={6}>
            {players.map((player) => {
                return(
                  <Grid key={player.id} item xs={12} sm={4}>
                    <PlayerCard player={player}/>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(TeamPage));
