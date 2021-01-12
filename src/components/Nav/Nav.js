import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { withRouter } from "react-router";


import './Nav.css';
// Material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from "@material-ui/icons/Menu";




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

  state = {
    width: 0,
    anchorEl: null,
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  
  goSomewhere = (destination) => {
    this.props.history.push(`/${destination}`)
    if (this.state.anchorEl !== null){
      this.setState({ anchorEl: null })
    }
  }


  render(){

    const {classes} = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={event => this.goSomewhere('home')}>
              <h2>Match Thread</h2>
            </Button>
              {this.props.store.user.id ? 
                <>
                {this.state.width < 800 ? 
                  <>
                    <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenuClick}
                    >
                    <MenuIcon />
                    </Button>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    >
                    <MenuItem onClick={event => this.goSomewhere('home')}>Home</MenuItem>
                    <MenuItem onClick={event => this.goSomewhere('fixtures')}>Fixtures</MenuItem>
                    <MenuItem onClick={event => this.goSomewhere('teams')}>Teams</MenuItem>
                    <MenuItem onClick={event => this.goSomewhere('user')}>User</MenuItem>
                    <MenuItem onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>LogOut</MenuItem>
                    </Menu>
                  </>
                :
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
              }
              </>
                 :
                 <Button color="inherit" onClick={event => this.goSomewhere('login')}>Login/Register</Button>
                }
          </Toolbar>
        </AppBar>
        {/* {JSON.stringify(this.state.width)} */}

      </div>
    );
  };

}


export default connect(mapStoreToProps)(withStyles(styles)(withRouter(Nav)));
