#!/bin/bash

if [[ $# -eq 0 ]]; then
    printf "*** Running Default setup ***"
    NODE_NUMBER=4
else
    printf "*** Running Custom setup ***"
    NODE_NUMBER=$1
fi

cd /home/ubuntu/mercuria/server;
sudo rm -rf ./logs;
sudo -u ubuntu mkdir logs;

echo "NPM install is running"
npm i &&
sed -i "s|\(\"nodes_number\": \)[^.*]\(\,\)|\1${NODE_NUMBER}\2|g" package.json &&
sudo npm run linux

echo
echo "Application instances are running on localhost:22100, localhost:22101 and etc."