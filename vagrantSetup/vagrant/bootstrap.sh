#!/bin/bash
set -eu -o pipefail

# install build deps
add-apt-repository ppa:ethereum/ethereum
apt-get update
apt-get install -y build-essential unzip libdb-dev libleveldb-dev libsodium-dev zlib1g-dev libtinfo-dev solc sysvbanner wrk

# install constellation
CREL=constellation-0.2.0-ubuntu1604
wget -q https://github.com/jpmorganchase/constellation/releases/download/v0.2.0/$CREL.tar.xz
tar xfJ $CREL.tar.xz
sudo cp $CREL/constellation-node /usr/local/bin && sudo chmod 0755 /usr/local/bin/constellation-node
rm -rf $CREL

# install golang
GOREL=go1.7.3.linux-amd64.tar.gz
wget -q https://storage.googleapis.com/golang/$GOREL
tar xfz $GOREL
mv go /usr/local/go
rm -f $GOREL
PATH=$PATH:/usr/local/go/bin
echo 'PATH=$PATH:/usr/local/go/bin' >> /home/ubuntu/.bashrc

# make/install quorum
git clone https://github.com/jpmorganchase/quorum.git
pushd quorum >/dev/null
git checkout tags/v2.0.0
make all
cp build/bin/geth /usr/local/bin
cp build/bin/bootnode /usr/local/bin
popd >/dev/null

# copy quorum init files, cakeshop files, CarRental project files
cp -r /vagrant/vagrantSetup/quorumInit /home/ubuntu/quorumInit
chown -R ubuntu:ubuntu /home/ubuntu/quorum /home/ubuntu/quorumInit

#node js installation
cd ~
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get -y install nodejs

#Swap allocation
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

#Mongo install
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo sed -i 's/\(bindIp*: \).*/\10.0.0.0/' /etc/mongod.conf
sudo service mongod start
sleep 2
cat /var/log/mongodb/mongod.log

echo
echo 'All necessary dependencies were successfully installed on vagrant machine.'
