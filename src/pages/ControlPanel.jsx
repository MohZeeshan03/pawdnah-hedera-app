import React, { useState } from "react"
import { contractId } from "../config/constants";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import {
     ContractId
} from '@hashgraph/sdk';
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { toast } from "react-toastify";
import { ethers } from "ethers";


export default function ControlPanel() {
     const { walletInterface } = useWalletInterface();
     const [oaddress,setOaddress] = useState('');
     const [caddress,setCaddress] = useState('');
     const [amount,setAmount] = useState(0);

     const handlePaused = async () => {
          try{
               let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "pause" , 5000000)

               if (!txId2) {
                    toast.error('Transaction Failed');
                    return false;
               }
          }
          catch(error){
               toast.error(error.reason ? error.reason : error.message);
          }
     }

     const handleUnPaused = async () => {
          try{
               let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "unpause", 5000000);

               if (!txId2) {
                    toast.error('Transaction Failed');
                    return false;
               }
          }
          catch(error){
               toast.error(error.reason ? error.reason : error.message);
          }
     }

     const handleTransferOwner = async () => {
          try{
               let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "transferOwnership" , new ContractFunctionParameterBuilder().addParam({ type: "address", name: "newOwner", value: oaddress }), 5000000);

               if (!txId2) {
                    toast.error('Transaction Failed');
                    return false;
               }
          }
          catch(error){
               toast.error(error.reason ? error.reason : error.message);
          }
     }

     const handleChangeWallet = async () => {
          try{
               let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "changeMaintenanceWallet" , new ContractFunctionParameterBuilder().addParam({ type: "address", name: "newMaintenanceWallet", value: caddress }), 5000000);

               if (!txId2) {
                    toast.error('Transaction Failed');
                    return false;
               }
          }
          catch(error){
               toast.error(error.reason ? error.reason : error.message);
          }
     }

     const handleChangeDepositAmount = async () => {
          try{
               let t_amount = ethers.utils.parseUnits(parseFloat(amount).toString() , 6);
               let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "setDepositAmount" , new ContractFunctionParameterBuilder().addParam({ type: "uint256", name: "_newAmount", value: t_amount.toString() }), 5000000);

               if (!txId2) {
                    toast.error('Transaction Failed');
                    return false;
               }
          }
          catch(error){
               toast.error(error.reason ? error.reason : error.message);
          }
     }

     return (
          <section className="sl-container flex flex-col space-y-4 font-medium mt-10">
               <button type="button" onClick={() => handlePaused()} className="w-fit  bg-blue-500 text-white py-2 md:px-9 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 hover:text-white sl-animated-lg">
                    Pause
               </button>
               <button type="button" onClick={() => handleUnPaused()} className="w-fit  bg-blue-500 text-white py-2 md:px-9 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 hover:text-white sl-animated-lg">Unpause</button>
               <button type="button" className="w-fit  bg-blue-500 text-white py-2 md:px-9 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 hover:text-white sl-animated-lg">Revert Function</button>
               
               <input type="text" placeholder="0xa8c1bc6aecaf86cac331b595bee65d0985927564" class="md:text-4xl sm:text-3xl text-2xl pt-1 border w-50 placeholder:text-gray-400" value={oaddress} onChange={(e)=> setOaddress(e.target.value)} />
               <button type="button" onClick={() => handleTransferOwner()} className="w-fit  bg-blue-500 text-white py-2 md:px-9 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 hover:text-white sl-animated-lg">Transfer Ownership</button>
               
               <input type="text" placeholder="0xa8c1bc6aecaf86cac331b595bee65d0985927564" class="md:text-4xl sm:text-3xl text-2xl pt-1 border w-50 placeholder:text-gray-400" value={caddress} onChange={(e)=> setCaddress(e.target.value)}  />
               <button type="button" onClick={() => handleChangeWallet()} className="w-fit  bg-blue-500 text-white py-2 md:px-9 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 hover:text-white sl-animated-lg">Change Wallet Address</button>
               
               
               <input type="text" placeholder="0.0" class="md:text-4xl sm:text-3xl text-2xl pt-1 border w-50 placeholder:text-gray-400"  value={amount} onChange={(e)=> setAmount(e.target.value)} />
               <button type="button" onClick={() => handleChangeDepositAmount()} className="w-fit  bg-blue-500 text-white py-2 md:px-9 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 hover:text-white sl-animated-lg">Deposited Amount</button>
          </section>
     )
}
