import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import Caver from 'caver-js';
import GT_ADDRESS from '../contractInfo/GTCONTRACT/ADDRESS.json';
import GT_ABI from '../contractInfo/GTCONTRACT/ABI.json';
import axios from 'axios';

const MakeNFT = () => {
  const caver = new Caver(window.klaytn);
  const GTCONTRACT = new caver.klay.Contract(GT_ABI, GT_ADDRESS);

  const [address, setAddress] = useState('');
  const [uri, setUri] = useState('');

  const makeNFT = async () => {
    const date = new Date();
    const _date = date.toString();
    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: GT_ADDRESS,
      data: GTCONTRACT.methods.mintGT(window.klaytn.selectedAddress, _date, uri).encodeABI(),
      gas: '50000000',
      value: caver.utils.toPeb('0', 'KLAY'),
    });
    axios
      .post('http://localhost:5000/fee-delegated', {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <>
      {/* <TextField id="name" label="만든 사람(주소)" value={address} onChange={(e) => setAddress(e.target.value)} variant="outlined" />
      <br /> */}
      <TextField id="token_uri" label="nft 사진 url" value={uri} onChange={(e) => setUri(e.target.value)} />
      <br />
      <Button onClick={makeNFT}>NFT 만들기</Button>
    </>
  );
};

export default MakeNFT;
