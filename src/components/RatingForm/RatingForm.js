import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './RatingForm.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 800,
    height: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 50,
  },
  button: {
    margin: theme.spacing(1),
  },
});

const defaultState = {
  home_atk_rating: 0,
  home_df_rating: 0,
  away_atk_rating: 0,
  away_df_rating: 0,
  comment: '',
  player_id: '',
}

class RatingForm extends Component {

  state = defaultState;

  handleChange = (event, inputType) => { 
    this.setState({  
        [inputType]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('inside handleSubmit', {...this.state, ...this.props.store.fixtureInfo.info, fixture_id: this.props.fixture_id})
    this.props.dispatch({type:'ADD_RATING', payload: {...this.state, ...this.props.store.fixtureInfo.info, fixture_id: this.props.fixture_id}})
    this.setState(defaultState)
  }

  render() {
    const { classes } = this.props;
    const { info, players } = this.props.store.fixtureInfo
    return (
      <Paper className={classes.paper}>
        <h1 className="rating-title">Rating</h1>
        <div className="rating-fields-div">
          <form onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <h3>{info.home_team_name}</h3>
              <br/>
              {info.home_team_id &&
              <img alt={info.home_team_name} src={`https://media.api-sports.io/football/teams/${info.home_team_id}.png`}/>
              }
              <div>
                
                <TextField
                  id="standard-number"
                  label="Attack Rating /100"
                  value={this.state.home_atk_rating}
                  onChange={event => this.handleChange(event, 'home_atk_rating')}
                  type="number"
                  className={classes.textField}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  style = {{width: 140}}
                />
              </div>
              <div>
                <TextField
                  id="standard-number"
                  label="Defense Rating /100"
                  value={this.state.home_df_rating}
                  onChange={event => this.handleChange(event, 'home_df_rating')}
                  type="number"
                  className={classes.textField}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  style = {{width: 140}}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3>{info.away_team_name}</h3>
              <br/>
              {info.away_team_id &&
                <img alt={info.away_team_name} src={`https://media.api-sports.io/football/teams/${info.away_team_id}.png`}/>
              }
              <div>
                <TextField
                  id="standard-number"
                  label="Attack Rating /100"
                  value={this.state.away_atk_rating}
                  onChange={event => this.handleChange(event, 'away_atk_rating')}
                  type="number"
                  className={classes.textField}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  style = {{width: 140}}
                />
              </div>
              <div>
                <TextField
                  id="standard-number"
                  label="Defense Rating /100"
                  value={this.state.away_df_rating}
                  onChange={event => this.handleChange(event, 'away_df_rating')}
                  type="number"
                  className={classes.textField}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  style = {{width: 140}}
                />
              </div>
            </Grid>
          </Grid>
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows="5"
            onChange={event => this.handleChange(event, 'comment')}
            value={this.state.comment}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            style = {{width: 300}}
          />
          <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="player-native-simple">Player of the Match</InputLabel>
          <Select
            native
            required
            displayEmpty
            value={this.state.playerSelected}
            onChange={(event) => this.handleChange(event, 'player_id')}
            inputProps={{
              name: 'player_id',
              id: 'player-native-simple',
            }}
          >
            <option value={''}></option>
            {players.map((player) => {
              return(
                <option key={player.player_id} value={player.player_id}>{player.player_name} - {player.team_name}</option>
              )
            })}
          </Select>
        </FormControl>
          </div>
          <div>
            <Button 
              variant="contained" 
              className={classes.button}
              type="submit"
            >
              Submit Rating
            </Button>
          </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RatingForm));
