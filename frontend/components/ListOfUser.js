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
  FungibleConditionCode,
  intCV
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ListOfUser = (props) => {
  const [users, setUsers] = useState([]);
  const { doContractCall } = useConnect();
  let newArray = props.user;
  
  function sendLoan() {
    let receiverAddress = window.prompt("enter the receiver's address")
    let amount = window.prompt("enter the amount you wanted to send")
    receiverAddress = standardPrincipalCV(receiverAddress)
    amount = intCV(amount)
    


    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = 1 * 1000000;
    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "gm",
      functionName: "send-loan",
      functionArgs: [receiverAddress, amount],
      postConditions: [
        makeStandardSTXPostCondition(
          postConditionAddress,
          postConditionCode,
          postConditionAmount
        )
      ],
      onFinish: (data) => {
        console.log("onFinish:", data);
        console.log("Explorer:", `localhost:8000/txid/${data.txId}?chain=testnet`)
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  } 

  function takeLoan() {
    let Address = window.prompt("enter the receiver's address")
    let amount = window.prompt("enter the amount you wanted to send")
    Address = standardPrincipalCV(Address)
    amount = intCV(amount)

    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = 1 * 1000000;
    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "gm",
      functionName: "take-loan",
      functionArgs: [Address, amount],
      postConditions: [
        makeStandardSTXPostCondition(
          postConditionAddress,
          postConditionCode,
          postConditionAmount
        )
      ],
      onFinish: (data) => {
        console.log("onFinish:", data);
        console.log("Explorer:", `localhost:8000/txid/${data.txId}?chain=testnet`)
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  } 

  

  function renderList() {
    return newArray.map(item => (

     <>
      <h3 key={item}>{item}  </h3>
  </>
    ));
  }

  return (
    <>
    <button className="Connect" onClick={() => takeLoan()}>
        Take Loan
    </button>

    <button className="Connect" onClick={() => sendLoan('STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6', 100)}>
       sendLoan
    </button>
    {renderList()}
    </>
  );
};

export default ListOfUser;
