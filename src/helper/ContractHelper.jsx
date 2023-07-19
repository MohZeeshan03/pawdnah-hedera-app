import { appConfig } from "../config";
import { ethers } from "ethers";
import {  tokenAddress , ABI } from "../config/constants";

const currentNetworkConfig = appConfig.networks.testnet;

  export const getContract = () =>{
    const provider = new ethers.providers.JsonRpcProvider({
      url: currentNetworkConfig.jsonRpcUrl,
      headers: {
          'Access-Control-Allow-Origin': '*',
      }
    });

      return new ethers.Contract(
        tokenAddress,
        ABI,
        provider
      );
  }