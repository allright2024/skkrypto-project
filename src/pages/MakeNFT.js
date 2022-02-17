import { Box, TextField, Button } from "@mui/material";
import { positions } from "@mui/system";
import { useState } from "react";
import Caver from "caver-js";
import ST_ADDRESS from "../contractInfo/STCONTRACT/ADDRESS.json";
import ST_ABI from "../contractInfo/STCONTRACT/ABI.json";

const MakeNFT = () => {
  const caver = new Caver(window.klaytn);
  const STCONTRACT = new caver.klay.Contract(ST_ABI, ST_ADDRESS);
  const feePayer = caver.klay.accounts.wallet.add(
    "0x8cafa33df8c1740720bc4815ce7c7cd61d18aaf396bb2a3da5e197f0c7b85aff"
  );
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [sid, setSid] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");
  const makeNFT = async () => {
    const _num = parseInt(num, 10);
    const _sid = parseInt(sid, 10);
    const date = new Date();
    const _date = date.toString();
    const { rawTransaction: senderRawTransaction } =
      await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: window.klaytn.selectedAddress,
        to: ST_ADDRESS,
        data: STCONTRACT.methods
          .mintSToken(name, _num, _sid, position, duration, url, _date)
          .encodeABI(),
        gas: "50000000",
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
  return (
    <>
      <TextField
        id="name"
        label="이름"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="num"
        label="기수"
        onChange={(e) => setNum(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="sid"
        label="학번"
        onChange={(e) => setSid(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="position"
        label="직무"
        onChange={(e) => setPosition(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="duration"
        label="활동 기간"
        onChange={(e) => setDuration(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="ipfsurl"
        label="url"
        onChange={(e) => setUrl(e.target.value)}
        variant="outlined"
      />
      <br />
      <Button onClick={makeNFT}>내 NFT만들기</Button>
    </>
  );
};

export default MakeNFT;
