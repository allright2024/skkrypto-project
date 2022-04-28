import React, { useState } from 'react';
import Caver from 'caver-js';
import { Link } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MakeNFT from './pages/MakeNFT';
import Search from './pages/Search';
import Game from './pages/Game';
import Sell from './pages/Sell';
import Purchase from './pages/Purchase';
import MySellingToken from './pages/MySellingToken';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  ['Make NFT', 'makeNFT'],
  ['SELL', 'sell'],
  ['MARKET', 'market'],
  ['GAME', 'game'],
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function App() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Link href={page[1]}>
                    <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link href={page[1]}>
                  <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page[0]}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Link href="/" style={{ textDecorationLine: 'none' }}>
                    <Avatar style={{ height: '60px', width: '60px' }}>login</Avatar>
                  </Link>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <br />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="makeNFT" element={<MakeNFT />}></Route>
          <Route path="sell" element={<Sell />}></Route>
          <Route path="market" element={<MySellingToken />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
