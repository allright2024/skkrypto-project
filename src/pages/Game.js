import Unity, { UnityContext } from 'react-unity-webgl';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Caver from 'caver-js';
import GT_ADDRESS from '../contractInfo/GTCONTRACT/ADDRESS.json';
import GT_ABI from '../contractInfo/GTCONTRACT/ABI.json';
const unityContext = new UnityContext({
  loaderUrl: 'Build/withselect.loader.js',
  dataUrl: 'Build/withselect.data.unityweb',
  frameworkUrl: 'Build/withselect.framework.js.unityweb',
  codeUrl: 'Build/withselect.wasm.unityweb',
});

export default function Game() {
  const caver = new Caver(window.klaytn);
  const GTCONTRACT = new caver.klay.Contract(GT_ABI, GT_ADDRESS);

  const [kasAccount, setKasAccount] = useState(null);

  const getBalance = async (address) => {
    return await GTCONTRACT.methods.balanceOf(address).call();
  };

  const activateKaikas = async () => {
    const accounts = await window.klaytn.enable();
    setKasAccount(accounts[0]);
  };

  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    const accounts = await window.klaytn.enable();
    const account = accounts[0];
    const result = await getBalance(account);
    setBalance(result);
  }, [kasAccount]);

  const selectVirtualGuy = () => {
    unityContext.send('SkinManager', 'SelectVirtualGuy');
  };

  const selectPinkMan = () => {
    unityContext.send('SkinManager', 'SelectPinkGuy');
  };

  const selectNinjaFrog = () => {
    unityContext.send('SkinManager', 'SelectNinjaFrog');
  };

  const selectMask = () => {
    unityContext.send('SkinManager', 'SelectMaskDude');
  };

  return (
    <>
      <Button onClick={activateKaikas}>계정 인증하고 게임하기</Button>
      <span>{kasAccount}</span>
      <br />
      {balance == 0 && <div>nft를 구매하셔야 게임을 할 수 있습니다.</div>}
      {balance > 0 && <Button onClick={selectVirtualGuy}>virtual guy</Button>}
      {balance == 1 && <div>nft를 1개 더 구매하시면 pinkman으로 플레이하실 수 있습니다.</div>}
      {balance > 1 && <Button onClick={selectPinkMan}>Pink man</Button>}
      {balance == 2 && <div>nft를 1개 더 구매하시면 ninja frog로 플레이하실 수 있습니다.</div>}
      {balance > 2 && <Button onClick={selectNinjaFrog}>Ninja Frog</Button>}
      {balance == 2 && <div>nft를 1개 더 구매하시면 ninja frog로 플레이하실 수 있습니다.</div>}
      {balance > 3 && <Button onClick={selectMask}>Mask Dude</Button>}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
        {kasAccount !== null && balance > 0 && <Unity unityContext={unityContext} style={{ textAlign: 'center', width: '50%', height: '50%' }} />}
      </div>
    </>
  );
}
