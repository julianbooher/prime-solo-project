import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './PlayerCard.css'

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
    minHeight: 245,
    paddingLeft: '.5em',
    paddingRight: '.5em',
  }
});



class PlayerCard extends Component {
  
  // handleClick = () => {
  //   // TODO - eventually takes the user to a player page.
  //   // this.props.history.push(`/team/${this.props.team.id}`)
  //   console.log('inside handleClick');
  // }


  render() {

    const { player, classes} = this.props;

    return (
      <div>
        <Paper onClick={this.props.handleClick} pt={3} pb={3} className={`${classes.paper} player-card`}>
            <h4>{player.name}</h4>
            <img alt={player.name} src={`https://media.api-sports.io/football/players/${player.id}.png`}/>
            <p>{player.position}</p>
        </Paper>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(withRouter(PlayerCard)));
