import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
import styles from "../styles/Home.module.css";

import {
  AnchorMode,
  standardPrincipalCV,
  callReadOnlyFunction,
  makeStandardSTXPostCondition,
  FungibleConditionCode
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ContractCallGm = () => {
  const [ tokenBalance, setTokenBalance ] = useState(0);
  const getTokenBalance = useCallback(async () => {

    if (userSession.isUserSignedIn()) {
      const userAddress = userSession.loadUserData().profile.stxAddress.testnet
      const options = {
          contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          contractName: "gm",
          functionName: "get-token-balance",
          network: new StacksMocknet(),
          functionArgs: [],
          senderAddress: userAddress
      };

      const result = await callReadOnlyFunction(options);
      console.log(result.value);
      setTokenBalance(parseInt(result.value));
      
    }
  });

  
  // if (!userSession.isUserSignedIn()) {
  //   return null;
  // }

  return (
       <div >
            
            {/* <div>Token Balance = {tokenBalance}</div> */}
            <div ><button className="Vote" onClick={() => getTokenBalance()} >
           GetTokenBalance
          </button> Token Balance = {tokenBalance}  </div>
          
        </div>  
  
  )
};

export default ContractCallGm;