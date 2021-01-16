import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './RatedPage.css';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
  },
});


class RatedPage extends Component {  


  state = {
    editMode: false
  }

  handleDelete = () => {
    console.log('inside handleDelete');
  }

  handleEdit = () => {
    console.log('inside handleEdit');
    this.setState({...this.props.store.fixtureInfo.userRating, editMode: true})
    // console.log('state', this.state)
  }

  handleChange = (event, inputType) => { 
    this.setState({  
        [inputType]: event.target.value
    })
  }

  render() {

    const { classes } = this.props;
    const { info, players, userRating } = this.props.store.fixtureInfo


    return (
      <div className={classes.root}>
        {JSON.stringify(this.state)}
        <Paper className={classes.paper}>
          {/* {JSON.stringify(userRating)}
          <br/>
          {JSON.stringify(info)} */}
          <div className="rated-page-paper">
            <form>

            <h1>Your Rating</h1>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <h3>{info.home_team_name}</h3>
                {info.home_team_id &&
                <img alt={info.home_team_name} src={`https://media.api-sports.io/football/teams/${info.home_team_id}.png`}/>
                }
                
                <h4>Attack Rating</h4> 
                {this.state.editMode ? 
                <input 
                type="number" 
                value={this.state.home_atk_rating}
                min={0}
                max={100}
                onChange={event => this.handleChange(event, 'home_atk_rating')}
                />
                :
                <p>{userRating.home_atk_rating}</p>
                }
                <h4>Defense Rating</h4>
                {this.state.editMode ? 
                <input 
                type="number" 
                value={this.state.home_df_rating}
                min={0}
                max={100}
                onChange={event => this.handleChange(event, 'home_df_rating')}
                />
                :
                <p>{userRating.home_df_rating}</p>
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3>{info.away_team_name}</h3>
                {info.away_team_id &&
                  <img alt={info.away_team_name} src={`https://media.api-sports.io/football/teams/${info.away_team_id}.png`}/>
                }
                <h4>Attack Rating</h4>
                {this.state.editMode ? 
                <input 
                type="number" 
                value={this.state.away_atk_rating}
                min={0}
                max={100}
                onChange={event => this.handleChange(event, 'away_atk_rating')}
                />
                :
                <p>{userRating.away_atk_rating}</p>
                }
                
                <h4>Defense Rating</h4>
                {this.state.editMode ? 
                <input 
                type="number" 
                value={this.state.away_df_rating}
                min={0}
                max={100}
                onChange={event => this.handleChange(event, 'away_df_rating')}
                />
                : 
                <p>{userRating.away_df_rating}</p>
                }
              </Grid>
            </Grid>
              <h3>Player of the Match</h3>
              <p>{userRating.potm_name}</p>
              <img alt={userRating.potm_name} src={`https://media.api-sports.io/football/players/${userRating.potm_id}.png`}/>
              
              <h3>Comment:</h3>
              {this.state.editMode ?
              <div>
                <TextField
                id="outlined-multiline-static"
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
              :
              <p>{userRating.comment}</p>
              }
              
              <Button 
              variant="contained" 
              className={classes.button}
              onClick={this.handleDelete}
              >Delete</Button>
              <Button 
              variant="contained" 
              className={classes.button}
              onClick={this.handleEdit}
              >Edit</Button>
            </form>
          </div>
        </Paper>
 
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(RatedPage));