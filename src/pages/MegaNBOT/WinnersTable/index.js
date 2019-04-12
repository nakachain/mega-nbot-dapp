import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Table, TableHead, TableBody, TableRow, TableCell, withStyles, Typography } from '@material-ui/core'
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
      <TableHead className={classes.tableHead}>
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
              {winner.address}
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
      <Table className={classes.table}>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }
}

export default withStyles(styles)(WinnersTable)
