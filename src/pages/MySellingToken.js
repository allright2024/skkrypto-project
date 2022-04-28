import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import Caver from 'caver-js';
import GT_ADDRESS from '../contractInfo/GTCONTRACT/ADDRESS.json';
import GT_ABI from '../contractInfo/GTCONTRACT/ABI.json';
import TS_ADDRESS from '../contractInfo/TSCONTRACT/ADDRESS.json';
import TS_ABI from '../contractInfo/TSCONTRACT/ABI.json';
import ShopIcon from '@mui/icons-material/Shop';
import axios from 'axios';

const MySellingToken = () => {
  const caver = new Caver(window.klaytn);
  const GTCONTRACT = new caver.klay.Contract(GT_ABI, GT_ADDRESS);
  const TSCONTRACT = new caver.klay.Contract(TS_ABI, TS_ADDRESS);
  const [numOfTokens, setNumOfTokens] = useState(0);
  const [myToken, setMyToken] = useState([]);
  const [allTokens, setAllTokens] = useState([]);

  useEffect(async () => {
    const accounts = await window.klaytn.enable();
    const account = accounts[0];

    const balance = await getBalance(account);
    // const balance = 1;
    setNumOfTokens(balance);
    await checkMyTokens(balance);
    await checkAllTokens();
  }, []);

  const getTokenOfOwnerById = async (address, index) => {
    return await GTCONTRACT.methods.tokenOfOwnerByIndex(address, index).call();
  };

  const getBalance = async (address) => {
    return await GTCONTRACT.methods.balanceOf(address).call();
  };

  const getTokenUri = async (tokenId) => {
    return await GTCONTRACT.methods.tokenURI(tokenId).call();
  };

  const getGameToken = async (tokenId) => {
    return await GTCONTRACT.methods.getGT(tokenId).call();
  };

  const getTokenPrice = async (tokenId) => {
    return await TSCONTRACT.methods.tokenPrice(tokenId).call();
  };

  const getTokenById = async (index) => {
    return await GTCONTRACT.methods.tokenByIndex(index).call();
  };

  const getOwnerOf = async (tokenId) => {
    return await GTCONTRACT.methods.ownerOf(tokenId).call();
  };

  const isApproved = async (owner) => {
    const result = await GTCONTRACT.methods.isApprovedForAll(owner, TS_ADDRESS).call();
    console.log(result);
    return result;
  };

  const renderMyTokens = () => {
    // console.log(myToken.length);
    // console.log(myToken[0]);
    return (
      <>
        {myToken.map((el, i) => (
          <Card sx={{ maxWidth: 345 }} key={i}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: '#000' }}>me</Avatar>} title={`Game Token ${el?.tokenId}`} subheader={`createdAt : ${el?.gt[1]}`} />
            <CardMedia component="img" height="194" image={el?.tokenUri} alt={el?.tokenUri} />
            <CardContent>
              <Typography color="text.primary">
                author: {el?.gt[0]}
                <br />
                {el?.price == 0 ? 'Not for sale' : 'price:' + el?.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  const renderAllTokens = () => {
    return (
      <>
        {allTokens?.map((el, i) => (
          <Card sx={{ maxWidth: 345 }} key={i}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: '#000' }}>{el.tokenId}</Avatar>}
              title={`Game Token ${el?.tokenId}`}
              subheader={`createdAt : ${el?.gt[1]}`}
              action={
                el?.owner.toLowerCase() !== window.klaytn.selectedAddress?.toLowerCase() && (
                  <IconButton onClick={() => purchase(el?.tokenId, el?.price / caver.utils.toPeb(1, 'KLAY'))}>
                    <ShopIcon />
                  </IconButton>
                )
              }
            />
            <CardMedia component="img" height="194" image={el?.tokenUri} alt={el.tokenUri} />
            <CardContent>
              <Typography color="text.primary">
                author: {el?.gt[0]}
                <br />
                owner: {el?.owner}
                <br />
                price: {el?.price / caver.utils.toPeb(1, 'KLAY')}
                {' klay'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  const checkMyTokens = async (balance) => {
    let _tokens = [];
    const arr = Array.from({ length: balance }, (v, i) => i);
    for await (let i of arr) {
      const tokenId = await getTokenOfOwnerById(window.klaytn.selectedAddress, i);
      const tokenUri = await getTokenUri(tokenId);
      const gt = await getGameToken(tokenId);
      const price = await getTokenPrice(tokenId);
      let _instance = { tokenId, tokenUri, gt, price };
      _tokens.push(_instance);
    }
    setMyToken(_tokens);
  };

  const checkAllTokens = async () => {
    let _allTokens = [];
    let totalSupply = parseInt(await GTCONTRACT.methods.totalSupply().call());
    const arr = Array.from({ length: totalSupply }, (v, i) => i);
    for await (let i of arr) {
      const tokenId = await getTokenById(i);
      const gt = await getGameToken(tokenId);
      const tokenUri = await getTokenUri(tokenId);
      const price = await getTokenPrice(tokenId);
      const owner = await getOwnerOf(tokenId);
      const result = await isApproved(owner);
      if (price == 0) {
        continue;
      }
      if (!result) {
        continue;
      }
      let _instance = { tokenId, gt, tokenUri, price, owner };
      _allTokens.push(_instance);
    }
    setAllTokens(_allTokens);
  };

  const purchase = async (tokenId, tokenPrice) => {
    const { rawTransaction: senderRawTransaction } = await caver.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: TS_ADDRESS,
      data: TSCONTRACT.methods.purchaseToken(tokenId).encodeABI(),
      gas: '500000',
      value: caver.utils.toPeb(tokenPrice, 'KLAY'),
    });

    axios
      .post('http://localhost:5000/fee-delegated', {
        transaction: senderRawTransaction,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <div>나의 GameToken 개수 : {numOfTokens}</div>
      <br />
      <div>나의 GameToken</div>
      {renderMyTokens()}
      <div>판매 중인 GameToken</div>
      {renderAllTokens()}
    </>
  );
};

export default MySellingToken;
