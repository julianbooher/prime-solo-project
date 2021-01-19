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

    if (this.props.match.params.username){
      this.props.dispatch({type: 'FETCH_USER_COMMENTS', payload: this.props.match.params.username})
    } else {
      this.props.dispatch({type: 'FETCH_USER_COMMENTS'})
    }
  }


  render() {

    const {user, comments} = this.props.store

    return (
      <div>
        <h1 id="user-title">{user.username}</h1>
        <Grid 
          container 
          spacing={0}
        >
          <Grid item container xs={12} sm={6}>
            <Grid item xs={12}>
              <h1>{user.username} info</h1>
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
