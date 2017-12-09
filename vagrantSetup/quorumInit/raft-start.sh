#!/bin/bash
set -u
set -e

GLOBAL_ARGS="--raft --rpc --shh --rpcaddr 0.0.0.0 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum --emitcheckpoints"

echo "[*] Starting Constellation nodes"
nohup constellation-node conf/tm1.conf 2>> qdata/logs/constellation1.log &
sleep 1
nohup constellation-node conf/tm2.conf 2>> qdata/logs/constellation2.log &
nohup constellation-node conf/tm3.conf 2>> qdata/logs/constellation3.log &
nohup constellation-node conf/tm4.conf 2>> qdata/logs/constellation4.log &
nohup constellation-node conf/tm5.conf 2>> qdata/logs/constellation5.log &
nohup constellation-node conf/tm6.conf 2>> qdata/logs/constellation6.log &
nohup constellation-node conf/tm7.conf 2>> qdata/logs/constellation7.log &

sleep 1

echo "[*] Starting node 1"
PRIVATE_CONFIG=conf/tm1.conf nohup geth --datadir qdata/dd1 $GLOBAL_ARGS --raftport 50400 --rpcport 22000 --port 21000 --unlock 0 --password passwords.txt 2>>qdata/logs/1.log &

echo "[*] Starting node 2"
PRIVATE_CONFIG=conf/tm2.conf nohup geth --datadir qdata/dd2 $GLOBAL_ARGS --raftport 50401 --rpcport 22001 --port 21001 --unlock 0 --password passwords.txt 2>>qdata/logs/2.log &

echo "[*] Starting node 3"
PRIVATE_CONFIG=conf/tm3.conf nohup geth --datadir qdata/dd3 $GLOBAL_ARGS --raftport 50402 --rpcport 22002 --port 21002 --unlock 0 --password passwords.txt 2>>qdata/logs/3.log &

echo "[*] Starting node 4"
PRIVATE_CONFIG=conf/tm4.conf nohup geth --datadir qdata/dd4 $GLOBAL_ARGS --raftport 50403 --rpcport 22003 --port 21003 --unlock 0 --password passwords.txt 2>>qdata/logs/4.log &

echo "[*] Starting node 5"
PRIVATE_CONFIG=conf/tm5.conf nohup geth --datadir qdata/dd5 $GLOBAL_ARGS --raftport 50404 --rpcport 22004 --port 21004 --unlock 0 --password passwords.txt 2>>qdata/logs/5.log &

echo "[*] Starting node 6"
PRIVATE_CONFIG=conf/tm6.conf nohup geth --datadir qdata/dd6 $GLOBAL_ARGS --raftport 50405 --rpcport 22005 --port 21005 --unlock 0 --password passwords.txt 2>>qdata/logs/6.log &

echo "[*] Starting node 7"
PRIVATE_CONFIG=conf/tm7.conf nohup geth --datadir qdata/dd7 $GLOBAL_ARGS --raftport 50406 --rpcport 22006 --port 21006 --unlock 0 --password passwords.txt 2>>qdata/logs/7.log &

echo "All nodes configured. See 'qdata/logs' for logs, and run e.g. 'geth attach qdata/dd1/geth.ipc' to attach to the first Geth node"
