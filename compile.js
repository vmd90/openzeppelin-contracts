// const Kit = require('@celo/contractkit')
// const Web3 = require('web3');
// const kit = Kit.newKit(
//   // 'https://alfajores-forno.celo-testnet.org'
// )
// const web3 = kit.web3;

var solc = require("solc");
var fs = require("fs");

function getImports(path) {
  try {
    const buffer = fs.readFileSync(path);
    console.log('Importing: ' + path);
    return { contents: buffer.toString() };
  } catch (error) {
    return { error };
  }
}

function awaitWrapper() {
  const TokenERC20 = fs.readFileSync("./contracts/TokenERC20.sol");
  const TokenData = fs.readFileSync("./contracts/TokenData.sol");

  var input = {
    language: "Solidity",
    sources: {
      TokenERC20: {
        content: TokenERC20.toString(),
      },
      TokenData: {
        content: TokenData.toString(),
      },
    },
    settings: {
      remappings: [
        '@=./node_modules/@'
      ],
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input), { import: getImports }));
  console.log(JSON.stringify(output.errors, null, 2))

  for (const contract in output.contracts) {
    fs.writeFileSync(
      `./${contract}.json`,
      JSON.stringify(output.contracts[contract][contract]),
      { encoding: "utf-8" }
    );
  }
  console.log("Done.");
}
awaitWrapper();
