import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class LoginPage extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div>
        <LoginForm />

        <center>
          <p>Not registered?</p>
          <Button
            variant="contained"
            color="inherit"
            className={classes.button}
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(LoginPage));
