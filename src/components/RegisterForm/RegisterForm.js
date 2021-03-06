import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material UI
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    marginTop: "2em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    width: 200,
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    marginTop: '.5em',
  }
});

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    team_id: '',
    location: '',
  };

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_TEAMS'})
  }

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: this.state
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {

    const { classes } = this.props;
    const { teams } = this.props.store;

    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            required
            id="standard-name"
            label="Username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
            className={classes.textField}
            margin="normal"
          />
        </div>
        <div>
          <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            required
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="team-native-simple">Favorite Team</InputLabel>
            <Select
              native
              required
              displayEmpty
              value={this.state.team_id}
              onChange={this.handleInputChangeFor('team_id')}
              inputProps={{
                name: 'team_id',
                id: 'team-native-simple',
              }}
            >
              <option key={'default'} value={''}></option>
              {teams.map((team) => {
                return(
                  <option key={team.id} value={team.id}>{team.name}</option>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            id="standard-location"
            label="Location"
            value={this.state.location}
            onChange={this.handleInputChangeFor('location')}
            className={classes.textField}
            margin="normal"
          />
        </div>
        <div>
        <Button 
              variant="contained"
              color="primary" 
              className={classes.button}
              type="submit"
            >
              Register
            </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RegisterForm));
