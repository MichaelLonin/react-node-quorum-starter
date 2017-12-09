Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.provision "bootstrap", type: "shell", path: "vagrantSetup/vagrant/bootstrap.sh", :args => "#{ENV['NODE_NUMBER']}"
  config.vm.provision "start_nodes", type: "shell", path: "vagrantSetup/vagrant/start_nodes.sh", :args => "#{ENV['NODE_NUMBER']}"
  #config.vm.provision "start_app", type: "shell", path: "vagrantSetup/vagrant/start_app.sh", :args => "#{ENV['NODE_NUMBER']}"
  (22000..22006).each do |i|
    config.vm.network "forwarded_port", guest: i, host: i
  end
  config.vm.network "forwarded_port", guest: 27017, host: 27017
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
  end
end
