import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';
import './TeamCard.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper:{
    margin: 10,
    paddingBottom: '.5em',
    paddingTop: 1,
  }
});



class TeamCard extends Component {
  
  handleClick = () => {
    this.props.history.push(`/team/${this.props.team.id}`)
    console.log(this.props.team.id)
  }


  render() {

    const { team, classes} = this.props;

    return (
      <div className="team-card">
        <Paper onClick={this.handleClick} pt={3} pb={3} className={classes.paper}>
            <h4>{team.name}</h4>
            <img alt={team.name} src={`https://media.api-sports.io/football/teams/${team.id}.png`}/>
          <p>{team.city}</p>
        </Paper>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(withRouter(TeamCard)));