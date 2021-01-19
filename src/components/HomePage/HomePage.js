import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});


class HomePage extends Component {
  

  render() {
    return (
      <div>
        <FixtureTable />
      </div>

    );
  }
}

export default connect(mapStoreToProps)(HomePage);
