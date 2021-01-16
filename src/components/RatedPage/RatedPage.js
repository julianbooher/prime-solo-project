import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './RatedPage.css';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 600,
  },
});


class RatedPage extends Component {  
  render() {

    const { classes } = this.props;
    const { info, players, userRating } = this.props.store.fixtureInfo


    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {JSON.stringify(userRating)}
          <br/>
          {JSON.stringify(info)}
          <div className="rated-page-paper">
            <h1>Your Rating</h1>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <h3>{info.home_team_name}</h3>
                {info.home_team_id &&
                <img alt={info.home_team_name} src={`https://media.api-sports.io/football/teams/${info.home_team_id}.png`}/>
                }
                <p><b>Attack Rating:</b> {userRating.home_atk_rating}</p>
                <p><b>Defense Rating:</b> {userRating.home_df_rating}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3>{info.away_team_name}</h3>
                {info.away_team_id &&
                  <img alt={info.away_team_name} src={`https://media.api-sports.io/football/teams/${info.away_team_id}.png`}/>
                }
                <p><b>Attack Rating:</b> {userRating.away_atk_rating}</p>
                <p><b>Defense Rating:</b> {userRating.away_df_rating}</p>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <h3>Comment:</h3>
                <p>{userRating.comment}</p>
              </Grid>
              <Grid item xs={2}></Grid>

            </Grid>

              <Button 
              variant="contained" 
              className={classes.button}
              type="submit">Delete</Button>
              <Button 
              variant="contained" 
              className={classes.button}
              type="submit">Edit</Button>
          </div>
        </Paper>
 
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RatedPage));