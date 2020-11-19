const Token = require('./build/contracts/TokenERC20.json');
const Kit = require('@celo/contractkit');
const kit = Kit.newKit(
  'https://alfajores-forno.celo-testnet.org'
);

const getAccount = require('./getAccount').getAccount;

async function start() {

	const fromAccount = await getAccount();

	await transferToken({
		fromAccount, 
		toAddress: '0x3ca074f13ebb77b2704f7DF9Ca19c0dc42dE2d0E',
		amountEther: '500000',
		tokenAddress: '0xfc9e398b3159ee1e1efbbc5e2f13a455612a4afc'
	});
}

async function transferToken({ fromAccount, toAddress, amountEther, tokenAddress }){
	const token = new kit.web3.eth.Contract(Token.abi, tokenAddress);

	const chainId = await kit.web3.eth.getChainId();
	const gasPrice = await kit.web3.eth.getGasPrice();
	const count = await kit.web3.eth.getTransactionCount(fromAccount.address);

	const rawTransaction = {
		from: fromAccount.address,
		nonce: `0x${count.toString(16)}`,
		gasPrice,
		chainId: kit.web3.utils.numberToHex(chainId),
		to: token.options.address,
		value: '0x00',
		gasLimit: 100000
	};

	const transferAmount = kit.web3.utils.toWei(amountEther, 'ether');

	const txo = token.methods.transferWithComment(toAddress, transferAmount, "oiiiiiiii");
	rawTransaction.data = txo.encodeABI();
	
	kit.addAccount(fromAccount.privateKey);
	const tx = await kit.sendTransactionObject(txo, { from: fromAccount.address, to: tokenAddress });
	const hash = await tx.getHash();
	console.log(`SENT TRANSACTION: ${hash}`);
}
start().catch(console.error);
