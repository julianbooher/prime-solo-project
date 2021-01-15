import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './FixtureInfo.css'
import WordBubble from '../WordBubble/WordBubble'
import RatingForm from '../RatingForm/RatingForm'


// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class FixturePage extends Component {

  componentDidMount = () => {
    console.log('in componentDidMount', this.props.match.params.id)
    this.props.dispatch({type: 'FETCH_FIXTURE_INFO', payload: this.props.match.params.id});
    this.props.dispatch({type: 'FETCH_FIXTURE_COMMENTS', payload: this.props.match.params.id});
    this.props.dispatch({type: 'FETCH_FIXTURE_PLAYERS', payload: this.props.match.params.id});
  }



  render() {
    // const {classes } = this.props
    const { info } = this.props.store.fixtureInfo
    const { comments } = this.props.store.fixtureInfo
    return (
      <div>
        {/* {JSON.stringify(this.props.store)} */}
        {/* {this.props.match.params.id} */}
        {info !== null &&
          <div className="fixture-header">
            <h1><img alt={info.home_team_name} src={`https://media.api-sports.io/football/teams/${info.home_team_id}.png`}/>{info.home_team_name} vs. {info.away_team_name}<img alt={info.away_team_name} src={`https://media.api-sports.io/football/teams/${info.away_team_id}.png`}/></h1>
            <h2>{info.date}</h2>
          </div>
        }
        <Grid 
            container 
            spacing={0}
          >
            <Grid item xs={12} sm={7}>
              <RatingForm fixture_id={this.props.match.params.id} info={info} />
            </Grid>
            <Grid item xs={12} sm={5}>
              {comments !== undefined &&
              <>
                {comments.map( comment => (
                  <WordBubble key={comment.username} commentInfo = {comment} info = {info} /> 
                ))}
              </>
              
              }
            </Grid>
          </Grid>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(FixturePage));