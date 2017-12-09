import * as userWrapper from '../wrappers/userWrapper';

const logger = require('../utils/logger')('userController');

export async function registerUser(req, res) {
  logger.log('debug', 'registerUser - start: %j', req.body);
  await userWrapper.registerUser(req.body);
  const userAddress = await userWrapper.getMyUser();
  const userDetails = await userWrapper.getUserDetails(userAddress);

  logger.log('info', 'RegisterUser successfully done!');
  logger.log('debug', 'registerUser - end: %j', userDetails);
  res.status(200).send(userDetails);
}

export async function getMyUser(req, res) {
  logger.log('debug', 'getMyUser - start');
  const userAddress = await userWrapper.getMyUser();
  let userDetails = false;
  if (!userAddress.includes('0x0000000000000000000000000000000000000000')) {
    userDetails = await userWrapper.getUserDetails(userAddress);
  }

  logger.log('info', 'getMyUser successfully done!');
  logger.log('debug', 'getMyUser - end: %j', userDetails);
  res.status(200).send(userDetails);
}

export async function getAllUsers(req, res) {
  logger.log('debug', 'getAllUsers - start');
  const usersAddresses = await userWrapper.getAllUsers();

  logger.log('info', 'getAllUsers successfully done!');
  logger.log('debug', 'getAllUsers - end: %j', usersAddresses);
  res.status(200).send(usersAddresses);
}

export async function getUsersByType(req, res) {
  logger.log('debug', 'getUsersByType - start: %j', req.body);
  const usersAddresses = await userWrapper.getUsersByType(req.body.userType);

  logger.log('info', 'getUsersByType successfully done!');
  logger.log('debug', 'getUsersByType - end: %j', usersAddresses);
  res.status(200).send(usersAddresses);
}
