const STERC20CONTRACT = artifacts.require("SkkryptoERC20token");
const fs = require("fs");

module.exports = function (deployer) {
  let name = "SkkryptoERC20";
  let symbol = "Skkrypto";
  let decimals = 18;

  deployer.deploy(STERC20CONTRACT, name, symbol, decimals).then(() => {
    if (STERC20CONTRACT._json) {
      fs.writeFile(
        "./src/contractInfo/ERC20/ABI.json",
        JSON.stringify(STERC20CONTRACT._json.abi),
        (err) => {
          if (err) throw err;
          console.log("파일에 ABI 입력 성공");
        }
      );
    }

    fs.writeFile(
      "./src/contractInfo/ERC20/ADDRESS.json",
      JSON.stringify(STERC20CONTRACT.address),
      (err) => {
        if (err) throw err;
        console.log("파일에 주소 입력 성공");
      }
    );
  });
};
