import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import Caver from "caver-js";

import ST_ADDRESS from "../contractInfo/STCONTRACT/ADDRESS.json";
import TS_ADDRESS from "../contractInfo/TSCONTRACT/ADDRESS.json";
import TS_ABI from "../contractInfo/TSCONTRACT/ABI.json";
import ST_ABI from "../contractInfo/STCONTRACT/ABI.json";

const Sell = () => {
  const caver = new Caver(window.klaytn);
  const STCONTRACT = new caver.klay.Contract(ST_ABI, ST_ADDRESS);
  const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);
  const feePayer = caver.klay.accounts.wallet.add(
    //클레이튼 개인키로 추가해줍니다.
    "0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff"
  );
  const [sid, setSid] = useState("");

  const approve = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: ST_ADDRESS,
        data: STCONTRACT.methods
          .setApprovalForAll(TS_ADDRESS, true)
          .encodeABI(),
        gas: "5000000",
        value: caver.utils.toPeb("0", "KLAY"),
      });
    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then((receipt) => {
        console.log(receipt.transactionHash);
      });
  };
  const cancelApprove = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: ST_ADDRESS,
        data: STCONTRACT.methods
          .setApprovalForAll(TS_ADDRESS, false)
          .encodeABI(),
        gas: "5000000",
        value: caver.utils.toPeb("0", "KLAY"),
      });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then((receipt) => {
        console.log(receipt.transactionHash);
      });
  };
  const sellNFT = async () => {
    const _sid = parseInt(sid, 10);
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: TS_ADDRESS,
        data: TSCONTRACT.methods
          .setForSale(_sid, caver.utils.toPeb("1", "KLAY"))
          .encodeABI(),
        gas: "500000",
        value: caver.utils.toPeb("0", "KLAY"),
      });

    caver.klay
      .sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(function (receipt) {
        if (receipt.transactionHash) {
          console.log(receipt.transactionHash);
        }
      });
  };
  return (
    <>
      <TextField
        id="sid"
        variant="outlined"
        label="학번"
        onChange={(e) => setSid(e.target.value)}
      />
      <br />
      <Button onClick={() => approve(sid)}>토큰 판매 승인하기</Button>
      <br />
      <Button onClick={() => cancelApprove(sid)}>
        토큰 판매 승인 취소하기
      </Button>
      <br />
      <Button onClick={() => sellNFT(sid)}>토큰 판매하기</Button>
    </>
  );
};

export default Sell;
