const { deployProxy } = require('@openzeppelin/truffle-upgrades');
var TokenERC20Upgradable = artifacts.require('TokenERC20Upgradable');

module.exports = async function(deployer) {
  // const instance = await deployProxy(TokenERC20Upgradable, ['2000000'], { deployer });
  // console.log('Deployed', instance.address);
}