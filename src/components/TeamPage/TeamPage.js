import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './TeamPage.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class TeamPage extends Component {


  render() {
    return (
      <div>
        <h1>Team Page</h1>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(TeamPage));
