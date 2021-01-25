import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './TeamPage.css';
import FixtureTable from '../FixtureTable/FixtureTable';
import PlayerCard from '../PlayerCard/PlayerCard';
import PlayerStats from '../PlayerStats/PlayerStats';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class TeamPage extends Component {

  state = {
    open: false,
  }

  componentDidMount = () => {
    // Get info for the individual team when the component mounts.
    this.props.dispatch({type: 'FETCH_FIXTURES', payload: this.props.match.params.id})
    this.props.dispatch({type: 'FETCH_TEAM_PLAYERS', payload: this.props.match.params.id})
    this.props.dispatch({type: 'FETCH_TEAM_INFO', payload: this.props.match.params.id})
  }

  componentDidUpdate = (prevProps) => {
    // if clause prevents infinite loop, allows the user to click on a different team name on the same url path to go to a different team page.
    if (prevProps.location.pathname !== this.props.location.pathname){
      this.props.dispatch({type: 'FETCH_FIXTURES', payload: this.props.match.params.id})
      this.props.dispatch({type: 'FETCH_TEAM_PLAYERS', payload: this.props.match.params.id})
      this.props.dispatch({type: 'FETCH_TEAM_INFO', payload: this.props.match.params.id})
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch({type: 'UNSET_TEAM_PAGE' })
  }

  // handles the modal opening for player statistics.
  handleClick = (id) => {
    console.log('inside handleClick', id);
    this.setState({
      open: true
    })
    this.props.dispatch({type: 'FETCH_PLAYER_STATISTICS', payload: id});
  }
  // closing the modal
  handleClose = () => {
    this.setState({open: false})
    this.props.dispatch({type: 'UNSET_STATISTICS'})
  }


  render() {

    const { players, info } = this.props.store;

    return (
      <div>
        <Grid container spacing={0} className="team-info">
          <Grid item xs={12} sm={6}>
            <h1>{info.team_name}</h1>
            <img className="team-info-crest" alt={info.team_name} src={`https://media.api-sports.io/football/teams/${info.team_id}.png`}/>
            <p>Founded: {info.founded}</p>
          </Grid>
          {/* {JSON.stringify(info)} */}
          <Grid item xs={12} sm={6}>
            <h2>Venue</h2>
            <p>{info.venue_name}</p>
            <img alt={info.venue_name} src={`https://media.api-sports.io/football/venues/${info.venue_id}.png`}/>
          </Grid>
        </Grid>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <PlayerStats />
        </Modal>
        <Grid 
            container 
            spacing={0}
          >
            <Grid item xs={12} sm={6}>
              <h3>Fixtures</h3>
              <div className="section-title-border"></div>
              <br/>
              <FixtureTable />
            </Grid>
            <Grid item container xs={12} sm={6}>
              <Grid item xs={12}>
                <h3>Players</h3>
                <div className="section-title-border"></div>
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
