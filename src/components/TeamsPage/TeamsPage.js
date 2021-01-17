import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TeamCard from '../TeamCard/TeamCard'
import './TeamsPage.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class TeamsPage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_TEAMS'})
  }


  render() {
    return (
      <div className="teams-div">
        <h1>MLS Teams</h1>
        <Grid container spacing={0}>
          {this.props.store.teams.map((team) => {
                return(
                  <Grid key={team.id} item xs={12} sm={3}>
                    <TeamCard team={team}/>
                  </Grid>
                )
              })}

        </Grid>

      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(TeamsPage));
