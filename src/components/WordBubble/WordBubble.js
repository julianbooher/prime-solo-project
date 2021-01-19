import React, { Component } from 'react';
import './WordBubble.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 800,
  },
});


class WordBubbles extends Component {  
  render() {

    const { classes, comment } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
              <Grid item xs={12} sm={5} container spacing={2}>
                <Grid item xs>
                  <p className="username">{comment.username}</p>
                  <p className="rating home-team">{comment.home_team_name}<br></br> <b>ATK:</b> {comment.home_atk_rating} <b>DEF:</b>  {comment.home_df_rating}</p>
                  <p className="rating away-team">{comment.away_team_name}<br></br> <b>ATK:</b>  {comment.away_atk_rating} <b>DEF:</b>  {comment.away_df_rating}</p>
                  <p className="rating potm">POTM: <br></br>{comment.potm_name}</p>
                </Grid>
              </Grid>
            <Grid item xs={12} sm={7} container >
              <Grid item>
                <p className="rating comment">{comment.comment}</p>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
 
      </div>
    );
  }
}

export default withStyles(styles)(WordBubbles);