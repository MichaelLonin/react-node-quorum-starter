#!/bin/bash
set -u
set -e

cd /home/ubuntu/quorumInit
chmod +x raft-init.sh
sudo -u ubuntu ./raft-init.sh
chmod +x raft-start.sh
sudo -u ubuntu ./raft-start.sh
cd /home/ubuntu/

# done!
banner "Quorum"
echo
echo 'The Quorum vagrant instance has been provisioned. Network init files are available in ~/quorumInit inside the instance.'
echo "Use 'vagrant ssh' to open a terminal, 'vagrant suspend' to stop the instance, and 'vagrant destroy' to remove it."
