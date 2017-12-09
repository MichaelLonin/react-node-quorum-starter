import * as path from 'path';

export const CONTRACTS_FOLDER = path.join(__dirname, './contracts/');
export const BUILDS_FOLDER = path.join(__dirname, './build/');

const APP_CONFS = [
  {
    HOST: 'localhost',
    PORT: 3000,
    SESSION_SECRET: 'ashdfjhasdlkjfhalksdjhflak',
    MONGODB_URI: 'mongodb://localhost:27017/app_0',
  },
  {
    HOST: 'localhost',
    PORT: 3001,
    SESSION_SECRET: 'ashdfjhasdlkjfhalksdjhflak',
    MONGODB_URI: 'mongodb://localhost:27017/app_1',
  },
];

const WEB3_CONFS = [
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22000,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
    CONST_KEY: 'NVR9F3+Lk9rXZ/e5Xq5aT6v0iKI8j8rdXcLpb5cSfxI=',
  },
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22001,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0xd4de776901d5ffb38d6f0ca97201923f4135fd75',
    CONST_KEY: 'aXot3qMt88FaEk+o+3BtSUHZalqdWr39rYEYH6R3wB0=',
  },
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22002,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0x59474a34cf028b8eb69ebc308f3d8f6a2d39405a',
    CONST_KEY: 'AIvmSrImq+amRlnpXoS3+yn5pCBJNAHq08bOM/REgUs=',
  },
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22003,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0x4741d4256dad92ce671eca2568746b39048c14ee',
    CONST_KEY: '25QKg7q9M7umHUTpiTueRieHvR/2eknIHHcpWN0AKjI=',
  },
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22004,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0x43f30bfb2014fc38f7ec0fe8d49958e3f3da879a',
    CONST_KEY: 'mxGIT2U3cvfSbIIl0akfyk+aQA/M8LDQeBIsYuP3G30=',
  },
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22005,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0x732cb2a4592d61feba879b4c38ff23a312be08fb',
    CONST_KEY: '857kYJoJHjqxq5v+9WRGEN80y2T4pmgrqYhXcqe8Yk0=',
  },
  {
    HOST_WIN32: 'localhost',
    HOST_DARWIN: 'localhost',
    HOST_LINUX: '0.0.0.0',
    PORT: 22006,
    ACCOUNT_NUMBER: 0,
    ETH_KEY: '0xc5f7bedd19b2fded96cac8634cc8365fbafbce9e',
    CONST_KEY: 'YcTEReap9QZo4KX3U9Bc+9cWXTKZZ2pYnmXVf6+ET3Q=',
  },
];

export const WEB3_CONF = WEB3_CONFS[process.argv[2]];
export const APP_CONF = APP_CONFS[process.argv[2]];
