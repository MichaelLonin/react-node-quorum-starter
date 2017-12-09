import isEmpty from 'lodash/isEmpty';
import web3 from '../utils/web3';
import { BUILDS_FOLDER } from '../constants';

const logger = require('../utils/logger')('contracts');

const Contracts = {
  getBuild(name) {
    delete require.cache[require.resolve(`${BUILDS_FOLDER}${name}.json`)];
    this[name] = require(`${BUILDS_FOLDER}${name}.json`); // eslint-disable-line
    return this[name];
  },

  getContract(name) {
    if (!this[name]) {
      this.getBuild(name);
    }

    if (!this[`${name}Contract`]) {
      let contract;
      if (!isEmpty(this[name].networks)) {
        contract = new web3.eth.Contract(this[name].abi, this[name].networks.address);
      } else {
        contract = new web3.eth.Contract(this[name].abi);
      }
      contract.options.data = this[name].bytecode;
      this[`${name}Contract`] = contract;
    }
    return this[`${name}Contract`];
  },

  newContract(name, address) {
    if (!this[name]) {
      this.getBuild(name);
    }
    return new web3.eth.Contract(this[name].abi, address);
  },

  async newPublicContract(contractObject, ...contractArguments) {
    const newContract = await contractObject.deploy({
      arguments: contractArguments,
    })
      .send({
        from: web3.eth.defaultAccount,
        gas: 10000000,
      })
      .on('transactionHash', txHash => logger.log('info', `newPublicContract: transactionHash:${txHash}`));
    return newContract;
  },

  async newPrivateContract(contractObject, privateFor, ...contractArguments) {
    const newContract = await contractObject.deploy({
      arguments: contractArguments,
    })
      .send({
        from: web3.eth.defaultAccount,
        gas: 10000000,
        privateFor,
      })
      .on('transactionHash', txHash => logger.log('info', `newPrivateContract: transactionHash:${txHash}`));
    return newContract;
  },
};

export default Contracts;
