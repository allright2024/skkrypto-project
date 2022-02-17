import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import Caver from "caver-js";
import TS_ABI from "../contractInfo/TSCONTRACT/ABI.json";
import TS_ADDRESS from "../contractInfo/TSCONTRACT/ADDRESS.json";

const Purchase = () => {
  const caver = new Caver(window.klaytn);
  const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);
  const feePayer = caver.klay.accounts.wallet.add(
    "0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff"
  );
  const [sid, setSid] = useState();
  const asd = async () => {
    let res1 = await TSCONTRACT.methods.getAddress().call();
    console.log(res1);
  };

  const purchase = async () => {
    const _sid = parseInt(sid, 10);
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: TS_ADDRESS,
        data: TSCONTRACT.methods.purchaseToken(_sid).encodeABI(),
        gas: "500000",
        value: caver.utils.toPeb("1.5", "KLAY"),
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
  const approveUsing = async () => {
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: TS_ADDRESS,
        data: TSCONTRACT.methods
          .approveUsing(caver.utils.toPeb("1.1", "KLAY"))
          .encodeABI(),
        gas: "500000",
        value: caver.utils.toPeb("1", "KLAY"),
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
  return (
    <>
      <TextField
        id="sid"
        label="학번"
        variant="outlined"
        onChange={(e) => setSid(e.target.value)}
      />
      <br />
      <Button onClick={asd}>잔액 확인하기</Button>
      <br />
      <Button onClick={() => purchase(sid)}> 토큰 구매하기 </Button>
      <br />
      <Button onClick={approveUsing}>컨트랙트에 ERC20토큰 거래 허가하기</Button>
    </>
  );
};

export default Purchase;
