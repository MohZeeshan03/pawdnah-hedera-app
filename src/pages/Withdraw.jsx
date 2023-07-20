import { useState } from "react";
import ethIcon from "../assets/img/eth.png";
import { TOKEN_DECIMALS, contractId } from "../config/constants";
import { useWithdrawStats } from "../stats/useCommon";
import { toast } from "react-toastify";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import {
     ContractId
} from '@hashgraph/sdk';



export default function Withdraw() {
     const [updater, setUpdater] = useState(1)
     const stats = useWithdrawStats(updater);
     const { walletInterface , accountId } = useWalletInterface();


     const handleWithdraw = async() => {
          if(accountId){
               let txId2 = await walletInterface.executeContractFunction(ContractId.fromString(contractId), "withdraw", new ContractFunctionParameterBuilder().addParam({ type: "uint256", name: "amount", value: stats.eligibleWithdrawals.toString() }), 5000000);

               if (!txId2) {
                    toast.error('Transaction Failed');
                    return false;
               }

               setUpdater(Math.random())
          }
          else{
               toast.error('Please connect wallet')
          }
     }

     return (
          <section className="sl-container">
               <div className="max-w-md w-full mx-auto sm:mt-20 mt-10">
                    <h2 className="md:text-3xl sm:text-2xl text-xl font-bold uppercase">withdraw</h2>
                    <form className="md:text-xl sm:text-lg text-base font-medium mt-2 md:space-y-6 sm:space-y-4 space-y-2">
                         <div className="relative bg-white rounded-lg border border-gray-200 px-3 py-2">
                              <label htmlFor="from" className="text-sm">Total Value</label>
                              <input id="from" type="text" disabled={true} value={stats.eligibleWithdrawals ? parseFloat(stats.eligibleWithdrawals/ Math.pow(10,TOKEN_DECIMALS)) : 0} placeholder="0.0" className="md:text-4xl sm:text-3xl text-2xl pt-1 placeholder:text-gray-400" />
                              <span className="absolute right-2 bottom-2 flex items-center bg-gray-100 md:text-xl sm:text-lg text-base sm:font-semibold tracking-wide sm:px-4 px-2 sm:py-2 py-1 rounded-lg"><img src={ethIcon} alt="ETH" className="sm:w-5 w-4 mr-1" /> USDC</span>
                         </div>
                         <button disabled={stats.loading} type="button" onClick={()=>handleWithdraw()} className="w-full font-medium bg-blue-500 text-white py-3 sm:px-6 px-4 rounded-lg hover:bg-blue-700 sl-animated-lg">
                              {stats.loading ? 'Loading...' : 'Submit' }    
                         </button>
                    </form>
               </div>
          </section>
     )
}
