// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract SkkrypToken is ERC721Full {

    struct skkryptoken {
        string name;
        uint8 num; 
        uint256 studentID;
        string position;
        string duration;
        string ipfsURL; 
        string dateCreated;
    }
    
    mapping (uint256 => uint256) studentIDCreated; // 이미지 url하나 당 하나의 nft가 발행되어야 하기 때문에 매핑을 설정해줌.
    mapping (uint256 => skkryptoken) skkryptokens; // nft id와 각각의 skkryptokens들을 매핑시켜줌

    constructor(string memory name ,string memory symbol)
        ERC721Full(name, symbol)
        public
        {}

    function mintSToken(
        string memory name,
        uint8 num,
        uint256 studentID,
        string memory position,
        string memory duration,
        string memory ipfsURL,
        string memory dateCreated
    )public {
        require(studentIDCreated[studentID]==0, "Already Created");
        totalSupply().add(1);
        skkryptokens[studentID] = skkryptoken(name, num, studentID, position, duration, ipfsURL, dateCreated);
        studentIDCreated[studentID]=studentID;

        _mint(msg.sender, studentID);
        _setTokenURI(studentID, ipfsURL);
    }

    function getST(uint256 _studentId) public view returns( // 학번이 들어가면 get하도록
        string memory,
        uint8,
        uint256,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        return (
            skkryptokens[_studentId].name,
            skkryptokens[_studentId].num,
            skkryptokens[_studentId].studentID,
            skkryptokens[_studentId].position,
            skkryptokens[_studentId].duration,
            skkryptokens[_studentId].ipfsURL,
            skkryptokens[_studentId].dateCreated
        );
    }

    function isTokenAlreadyCreated(uint256 _studentId) public view returns (bool){
        return studentIDCreated[_studentId] != 0 ?true:false;
    }
}