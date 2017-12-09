import web3 from '../utils/web3';
import contracts from './contracts';
import { WEB3_CONF } from '../constants';

const logger = require('../utils/logger')('userWrapper');

const rootContract = contracts.getContract('Root');

export async function registerUser({ userName, userType }) { // TODO - ready
  const actorNameBytes = web3.utils.fromAscii(userName);
  const constKeyBytes = web3.utils.fromAscii(WEB3_CONF.CONST_KEY);
  const whisperKeyBytes = web3.utils.fromAscii('TODO whisperKEY');

  const receipt = await rootContract.methods.registerUser(actorNameBytes, constKeyBytes, userType, whisperKeyBytes)
    .send({
      from: web3.eth.defaultAccount,
      gas: 3000000,
    });

  logger.log('debug', 'receipt: %j', receipt);
  return receipt;
}

export async function getMyUser() { // TODO - ready
  const userAddress = await rootContract.methods.getMyUser().call();

  logger.log('debug', 'userAddress: %s', userAddress);
  return userAddress;
}

export async function getUserDetails(userAddress) { // TODO - ready
  logger.log('debug', 'userAddress: %s', userAddress);
  const userContract = contracts.newContract('User', userAddress);
  const userDetails = await userContract.methods.getUserDetails().call();

  logger.log('debug', 'userDetails: %j', userDetails);
  return {
    userAddress,
    userName: web3.utils.toAscii(userDetails[0]).replace(/\u0000/g, ''),
    userType: userDetails[3],
    userEthAddress: userDetails[2],
    userConstKey: web3.utils.toAscii(userDetails[1]).replace(/\u0000/g, ''),
    userWhisperKey: web3.utils.toAscii(userDetails[4]).replace(/\u0000/g, ''),
  };
}

export async function getAllUsers() {
  return await rootContract.methods.getAllUsers().call();
}

export async function getUsersByType(userType) {
  return await rootContract.methods.getUsersByType(userType).call();
}
