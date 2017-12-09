const logger = require('../utils/logger')('asyncErrorHandler');

const asyncErrorHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((error) => {
        logger.log('error', `asyncErrorHandler - ${fn.name} - ${error}`);
        res.status(500).send(error);
        next();
      });
  };

export default asyncErrorHandler;
