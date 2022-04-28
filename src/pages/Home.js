import { Button, Link } from '@mui/material';
import Caver from 'caver-js';
import { useState } from 'react';
const Home = () => {
  const [kasAccount, setKasAccount] = useState();
  const activateKaikas = async () => {
    const accounts = await window.klaytn.enable();
    setKasAccount(accounts[0]);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <Button onClick={activateKaikas}>Kaikas 로그인하기</Button>
        <div>{kasAccount}</div>
      </div>
    </>
  );
};

export default Home;
