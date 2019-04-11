import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, TextField, Button, withStyles } from '@material-ui/core'
import classnames from 'classnames'
import { each, isUndefined } from 'lodash'
import styles from './styles'
import { formatNumberResponse, toLowestDenom } from '../../utils/format'

class ContractAPI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: undefined,
      error: undefined,
    }
  }

  renderInfo = () => {
    const { classes, title, description, onlyOwner } = this.props

    return (
      <div className={classes.infoContainer}>
        <Typography variant="h6">
          {title} {onlyOwner && '(Only Owner)'}
        </Typography>
        <Typography variant="subtitle1">
          {description}
        </Typography>
      </div>
    )
  }

  renderFields = () => {
    const { classes, fields } = this.props

    return fields && (
      <div className={classes.fieldsContainer}>
        {fields.map(field => (
          <TextField
            className={classes.textField}
            key={field.label}
            label={field.label}
            value={field.value}
            disabled={Boolean(field.value)}
            onChange={e => this.setState({
              [field.label]: toLowestDenom(e.target.value, field.decimals),
            })}
          />
        ))}
      </div>
    )
  }

  renderButton = () => {
    const {
      classes,
      fields,
      buttonText,
      contractMethod,
    } = this.props

    return fields && buttonText && contractMethod && (
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            const params = []

            // Add params
            each(fields, (field) => {
              if (isUndefined(field.value)) {
                params.push(this.state[field.label])
              } else {
                params.push(field.value)
              }
            })

            // Execute contract method
            try {
              contractMethod(...params, (err, res) => {
                if (err) {
                  this.setState({
                    response: undefined,
                    error: err.message,
                  })
                  return
                }
                this.setState({
                  response: res.toString(),
                  error: undefined,
                })
              })
            } catch (err) {
              this.setState({
                response: undefined,
                error: err.message,
              })
            }
          }}
        >
          {buttonText}
        </Button>
      </div>
    )
  }

  renderResponse = () => {
    const { classes, responseFormat } = this.props
    const { error, response } = this.state

    if (error) {
      return error && (
        <div className={classes.responseContainer}>
          <Typography className={classes.errorText} variant="subtitle2">
            {error}
          </Typography>
        </div>
      )
    }

    return response && (
      <div className={classes.responseContainer}>
        <Typography variant="subtitle2">
          {formatNumberResponse(response, responseFormat)}
        </Typography>
      </div>
    )
  }

  render() {
    const { classes, onlyOwner } = this.props

    return (
      <div className={classnames(classes.root, { onlyOwner })}>
        {this.renderInfo()}
        <div className={classes.inputContainer}>
          {this.renderFields()}
          {this.renderButton()}
        </div>
        {this.renderResponse()}
      </div>
    )
  }
}

ContractAPI.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  contractMethod: PropTypes.func,
  responseFormat: PropTypes.object,
  onlyOwner: PropTypes.bool,
}

export default withStyles(styles)(ContractAPI)
