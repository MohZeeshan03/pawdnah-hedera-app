import {
  hethers,
  AccountId,
  PrivateKey,
  Client,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  TokenAssociateTransaction
} from '@hashgraph/sdk';

export const associateTokenContract = async(contractId, tokenId, adminKey, client)=>{
  const associateToken = new TokenAssociateTransaction()
    .setAccountId(AccountId.fromString(contractId))
    .setTokenIds([tokenId])
    .freezeWith(client)
    .sign(adminKey);
  const associateTokenTx = await associateToken.execute(client);
  const associateTokenRx = await associateTokenTx.getReceipt(client);
  return associateTokenRx.status;
}

// Creates a new account
// async function accountCreator(privateKey, initialBalance, client) {
//   const response = await new AccountCreateTransaction()
//     .setInitialBalance(new Hbar(initialBalance))
//     .setKey(privateKey.publicKey)
//     .execute(client);
//   const receipt = await response.getReceipt(client);
//   return receipt.accountId;
// }

// // Creates a new Fungible Token (change parameters if needed)
// async function tokenCreator(
//   tokenName,
//   tokenSymbol,
//   supply,
//   decimal,
//   treasuryId,
//   treasuryKey,
//   client
// ) {
//   //Create the transaction and freeze for manual signing
//   const createToken = await new TokenCreateTransaction()
//     .setTokenName(tokenName) // Name
//     .setTokenSymbol(tokenSymbol) // Symbol
//     .setTreasuryAccountId(treasuryId) // Treasury account
//     .setInitialSupply(supply) // Initial supply
//     .setSupplyKey(treasuryKey) // Supply key
//     .setDecimals(decimal) // Decimals
//     .setMaxTransactionFee(new Hbar(20)) // Change the default max transaction fee
//     .freezeWith(client);
//   // Sign with treasuryKey
//   const createTokenTx = await createToken.sign(treasuryKey);
//   const createTokenRx = await createTokenTx.execute(client);
//   const createTokenReceipt = await createTokenRx.getReceipt(client);

//   return createTokenReceipt.tokenId;
// }

// async function deployContract(
//   contractBytecode,
//   adminKey,
//   client,
//   gasLimit,
//   param
// ) {
//   const contractInstantiateTx = new ContractCreateFlow()
//     .setGas(gasLimit) //100000
//     .setBytecode(contractBytecode)
//     .setAdminKey(adminKey) //admin require for association otherwise you can remove it
//     .setConstructorParameters(param);
//   const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
//   const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
//     client
//   );
//   return contractInstantiateRx.contractId;
// }

// // Functions exports
// module.exports = {
//   deployContract,
//   associateTokenContract,
//   accountCreator,
//   tokenCreator,
// };
