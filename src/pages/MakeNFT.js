import { Box, TextField, Button } from "@mui/material";
import { positions } from "@mui/system";
import { useState } from "react";
import Caver from "caver-js";
import ST_ADDRESS from "../contractInfo/STCONTRACT/ADDRESS.json";
import ST_ABI from "../contractInfo/STCONTRACT/ABI.json";
import axios from "axios";
import ipfsClient from "ipfs-http-client";

const MakeNFT = () => {
  const caver = new Caver(window.klaytn);
  const STCONTRACT = new caver.klay.Contract(ST_ABI, ST_ADDRESS);
  const ipfs = ipfsClient({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https",
  });

  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [sid, setSid] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");
  const [ipfscontent, setIpfscontent] = useState("");
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
    axios
      .post("http://localhost:5000/fee-delegated", {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
  };

  const makeIPFSURL = async () => {
    const res = await ipfs.add(
      Buffer.from(
        JSON.stringify({
          title: "skkrypto",
          type: "object",
          properties: {
            name: {
              type: "string",
              description: name,
            },
            sid: {
              type: "string",
              description: sid,
            },
            url: {
              type: "url",
              description: ipfscontent,
            },
          },
        })
      )
    );
    console.log("https://ipfs.infura.io/ipfs/" + res[0].hash);
  };
  return (
    <>
      <TextField
        id="name"
        label="이름(문자열)"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="sid"
        label="학번(숫자)"
        onChange={(e) => setSid(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="ipfs"
        label="ipfs에 올릴 정보(문자열)"
        onChange={(e) => setIpfscontent(e.target.value)}
        variant="outlined"
      />
      <br />
      <Button onClick={makeIPFSURL}>ipfs에 업로드하기</Button>
      <br />
      <br />

      <TextField
        id="num"
        label="기수(숫자)"
        onChange={(e) => setNum(e.target.value)}
        variant="outlined"
      />
      <br />

      <TextField
        id="position"
        label="직무(문자열)"
        onChange={(e) => setPosition(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="duration"
        label="활동 기간(문자열)"
        onChange={(e) => setDuration(e.target.value)}
        variant="outlined"
      />
      <br />
      <TextField
        id="ipfsurl"
        label="url(문자열)"
        onChange={(e) => setUrl(e.target.value)}
        variant="outlined"
      />
      <br />
      <Button onClick={makeNFT}>내 NFT만들기</Button>
      <br />
    </>
  );
};

export default MakeNFT;
