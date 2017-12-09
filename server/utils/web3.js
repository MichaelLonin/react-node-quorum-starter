import Web3 from 'web3';
import { WEB3_CONF } from '../constants';

const web3 = new Web3('http://localhost:8545');

const option = `http://${WEB3_CONF[`HOST_${process.platform.toUpperCase()}`]}:${WEB3_CONF.PORT}`;
web3.setProvider(new Web3.providers.HttpProvider(option));
web3.eth.defaultAccount = WEB3_CONF.ETH_KEY;

export default web3;
