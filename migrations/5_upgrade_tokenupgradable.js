const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const TokenERC20Upgradable = artifacts.require('TokenERC20Upgradable');
const TokenERC20UpgradableV2 = artifacts.require('TokenERC20UpgradableV2');

module.exports = async function (deployer) {
  const existing = await TokenERC20Upgradable.deployed();
  const instance = await upgradeProxy(existing.address, TokenERC20UpgradableV2, { deployer });
  console.log("Upgraded", instance.address);
};