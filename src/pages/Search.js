import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import Caver from "caver-js";
import ST_ADDRESS from "../contractInfo/STCONTRACT/ADDRESS.json";
import ST_ABI from "../contractInfo/STCONTRACT/ABI.json";

const Search = () => {
  const caver = new Caver(window.klaytn);
  const STCONTRACT = new caver.klay.Contract(ST_ABI, ST_ADDRESS);

  const [sid, setSid] = useState();
  const search = async () => {
    let res1 = await STCONTRACT.methods.getST(sid).call();
    //res1 은 배열 형식으로 res[0] 같이 접근 가능합니다.
    console.log(res1);
  };

  const alreadyCreated = async () => {
    let res1 = await STCONTRACT.methods.isTokenAlreadyCreated(sid).call();
    console.log(res1);
  };

  return (
    <>
      <TextField
        id="sid"
        label="학번"
        variant="outlined"
        onChange={(e) => setSid(e.target.value)}
      />
      <Button onClick={search}>내 학번으로 NFT정보보기</Button>
      <Button onClick={alreadyCreated}>
        내 학번으로 NFT 만들어졌는지 보기
      </Button>
    </>
  );
};

export default Search;
