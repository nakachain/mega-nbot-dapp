import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
})

// Add console transport
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

// Add file transports
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'error.log',
    level: 'error',
  }))
  logger.add(new winston.transports.File({
    filename: 'combined.log',
  }))
}

export default logger
