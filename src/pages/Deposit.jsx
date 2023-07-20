import ethIcon from "../assets/img/eth.png";
import { TOKEN_DECIMALS, contractId, formatPrice, tokenId } from "../config/constants";
import { useCommonStats } from "../stats/useCommon";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import {
     ContractId
} from '@hashgraph/sdk';

import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { useState } from "react";
import { toast } from "react-toastify";
import Animation from "../components/Animation";

export default function Deposit() {
     const [updater,setUpdater] = useState(1)
     const stats = useCommonStats(updater);
     const { walletInterface,accountId } = useWalletInterface();

     

     const handleAssociate = async () => {
          try{
               if(accountId){
                    if(parseFloat(stats.depositAmount) > parseFloat(stats.allowance)){
                         const txId = await walletInterface.getTokenApproval(tokenId, accountId, contractId, '100000000000000000000000');
                         console.log(txId);
                         if(!txId){
                              toast.error('Transaction Failed');
                              return false;  
                         }
                    }

                         
                    let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "deposit", new ContractFunctionParameterBuilder().addParam({ type: "uint256", name: "amount", value: stats.depositAmount.toString() }), 5000000);
                    
                    if(!txId2){
                         toast.error('Transaction Failed');
                         return false;  
                    }
                    
                    setUpdater(Math.random())
               }
               else{
                    toast.error('Please connect wallet')
               }
          }
          catch(err){
               console.log(err.message);
          }
     }

     // const handleDeposit = async () => {
     //      try{
     //           let t_amount = ethers.utils.parseUnits(parseFloat(amount).toString() , 6);
     //           const txId = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "deposit", new ContractFunctionParameterBuilder().addParam({ type: "uint256", name: "amount", value: t_amount.toString() }), 5000000);
     //      }
     //      catch(err){
     //           console.log(err.message);
     //      }
     // }

     // const handleApprove = async () => {
     //      try{
     //           const txId = await walletInterface.getTokenApproval(tokenId, accountId, contractId, '100000000000000000000000');
     //           // const txId = await walletInterface.executeContractFunction(TokenId.fromString(tokenId), "approve", new ContractFunctionParameterBuilder().addParam({ type: "uint256", name: "spender", value: contractAddress },{ type: "uint256", name: "amount", value: '100000000000000000000000' }), 5000000);
     //           console.log(txId)
     //      }
     //      catch(err){
     //           console.log(err.message)
     //      }
     // }

     return (
          <section className="sl-container">
               <div className="max-w-md w-full mx-auto sm:mt-20 mt-10">
                    <h2 className="md:text-3xl sm:text-2xl text-xl font-bold uppercase">Deposit</h2>
                    <h5>Your Token Balance : {stats.loading ? <Animation/> : stats.tokenBalance ? formatPrice(stats.tokenBalance) : 0 }</h5>
                    <form className="md:text-xl sm:text-lg text-base font-medium mt-2 md:space-y-6 sm:space-y-4 space-y-2">
                         <div className="relative bg-white rounded-lg border border-gray-200 px-3 py-2">
                              <label htmlFor="from" className="text-sm">Amount</label>
                              <input disabled={true} value={formatPrice(stats.depositAmount / Math.pow(10,TOKEN_DECIMALS))} type="text" placeholder="0.0" className="md:text-4xl sm:text-3xl text-2xl pt-1 placeholder:text-gray-400" />
                              <span className="absolute right-2 bottom-2 flex items-center bg-gray-100 md:text-xl sm:text-lg text-base sm:font-semibold tracking-wide sm:px-4 px-2 sm:py-2 py-1 rounded-lg"><img src={ethIcon} alt="ETH" className="sm:w-5 w-4 mr-1" /> USDC</span>
                         </div>
                         <div className="relative bg-white rounded-lg border border-gray-200 px-3 py-2">
                              <label htmlFor="to" className="text-sm">Expected Value</label>
                              <input id="to" type="text" placeholder="0.0" className="md:text-4xl sm:text-3xl text-2xl pt-1 placeholder:text-gray-400" />
                              <span className="absolute right-2 bottom-2 flex items-center bg-gray-100 md:text-xl sm:text-lg text-base sm:font-semibold tracking-wide sm:px-4 px-2 sm:py-2 py-1 rounded-lg"><img src={ethIcon} alt="ETH" className="sm:w-5 w-4 mr-1" /> USDC</span>
                         </div>
                         <button
                              variant='contained'
                              type="button"
                              disabled={stats.loading}
                              className="w-full font-medium bg-blue-500 text-white py-3 sm:px-6 px-4 rounded-lg hover:bg-blue-700 sl-animated-lg"
                              onClick={async () =>  handleAssociate()}
                         >
                              {stats.loading ? 'Loading...'  : 'Deposit'}
                         </button>
                         {/* <button
                              variant='contained'
                              type="button"
                              className="w-full font-medium bg-blue-500 text-white py-3 sm:px-6 px-4 rounded-lg hover:bg-blue-700 sl-animated-lg"
                              onClick={() => handleDeposit()}
                         >
                              Deposit
                         </button>

                         <button
                              variant='contained'
                              type="button"
                              className="w-full font-medium bg-blue-500 text-white py-3 sm:px-6 px-4 rounded-lg hover:bg-blue-700 sl-animated-lg"
                              onClick={async () => handleApprove()}
                         >
                              Approve
                         </button> */}
                    </form>
               </div>
          </section>
     )
}
