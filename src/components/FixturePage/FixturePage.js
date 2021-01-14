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
    console.log('in componentDidMount', this.props.match.params.id)
    this.props.dispatch({type: 'FETCH_FIXTURE_INFO', payload: this.props.match.params.id});
    this.props.dispatch({type: 'FETCH_FIXTURE_COMMENTS', payload: this.props.match.params.id});
  }



  render() {
    const {classes } = this.props
    const { fixtureInfo } = this.props.store
    return (
      <div>
        <h1>Fixture Page</h1>
        {JSON.stringify(fixtureInfo)}
        {this.props.match.params.id}
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(FixturePage));