import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, withStyles, Typography } from '@material-ui/core'
import styles from './styles'

@inject('store')
@observer
class WinnersTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object,
  }

  renderTableHead = () => {
    const { classes } = this.props
    return (
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeadText}>
            <Typography variant="subtitle1" color="secondary">
              Winner
            </Typography>
          </TableCell>
          <TableCell className={classes.tableHeadText} align="right">
            <Typography variant="subtitle1" color="secondary">
              Amount
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }

  renderTableBody = () => {
    const {
      classes,
      store: {
        walletStore: {
          account,
        },
        megaNBOTStore: {
          winners,
        },
      },
    } = this.props

    return (
      <TableBody>
        {winners.map((winner, index) => (
          <TableRow key={index} className={classes.tableBodyRow}>
            <TableCell>
              {`${account === winner.address && '(You) '}${winner.address}`}
            </TableCell>
            <TableCell align="right">
              {winner.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.winnersTableContainer}>
        <Typography variant="h6">
          Winners List
        </Typography>
        <Paper elevation={2}>
          <Table className={classes.table}>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(WinnersTable)
