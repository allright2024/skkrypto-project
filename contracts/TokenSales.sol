// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

import "./SkkryptoERC20token.sol";

contract TokenSales {
    ERC721Full public nftAddress;

    IERC20 ERC20Address;

    mapping (uint32=>uint256) public tokenPrice; //tokenId(studentId)를 입력하면 얼마의 가격인지 알려주는 매핑

    constructor(address _721TokenAddress, address _20TokenAddress) public {
        nftAddress = ERC721Full(_721TokenAddress);
        ERC20Address = IERC20(_20TokenAddress);
    }

    function setForSale(uint32 _tokenId, uint256 _price) public {
        address tokenOwner = nftAddress.ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "not token owner");
        require(_price>0, "msg.value is lower than price");
        require(nftAddress.isApprovedForAll(tokenOwner, address(this)), "this contract not permitted.");
        tokenPrice[_tokenId] = _price;
    }

    // function purchaseToken(uint32 _tokenId) public payable {
    //     uint256 price = tokenPrice[_tokenId];
    //     address tokenSeller = nftAddress.ownerOf(_tokenId);
    //     require(msg.value >= price, "msg.value<=price");
    //     require(msg.sender!=tokenSeller, "caller is seller");

    //     address payable payableTokenSeller = address(uint160(tokenSeller));
    //     // payable 타입으로 변환
    //     // payableTokenSeller.transfer(msg.value);
    //     ERC20Address.transferFrom(msg.sender, tokenSeller, msg.value);
    //     nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);
    //     tokenPrice[_tokenId]=0;

    // }
    function purchaseToken(uint32 _tokenId) public payable {
        uint256 price = tokenPrice[_tokenId];
        address tokenSeller = nftAddress.ownerOf(_tokenId);
        require(msg.value >= price, "msg.value<=price");
        require(msg.sender!=tokenSeller, "caller is seller");

        address payable payableTokenSeller = address(uint160(tokenSeller));
        // payable 타입으로 변환
        payableTokenSeller.transfer(msg.value);
        nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);
        tokenPrice[_tokenId]=0;

    }

    function removeTokenOnSale(uint32 _tokenId) public {
        address tokenSeller = nftAddress.ownerOf(_tokenId);
        require(msg.sender == tokenSeller, "caller is not seller");
        tokenPrice[_tokenId] = 0;
    }

    function getAddress() public view returns(uint256){
        uint256 vari = ERC20Address.balanceOf(0xDa885688cFFBE34536482696aB9AAc93FA330596);
        return vari;
    }

    function approveUsing(uint256 value) public payable{
        ERC20Address.approve(address(this), value);
    }
}