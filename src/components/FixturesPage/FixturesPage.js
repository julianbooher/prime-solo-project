import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import FixtureTable from '../FixtureTable/FixtureTable'
import './FixturesPage.css';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});


class FixturePage extends Component {

  state = {
    teamSelected: 0
  }
  
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_FIXTURES'});
    this.props.dispatch({type: 'FETCH_TEAMS'})
  }

  componentWillUnmount = () => {
    this.props.dispatch ({ type: 'UNSET_FIXTURES'})
  }

  // Handles change in the dropdown menu, allowing the user to select a team and view the fixtures from that team only.
  handleChangeFor = (event) => {
    this.setState({
    teamSelected: event.target.value
    })
    this.props.dispatch({type: 'FETCH_FIXTURES', payload: event.target.value})

}

  render() {
    const { classes } = this.props
    return (
      <div className={`${classes.root} fixtures-page-div `}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="team-native-simple">Team</InputLabel>
          <Select
            native
            value={this.state.teamSelected}
            onChange={(event) => this.handleChangeFor(event)}
            inputProps={{
              name: 'team_id',
              id: 'team-native-simple',
            }}
          >
            <option value={0}>All</option>
            {this.props.store.teams.map((team) => {
              return(
                <option key={team.id} value={team.id}>{team.name}</option>
              )
            })}
          </Select>
        </FormControl>
        <div>
          <h1>Fixtures</h1>
        </div>
        <div>
          <FixtureTable />
        </div>

      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(FixturePage));
