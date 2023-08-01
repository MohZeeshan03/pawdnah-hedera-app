import { useEffect, useState } from "react";
import { getContract } from "../helper/ContractHelper";
import {
    AccountId,
    PrivateKey,
    Client,
    ContractFunctionParameters,
    ContractCallQuery,
    ContractId
} from '@hashgraph/sdk';
import { TOKEN_DECIMALS, contractAddress, contractId } from "../config/constants";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { ethers } from "ethers";




const operatorId = AccountId.fromString(process.env.REACT_APP_GAS_WALLET_ID);
const operatorKey = PrivateKey.fromString(process.env.REACT_APP_GAS_WALLET_PVKEY);
export const client = Client.forMainnet().setOperator(operatorId, operatorKey);



export const useCommonStats = (updater) => {
    const { accountId } = useWalletInterface();
    const [stats, setStats] = useState({
        depositAmount: 0,
        tokenBalance: 0,
        allowance: 0,
        loading: true
    });


    useEffect(() => {
        const fetch = async () => {
            try {
                let account;
                let checkAddrss = ethers.utils.isAddress(accountId.toString());
                if (checkAddrss) {
                    account = accountId.toString();
                } else {
                    account = ContractId.fromString(
                        accountId.toString()
                    ).toSolidityAddress()
                }

                let tc = getContract();
                let tokenB = await tc.balanceOf(account)
                tokenB = tokenB.toString() / Math.pow(10, TOKEN_DECIMALS);

                let tokenA = await tc.allowance(account, contractAddress)
                tokenA = tokenA.toString() / Math.pow(10, TOKEN_DECIMALS);

                //Deposit Amount
                let contractQueryTx = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("depositAmount");
                let contractQuerySubmit = await contractQueryTx.execute(client);
                let depositAmountResult = contractQuerySubmit.getInt256();

                setStats({
                    depositAmount: depositAmountResult.toString(),
                    tokenBalance: tokenB,
                    allowance: tokenA,
                    loading: false
                })

            }
            catch (err) {
                console.log(err.message);
            }
        }

        if (accountId) {
            fetch()
        }
        else{
            setStats({
                depositAmount: 0,
                tokenBalance: 0,
                allowance: 0,
                loading: true
            })
        }
    }, [updater, accountId])

    return stats;
}


export const useWithdrawStats = (updater) => {
    const { accountId } = useWalletInterface();
    const [stats, setStats] = useState({
        eligibleWithdrawals: 0,
        loading: true
    });


    useEffect(() => {
        const fetch = async () => {
            try {
                let account;
                let checkAddrss = ethers.utils.isAddress(accountId.toString());
                if (checkAddrss) {
                    account = accountId.toString();
                } else {
                    account = ContractId.fromString(
                        accountId.toString()
                    ).toSolidityAddress()
                }
                //eligibleWithdrawals

                let contractQueryTx2 = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("eligibleWithdrawals", new ContractFunctionParameters()
                        .addAddress(account));
                let contractQuerySubmit2 = await contractQueryTx2.execute(client);
                let withdrawResult = contractQuerySubmit2.getInt256();

                setStats({
                    loading: false,
                    eligibleWithdrawals: withdrawResult.toString()
                })

            }
            catch (err) {
                console.log(err.message);
            }
        }

        if (accountId) {
            fetch()
        }
        else {
            setStats({
                eligibleWithdrawals: 0,
                loading: true
            })
        }
    }, [updater, accountId])

    return stats;
}


export const useHomeStats = (updater) => {

    const [stats, setStats] = useState({
        totalDeposits: 0,
        depositAmount: 0,
        totalHistoricalDeposits: 0,
        totalWithdrawals: 0,
        loading: true
    });


    useEffect(() => {
        const fetch = async () => {
            try {

                //Deposit Amount
                let contractQueryTx = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("depositAmount");
                let contractQuerySubmit = await contractQueryTx.execute(client);
                let depositAmountResult = contractQuerySubmit.getInt256();

                let contractQueryTx1 = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("totalDeposits");
                let contractQuerySubmit1 = await contractQueryTx1.execute(client);
                let depositAmountResult1 = contractQuerySubmit1.getInt256();

                let contractQueryTx2 = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("totalHistoricalDeposits");
                let contractQuerySubmit2 = await contractQueryTx2.execute(client);
                let depositAmountResult2 = contractQuerySubmit2.getInt256();

                let contractQueryTx3 = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("totalWithdrawals");
                let contractQuerySubmit3 = await contractQueryTx3.execute(client);
                let depositAmountResult3 = contractQuerySubmit3.getInt256();



                setStats({
                    totalDeposits: depositAmountResult1.toString(),
                    depositAmount: depositAmountResult.toString(),
                    totalHistoricalDeposits: depositAmountResult2.toString(),
                    totalWithdrawals: depositAmountResult3.toString(),
                    loading: false
                })

            }
            catch (err) {
                console.log(err.message);
            }
        }


        fetch()

    }, [updater])

    return stats;
}


export const useOwnerStats = (updater) => {
    const { accountId } = useWalletInterface();
    const [stats, setStats] = useState({
        isOwner: true,
        isSet : true
    });


    useEffect(() => {
        const fetch = async () => {
            try {
                let account;
                let checkAddrss = ethers.utils.isAddress(accountId.toString());
                if (checkAddrss) {
                    account = accountId.toString();
                } else {
                    account = ContractId.fromString(
                        accountId.toString()
                    ).toSolidityAddress()
                }
                //Deposit Amount
                let contractQueryTx = new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction("owner");
                let contractQuerySubmit = await contractQueryTx.execute(client);
                let depositAmountResult = contractQuerySubmit.getAddress();

                setStats({
                    isOwner: account.toLowerCase() === depositAmountResult.toString().toLowerCase() ? true : false,
                    isSet : true
                })

            }
            catch (err) {
                console.log(err.message);
            }
        }

        if (accountId) {
            fetch()
        }
        else {
            setStats({
                isOwner: true,
                isSet : true
            })
        }

    }, [updater, accountId])

    return stats;
}


