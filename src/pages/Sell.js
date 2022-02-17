import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import Caver from "caver-js";
import axios from "axios";

import ST_ADDRESS from "../contractInfo/STCONTRACT/ADDRESS.json";
import TS_ADDRESS from "../contractInfo/TSCONTRACT/ADDRESS.json";
import TS_ABI from "../contractInfo/TSCONTRACT/ABI.json";
import ST_ABI from "../contractInfo/STCONTRACT/ABI.json";

const Sell = () => {
  const caver = new Caver(window.klaytn);
  const STCONTRACT = new caver.klay.Contract(ST_ABI, ST_ADDRESS);
  const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);

  const [sid, setSid] = useState("");
  const [price, setPrice] = useState(0);

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
    axios
      .post("http://localhost:5000/fee-delegated", {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
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

    axios
      .post("http://localhost:5000/fee-delegated", {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
  };
  const sellNFT = async () => {
    const _sid = parseInt(sid, 10);
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: TS_ADDRESS,
        data: TSCONTRACT.methods
          .setForSale(_sid, caver.utils.toPeb(price, "KLAY"))
          .encodeABI(),
        gas: "500000",
        value: caver.utils.toPeb("0", "KLAY"),
      });

    axios
      .post("http://localhost:5000/fee-delegated", {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
  };
  return (
    <>
      <TextField
        id="sid"
        variant="outlined"
        label="학번"
        onChange={(e) => setSid(e.target.value)}
      />
      <TextField
        id="price"
        variant="outlined"
        label="가격(KLAY)"
        onChange={(e) => setPrice(e.target.value)}
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
