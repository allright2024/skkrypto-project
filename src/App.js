import Caver from "caver-js";
import { Link } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MakeNFT from "./pages/MakeNFT";
import Search from "./pages/Search";
import Sell from "./pages/Sell";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <>
      <Link href="/">kaikas 로그인하기</Link>
      <br />
      <br />
      <Link href="/makeNFT">나만의 NFT만들기</Link>
      <br />
      <br />
      <Link href="/search">내 NFT 확인하기</Link>
      <br />
      <br />
      <Link href="/sell">내 NFT팔기</Link>
      <br />
      <br />
      <Link href="/purchase">NFT custom ERC20으로 사기</Link>
      <br />
      <br />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="makeNFT" element={<MakeNFT />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="sell" element={<Sell />}></Route>
          <Route path="purchase" element={<Purchase />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
