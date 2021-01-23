import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';
import './PlayerStats.css'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  table: {
    maxWidth: '65%',
    margin: 'auto',
  },
  })



class PlayerStats extends Component {
  
  render() {

    const { statistics } = this.props.store;
    const { classes } = this.props;

    return (
      <div className={`${classes.paper} stats-modal-div`}>
        <Typography variant="h4" id="modal-title">
          {statistics.name}
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          <p>Born: {moment(statistics.birthDate).format('LL')}</p>
          <p>Birthplace: {statistics.birthPlace}</p>
          <p>Position: {statistics.position}</p>
        </Typography>
        <div className="stats-modal-table">
          <Typography variant="h6" id="stats-modal-table-header">
            Season Statistics
          </Typography>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row"> Appearances</TableCell>
                <TableCell>{statistics.appearances}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Minutes</TableCell>
                <TableCell>{statistics.minutes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Total Shots</TableCell>
                <TableCell>{statistics.totalShots}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Shots On Target</TableCell>
                <TableCell>{statistics.shotsOnTarget}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Goals</TableCell>
                <TableCell>{statistics.goals}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Assists</TableCell>
                <TableCell>{statistics.assists}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Passes</TableCell>
                <TableCell>{statistics.passes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Key Passes</TableCell>
                <TableCell>{statistics.keyPasses}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Tackles</TableCell>
                <TableCell>{statistics.tackles}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Interceptions</TableCell>
                <TableCell>{statistics.interceptions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Total Duels</TableCell>
                <TableCell>{statistics.duelsTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Duels Won</TableCell>
                <TableCell>{statistics.duelsWon}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Successful Dribbles</TableCell>
                <TableCell>{statistics.dribbles}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Fouls Committed</TableCell>
                <TableCell>{statistics.foulsCommitted}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"> Fouls Drawn</TableCell>
                <TableCell>{statistics.foulsDrawn}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </div>
      </div>

    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(withRouter(PlayerStats)));
