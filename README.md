# react-node-quorum-starter + basic registration

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- Install [Vagrant](https://www.vagrantup.com/downloads.html)

# Getting started
- Clone the repository
```
git clone https://github.com/MichaelLonin/react-node-quorum-starter
```
- Navigate to client and Install dependencies
```
cd ./react-node-quorum-starter/client
npm install
```
- Create client static build
```
npm run build
```
- Navigate to Server and Install dependencies
```
cd ../server
npm install
```
- Navigate to Root and Run Quorum automatically by using vagrant (Optional)
```
cd ..
vagrant up
```

- Navigate to Server and Deploy solidity contracts
```
cd ./server
npm run deploy
```
- Start the Node.js server
```
npm start
```

Navigate to `http://localhost:3000`

To update npm dependencies you can use `npm update`.

## Logs

Logs are created using Winston library [https://github.com/winstonjs/winston], output is going to console and file (./logs/combined.log). File contains full logs output (info + debug). Console by default is outputing only info, to change this set config.debug to true in ./package.json;

## Project Structure

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **client/**              | Contains React / Redux / TypeScript / SASS / SEMANTIC-UI source files                         |
| **client/build**         | Static assets that will be used client side                                                   |
| **server/**              | Contains the Node.js source code                                                              |
| **server/build**         | Contains artifactor builds                                                                    |
| **server/contracts**     | Contains solidity source code                                                                 |
| **server/controllers**   | Controllers define functions that respond to various http requests                            |
| **server/logs**          | Contains application logs file                                                                |
| **server/middlewares**   | Contains application middlewares                                                              |
| **server/node_modules**  | Contains all server npm dependencies                                                          |
| **server/utils**         | Contains all server utils                                                                     |
| **server/wrappers**      | Contains all solidity JavaScript instances                                                    |
| server/.babelrc          | Babel compiler config file                                                           |
| server/constants.js      | API keys, tokens, passwords, database URI. etc.                                               |
| server/package.json      | File that contains npm dependencies                                                           |
| server/server.js         | Entry point to your express app                                                               |
| **vagrantSetup/**        | Contains all Vagrant dependencies                                                             |
