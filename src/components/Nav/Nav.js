import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { withRouter } from "react-router";


import './Nav.css';
// Material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';




import mapStoreToProps from '../../redux/mapStoreToProps';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Nav extends Component {
  
  goSomewhere = (destination) => {
    this.props.history.push(`/${destination}`)
  }

  render(){

    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={event => this.goSomewhere('home')}>
              <h2>Match Thread</h2>
            </Button>
              {this.props.store.user.id ? 
                <>
                <Button color="inherit" onClick={event => this.goSomewhere('home')}> Home</Button>
                <Button color="inherit" onClick={event => this.goSomewhere('fixtures')}>
                    Fixtures
                </Button>
                <Button color="inherit" onClick={event => this.goSomewhere('teams')}>
                    Teams
                </Button>
                <Button color="inherit" onClick={event => this.goSomewhere('user')}>
                    User
                </Button>

                <LogOutButton />
                </>
                 :
                <Button color="inherit" onClick={this.goToLogin}>Login/Register</Button>
              }
              
              {/* Always show this link since the about page is not protected */}
              <Button color="inherit" to="/about" component={Link}>
                About
              </Button>
          </Toolbar>
        </AppBar>
        <br></br>
        {JSON.stringify(this.props)}
      </div>
    );
  };

}


export default connect(mapStoreToProps)(withStyles(styles)(withRouter(Nav)));
