pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract GameToken is ERC721Full {//openzeppelin library

  struct NFTGameToken{
    string author;
    string dateCreated;
  }

  mapping (uint256=>NFTGameToken)gameTokens;
  mapping (string => uint256) videoIdsCreated;
  
  constructor(string memory name, string memory symbol)
    ERC721Full(name, symbol)
    public 
    {}
  
  function mintGT(
    string memory _author,
    string memory _dateCreated,
    string memory _tokenURI
  )public{
    uint256 tokenId = totalSupply().add(1);
    gameTokens[tokenId] = NFTGameToken(_author, _dateCreated);

    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, _tokenURI);
  }

  function getGT(uint256 _tokenId) public view returns(string memory, string memory){
    return(gameTokens[_tokenId].author, gameTokens[_tokenId].dateCreated);
  }

}