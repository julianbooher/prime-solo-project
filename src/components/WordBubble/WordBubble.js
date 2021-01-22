import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
  

  goToUser = () => {
    this.props.history.push(`/user/${this.props.comment.username}`)
  }



  render() {

    const { classes, comment } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
              <Grid item xs={12} sm={5} container spacing={2}>
                <Grid item xs className="rating-info">
                  <Link to={`/user/${comment.username}`}>
                    <h3>{comment.username}</h3>
                  </Link>
                  <Link to={`/team/${comment.home_team_id}`}>
                    <p className="word-bubble-team">
                      <img 
                        className="word-bubble-crest"
                        alt={comment.home_team_name} 
                        src={`https://media.api-sports.io/football/teams/${comment.home_team_id}.png`}/>
                      {comment.home_team_name}
                    </p>
                  </Link> 
                  <p className="word-bubble-ratings"><b>ATK:</b> {comment.home_atk_rating} <b>DEF:</b>  {comment.home_df_rating}</p>
                  <Link to={`/team/${comment.away_team_id}`}>
                    <p className="word-bubble-team">
                      <img 
                        className="word-bubble-crest"
                        alt={comment.home_team_name} 
                        src={`https://media.api-sports.io/football/teams/${comment.away_team_id}.png`}/>
                      {comment.away_team_name}
                    </p>
                  </Link> 
                  <p className="word-bubble-ratings"><b>ATK:</b>  {comment.away_atk_rating} <b>DEF:</b>  {comment.away_df_rating}</p>
                  <p className="rating-potm">POTM:</p>
                  <p>{comment.potm_name}</p>
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

export default withStyles(styles)(withRouter(WordBubbles));