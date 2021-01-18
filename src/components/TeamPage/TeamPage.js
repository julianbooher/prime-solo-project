import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './TeamPage.css'
import FixtureTable from '../FixtureTable/FixtureTable'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class TeamPage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_FIXTURES', payload: this.props.match.params.id})
  }


  render() {
    return (
      <div>
        <h1>Team Page</h1>
        <Grid 
            container 
            spacing={0}
          >
            <Grid item xs={12} sm={6}>
              <FixtureTable />

            </Grid>
            <Grid item xs={12} sm={6}>
              
            </Grid>
          </Grid>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(TeamPage));
