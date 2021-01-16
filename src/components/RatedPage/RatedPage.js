import React, { Component } from 'react';
import './RatedPage.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 600,
  },
});


class RatedPage extends Component {  
  render() {

    const { classes, commentInfo, info } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h1>Your Commentary</h1>
        </Paper>
 
      </div>
    );
  }
}

export default withStyles(styles)(RatedPage);