import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import Caver from 'caver-js';
import GT_ADDRESS from '../contractInfo/GTCONTRACT/ADDRESS.json';
import GT_ABI from '../contractInfo/GTCONTRACT/ABI.json';

const Search = () => {
  const caver = new Caver(window.klaytn);
  const GTCONTRACT = new caver.klay.Contract(GT_ABI, GT_ADDRESS);

  const [sid, setSid] = useState();
  const search = async () => {
    let res1 = await GTCONTRACT.methods.getST(sid).call();
    //res1 은 배열 형식으로 res[0] 같이 접근 가능합니다.
    console.log(res1);
  };

  const alreadyCreated = async () => {
    let res1 = await GTCONTRACT.methods.isTokenAlreadyCreated(sid).call();
    console.log(res1);
  };

  return (
    <>
      <TextField id="sid" label="학번" variant="outlined" onChange={(e) => setSid(e.target.value)} />
      <Button onClick={search}>내 학번으로 NFT정보보기</Button>
      <Button onClick={alreadyCreated}>내 학번으로 NFT 만들어졌는지 보기</Button>
    </>
  );
};

export default Search;
