import * as channelWrapper from '../wrappers/channelWrapper';
import ChannelModel from '../models/ChannelModel';

const logger = require('../utils/logger')('channelController');

export async function createChannel(req, res) { // TODO - ready
  logger.log('debug', 'createChannel - start: %j', req.body);
  const channelContract = await channelWrapper.createChannel(req.body);

  const channel = new ChannelModel({
    secondPartyAddress: req.body.secondPartyAddress,
    channelAddress: channelContract.options.address,
  });

  await channel.save()
    .catch(error => logger.log('error', `ChannelModel save fail - ${error}`));

  logger.log('info', 'createChannel successfully done!');
  logger.log('debug', 'createChannel - end: %j', channelContract.options.address);
  res.status(200).send(true);
}

export async function addEntity(req, res) { // TODO - in progress
  logger.log('debug', 'addEntity - start: %j', req.body);
  const receipt = await channelWrapper.addEntity(req.body);

  logger.log('info', 'addEntity successfully done!');
  logger.log('debug', 'createChannel - end: %j', receipt);
  res.status(200).send(true);
}

export async function getEntitiesByType(req, res) { // TODO - in progress
  logger.log('debug', 'getEntitiesByType - start: %j', req.body);
  // TODO get address from db?
  const entities = await channelWrapper.getEntitiesByType(req.body);

  logger.log('info', 'getEntitiesByType successfully done!');
  logger.log('debug', 'getEntitiesByType - end: %j', entities);
  res.status(200).send(entities);
}
