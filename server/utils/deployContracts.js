import contracts from '../wrappers/contracts';
import artifactor from './artifactor';
import { BUILDS_FOLDER } from '../constants';

const logger = require('../utils/logger')('deployContracts');

async function deployRoot() {
  const rootBuild = contracts.getBuild('Root');
  const rootContract = contracts.getContract('Root');
  const contract = await contracts.newPublicContract(rootContract);
  rootBuild.networks = { address: contract.options.address };

  await artifactor.save(rootBuild, `${BUILDS_FOLDER}${rootBuild.contractName}`)
    .catch(error => logger.log('error', 'Contract artifacts saving failed: %s', error));

  logger.log('info', 'Root Deployed %s', rootBuild.networks.address);
}

(async () => await deployRoot())()
  .catch(error => logger.log('error', 'deployContracts was not finished: %s', error));
