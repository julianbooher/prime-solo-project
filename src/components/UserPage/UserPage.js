import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import WordBubble from '../WordBubble/WordBubble';
import './UserPage.css';



// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class UserPage extends Component {
  
  

  componentDidMount = () => {

    // if there is a username in the params, get the comments from that user, otherwise get the comments for the current user.
    // if there is a username in the params, get the user info for that user, otherwise populate the store with current user info.

    if (this.props.match.params.username){
      this.props.dispatch({type: 'FETCH_USER_COMMENTS', payload: this.props.match.params.username})
      this.props.dispatch({type: 'FETCH_USER_INFO', payload: this.props.match.params.username})
    } else {
      this.props.dispatch({type: 'FETCH_USER_COMMENTS'})
      this.props.dispatch({type: 'SET_INFO', payload: this.props.store.user})
    }
  
  }

  componentWillUnmount = () => {
    this.props.dispatch({type: 'UNMOUNT_USER_INFO'})
  }


  render() {

    const {info, comments} = this.props.store

    return (
      <div>
        {JSON.stringify(info)}
        <h1 id="user-title">{info.username}</h1>
        <Grid 
          container 
          spacing={0}
        >
          <Grid item container xs={12} sm={6}>
            <Grid item xs={12} className="user-info">
              <h1>{info.username} info</h1>
              <p>Location: {info.location || 'None'}</p>
              <p>Favorite Team: <img className="user-info-crest" alt={info.favorite_team_name} src={`https://media.api-sports.io/football/teams/${info.favorite_team_id}.png`}/> {info.favorite_team_name}</p>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={6}>
            <Grid item xs={12}>
              <h1>Recent Comments</h1>
            </Grid>
            <Grid className="user-comments" item container>
              {comments.map( (comment, i) => (
                <Grid key={i} item xs={12}>
                  <WordBubble key={i} comment={comment} /> 
                </Grid>
              ))}

            </Grid>
          </Grid>
            
        </Grid>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withStyles(styles)(UserPage));
