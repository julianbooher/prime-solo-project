import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// Material UI
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class FixturePage extends Component {

  componentDidMount = () => {
    // this.props.dispatch({type: 'FETCH_FIXTURES'});
    // this.props.dispatch({type: 'FETCH_TEAMS'})
  }



  render() {
    const {classes } = this.props
    return (
      <div>
        <h1>Fixture Page</h1>
        {this.props.match.params.id}
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(FixturePage));