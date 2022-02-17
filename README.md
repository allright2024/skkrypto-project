# 구조
### 크게 3개로 되어있습니다.
##### 1. solidity 코드
##### 2. frontend 코드
##### 3. backend 코드

### 블록체인 네트워크
클레이튼으로 했고, 클레이튼에서 제공하는 대납 트랜잭션 기능을 이용했습니다.(backend를 만든 이유)

### 각 부분의 역할
##### 1. solidity 코드
solidity코드는 총 3개의 스마트 컨트랙트(Migrations.sol 제외)를 배포합니다.
contracts 폴더에는 SkkrypToken.sol, SkkryptoERC20token.sol, TokenSales.sol 파일이 있습니다.
SkkrypToken.sol은 ERC721을 가져와서 Skkrypto NFT를 만드는 역할을 합니다. 
SkkryptoERC20token.sol은 Skkrypto ERC20 토큰을 mint하는 역할을 합니다.
TokenSales.sol은 skkrypto NFT를 거래할 수 있도록 합니다.

##### 2. frontend 코드 
총 5개의 페이지로 구성되어있습니다.
1. 로그인 페이지 : kaikas에 로그인을 합니다.
2. NFT 등록 페이지 : 먼저 ipfs에 저장하고 싶은 내용들을 적습니다.(이름, 학번, 증명서 사진 URL). 그 다음에 `ipfs에 업로드하기` 버튼을 눌러 ipfs에 저장합니다. 그러면 console 창에 ipfs 주소가 나오는데 그거를 복사해서 `url(문자열)` 칸에 복사해줍니다. 그리고 나머지 정보들도 채워서 넣어줍니다. 마지막으로 `내 NFT만들기` 버튼을 눌러 NFT를 만들어 줍니다.(증명서 사진 URL은 블록체인에 등록되지 않습니다. ipfs 주소만들때만 필요한 정보입니다.)
3. 내 NFT 찾기 페이지 : 내 학번으로 만들어진 NFT를 확인하는 페이지 입니다.
4. NFT 판매 페이지 : 내가 소유하고 있는 NFT를 판매하는 페이지입니다. 먼저 학번(NFT ID)을 입력하고 가격을 설정해 줍니다. 그 다음에 `토큰 판매 승인하기` 버튼을 눌러줍니다.(TokenSales 컨트랙트에 판매를 허가하는 과정) 마지막으로 `토큰 판매하기` 버튼을 눌러 판매를 마칩니다.
5. NFT 구매 페이지 : 계정을 바꿔줍니다. 구매 버튼을 눌러 NFT를 구매해줍니다. 끝

##### ! ERC20토큰에 대해서는 따로 프론트엔드에서 다루지 않았는데 사실 NFT 구매를 직접 만든 ERC20 토큰으로 하려고 했었는데, 잘 안되서 일단 놔뒀습니다. 내가 발행한 ERC20 토큰을 보려면 ./src/contractInfo/ERC20/ADDRESS.json의 내용을 복사하여 metamask나 kaikas에 토큰 추가하기를 눌러서 확인해주시면 됩니다.(truffle을 사용했기 때문에 migrate를 한 계정에 ERC20토큰이 추가되어있는데 그 계정에 대한 정보는 truffle-config.js에 있고(privateKey) 그 정보로 자신의 지갑에 추가해주시면 됩니다.)

##### 3. backend 코드
backend는 단순히 sign한 transaction을 받아서 가스비만 지불하는 역할을 합니다. frontend에 구현을 하면 feePayer의 privateKey가 유출될 위험이 있기때문에 feePayer에 대한 코드는 backend로 뺐습니다.

# 사용 방법 
#### 1. 먼저 `명령어 파일`에 있는 명령어를 실행 시켜 줍니다.(truffle migrate --compile-all --reset --network klaytn) 그럼 자동으로 ./src/contractInfo/ERC20, ./src/contractInfo/STCONTRACT ./src/contractInfo/TSCONTRACT에 ABI ADDRESS가 입력됩니다.
#### 2. 백엔드 코드(https://github.com/gnncjegrgr/skkrypto-backend)를 받아서 npm install(1번만 해주면 됩니다.) 이후에 npm start를 해줍니다.
#### 3. 프론트 엔드 코드를 받아서 npm install 이후에 npm start를 해줍니다. 

##### 주의! : react webpack과 caver-js가 좀 충돌이 잘 나기도 해서 만약 npm install 과정이 매끄럽지 않다면 알려주시면 도와드리겠습니다.(node : 16.13.1, web3.js : 1.2.1, solidity: 0.5.0, truffle: 5.0.31, npm : 8.1.2)
