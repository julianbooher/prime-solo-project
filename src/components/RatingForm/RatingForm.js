import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';

import './RatingForm.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 600,
    height: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 50,
  },
});

class RatingForm extends Component {
  state = {
    home_atk_rating: 50,
    home_df_rating: 0,
    away_atk_rating: 0,
    away_df_rating: 0,
    comment: ''
  };

  handleChange = (event, inputType) => { 
    this.setState({  
        [inputType]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { info } = this.props.store.fixtureInfo
    return (
      <Paper className={classes.paper}>
        <h1 className="rating-title">Rating</h1>
        <div className="rating-fields-div">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <h3>{info.home_team_name}</h3>
              <br/>
              <img alt={info.home_team_name} src={`https://media.api-sports.io/football/teams/${info.home_team_id}.png`}/>
              <div>
                <TextField
                  id="outlined-number"
                  label="Attack Rating /100"
                  value={this.state.home_atk_rating}
                  onChange={event => this.handleChange(event, 'home_atk_rating')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                  style = {{width: 140}}
                />
              </div>
              <div>
                <TextField
                  id="outlined-number"
                  label="Defense Rating /100"
                  value={this.state.home_df_rating}
                  onChange={event => this.handleChange(event, 'home_df_rating')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                  style = {{width: 140}}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3>{info.away_team_name}</h3>
              <br/>
              <img alt={info.away_team_name} src={`https://media.api-sports.io/football/teams/${info.away_team_id}.png`}/>
              <div>
                <TextField
                  id="outlined-number"
                  label="Attack Rating /100"
                  value={this.state.away_atk_rating}
                  onChange={event => this.handleChange(event, 'away_atk_rating')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                  style = {{width: 140}}
                />
              </div>
              <div>
                <TextField
                  id="outlined-number"
                  label="Defense Rating /100"
                  value={this.state.away_df_rating}
                  onChange={event => this.handleChange(event, 'away_df_rating')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                  style = {{width: 140}}
                />
              </div>
            </Grid>
          </Grid>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows="5"
            onChange={event => this.handleChange(event, 'comment')}
            value={this.state.comment}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            style = {{width: 300}}
          />
        </div>
      </Paper>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RatingForm));
