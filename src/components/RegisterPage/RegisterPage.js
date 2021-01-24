import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RegisterForm from '../RegisterForm/RegisterForm';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {

    const {classes } = this.props;

    return (
      <div>
        <RegisterForm />

        <center>
          <p>Already registered?</p>
          <Button
            variant="contained"
            color="inherit"
            className={classes.button}
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RegisterPage));
