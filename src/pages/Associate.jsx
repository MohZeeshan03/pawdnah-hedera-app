import React from 'react';
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import {
    TokenId,
} from '@hashgraph/sdk';
import { toast } from 'react-toastify';
import { tokenId } from "../config/constants";

export default function Associate() {
    const { walletInterface,accountId } = useWalletInterface();
    const handleAssociate = async () => {
        try{
            if(accountId){
                await walletInterface.associateToken(TokenId.fromString(tokenId),5000000);
            }
            else{
                toast.error('Please connect wallet')
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
             
  return (
    <section className="sl-container">
               <div className="max-w-md w-full mx-auto sm:mt-20 mt-10">
                    <h2 className="md:text-3xl sm:text-2xl text-xl font-bold uppercase text-center">Associate USDC</h2>
                    <h5 className='text-center'>Associate USDC and start deposit </h5>
                    <form className="md:text-xl sm:text-lg text-base font-medium mt-10 md:space-y-6 sm:space-y-4 space-y-2">
                         <button
                              variant='contained'
                              type="button"
                              className="w-full font-medium bg-blue-500 text-white py-3 sm:px-6 px-4 rounded-lg hover:bg-blue-700 sl-animated-lg"
                              onClick={async () =>  handleAssociate()}
                         >
                            Associate
                         </button>
                    </form>
               </div>
          </section>
  )
}
