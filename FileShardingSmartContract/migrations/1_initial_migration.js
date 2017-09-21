var Migrations = artifacts.require("./Migrations.sol");
var Blockchaindata = artifacts.require("./Blockchaindata.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Blockchaindata);
};
