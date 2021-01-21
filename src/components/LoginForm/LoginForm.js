import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './LoginForm.css';

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
});

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

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


    return (
      <form className="formPanel" onSubmit={this.login}>
        <h2>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
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
        <Button 
              variant="contained"
              color="primary" 
              className={classes.button}
              type="submit"
            >
              Login
            </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(LoginForm));
