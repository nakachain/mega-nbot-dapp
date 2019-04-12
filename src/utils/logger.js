import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }))
  logger.add(new winston.transports.File({
    filename: 'logs/combined.log',
  }))
}

export default logger
