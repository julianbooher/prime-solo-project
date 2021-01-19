import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './HomePage.css';

import FixtureTable from '../FixtureTable/FixtureTable';
import WordBubble from '../WordBubble/WordBubble';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});


class HomePage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_FIXTURES'})
    this.props.dispatch({type: 'FETCH_HOME_COMMENTS'})
  }
  

  render() {

    const { comments, user } = this.props.store
    return (
      <div>
        <h1>Welcome, {user.username}</h1>
        <Grid 
          container 
          spacing={0}
        >
          <Grid item container xs={12} sm={6}>
            <Grid item xs={12}>
              <h1>Recent Fixtures</h1>
            </Grid>
            <FixtureTable />
          </Grid>
          <Grid container item xs={12} sm={6}>
            <Grid item xs={12}>
              <h1>Recent Comments</h1>
            </Grid>
            <Grid className="home-comments" item container>
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

export default connect(mapStoreToProps)(withStyles(styles)(HomePage));
