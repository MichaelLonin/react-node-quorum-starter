import web3 from '../utils/web3';
import contracts from './contracts';

const logger = require('../utils/logger')('channelWrapper');

export async function createChannel({ secondPartyAddress, constKeys }) { // TODO - ready
  logger.log('debug', 'secondPartyAddress: %s, constKeys: %s', secondPartyAddress, constKeys);

  const contract = await contracts.newPrivateContract(
    contracts.getContract('Channel'),
    constKeys,
    secondPartyAddress,
  );
  return contract;
}

export async function addEntity({ channelAddress, constKeys, entityAddress, entityType }) { // TODO - in progress
  logger.log(
    'debug',
    'channelAddress: %s, constKeys: %s, entityAddress: %s, entityType: %s',
    channelAddress, constKeys, entityAddress, entityType,
  );
  const channelContract = await contracts.newContract('Channel', channelAddress);
  const entityAddressBytes = web3.utils.fromAscii(entityAddress);

  const receipt = await channelContract.methods.addEntity(entityAddressBytes, entityType)
    .send({
      from: web3.eth.defaultAccount,
      privateFor: constKeys,
      gas: 3000000,
    });
  logger.log('info', 'AddEntity successfully done!');

  logger.log('debug', 'receipt: %j', receipt);
  return receipt;
}

export async function getAllEntities(channelAddress) { // TODO - in progress
  logger.log('debug', 'channelAddress: %s', channelAddress);
  const channelContract = await contracts.newContract('Channel', channelAddress);
  const { 0: entityAddresses, 1: entityTypes } = channelContract.methods.getAllEntities().call();
  logger.log('debug', 'entityAddresses: %j, entityTypes: %j', entityAddresses, entityTypes);
  const entityTypesString = ['Type1', 'Type2', 'Type3'];
  const entities = [];
  entityAddresses.forEach((entityAddress, index) => {
    entities.push({
      entityAddress,
      entityType: entityTypesString[entityTypes[index]],
    });
  });
  logger.log('debug', 'entities: %j', entities);
  return entities;
}

export async function getEntitiesByType({ channelAddress, entityType }) { // TODO - in progress
  logger.log('debug', 'channelAddress: %s, entityType: %s', channelAddress, entityType);
  const channelContract = await contracts.newContract('Channel', channelAddress);
  const { 0: entityAddresses } = channelContract.methods.getEntitiesByType(entityType).call();
  logger.log('debug', 'entityAddresses: %j', entityAddresses);
  const entityTypesString = ['Type1', 'Type2', 'Type3'];
  const entities = [];
  entityAddresses.forEach((entityAddress) => {
    entities.push({
      entityAddress,
      entityType: entityTypesString[entityType],
    });
  });
  logger.log('debug', 'entities: %j', entities);
  return entities;
}
