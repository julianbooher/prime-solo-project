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

  componentWillUnmount = () => {
    this.props.dispatch({type: 'UNSET_TEAM_PAGE' })
  }

  handleClick = (id) => {
    console.log('inside handleClick', id);
    this.props.dispatch({type: 'FETCH_PLAYER_STATISTICS', payload: id});
  }


  render() {
    const { players, info, statistics } = this.props.store

    return (
      <div>
            {JSON.stringify(statistics)}
        <div className="team-info">
          <h3>{info.team_name}</h3>
          <p>Founded: {info.founded}</p>
          <p>{info.venue_name}</p>
          <img alt={info.venue_name} src={`https://media.api-sports.io/football/venues/${info.venue_id}.png`}/>
        </div>
        <Grid 
            container 
            spacing={0}
          >
            <Grid item xs={12} sm={6}>
              <h1>Fixtures</h1>
              <br/>
              <FixtureTable />
            </Grid>
            <Grid item container xs={12} sm={6}>
              <Grid item xs={12}>
                <h1>Players</h1>
              </Grid>
              <br/>
              <Grid className="team-player-cards" item container xs={12}>
                {players.map((player) => {
                    return(
                      <Grid key={player.id} item xs={12} sm={4}>
                        <PlayerCard handleClick={event => this.handleClick(player.id)} player={player}/>
                      </Grid>
                    )
                })}
              </Grid>
            </Grid>
          </Grid>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(TeamPage));
