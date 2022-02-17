import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import Caver from "caver-js";
import TS_ABI from "../contractInfo/TSCONTRACT/ABI.json";
import TS_ADDRESS from "../contractInfo/TSCONTRACT/ADDRESS.json";
import axios from "axios";

const Purchase = () => {
  const caver = new Caver(window.klaytn);
  const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);
  const [price, setPrice] = useState(0);
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
        value: caver.utils.toPeb(price, "KLAY"),
      });

    axios
      .post("http://localhost:5000/fee-delegated", {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
  };
  // const approveUsing = async () => {
  //   const { rawTransaction: senderRawTransaction } =
  //     await caver.klay.signTransaction({
  //       type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
  //       from: window.klaytn.selectedAddress,
  //       to: TS_ADDRESS,
  //       data: TSCONTRACT.methods
  //         .approveUsing(caver.utils.toPeb("1.1", "KLAY"))
  //         .encodeABI(),
  //       gas: "500000",
  //       value: caver.utils.toPeb("1", "KLAY"),
  //     });

  //   axios
  //     .post("http://localhost:5000/fee-delegated", {
  //       transaction: senderRawTransaction,
  //     })
  //     .then((res) => console.log(res.data));
  // };
  return (
    <>
      <TextField
        id="sid"
        label="학번"
        variant="outlined"
        onChange={(e) => setSid(e.target.value)}
      />
      <br />
      <TextField
        id="price"
        variant="outlined"
        label="가격(KLAY)"
        onChange={(e) => setPrice(e.target.value)}
      />
      {/* <Button onClick={asd}>잔액 확인하기</Button> */}
      <br />
      <Button onClick={() => purchase(sid)}> 토큰 구매하기 </Button>
      <br />
      {/* <Button onClick={approveUsing}>컨트랙트에 ERC20토큰 거래 허가하기</Button> */}
    </>
  );
};

export default Purchase;
