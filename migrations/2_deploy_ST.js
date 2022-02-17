const STCONTRACT = artifacts.require("SkkrypToken");
const fs = require("fs");

module.exports = function (deployer) {
  let name = "Skkryptoken";
  let symbol = "ST";

  deployer.deploy(STCONTRACT, name, symbol).then(() => {
    if (STCONTRACT._json) {
      fs.writeFile(
        "./src/contractInfo/STCONTRACT/ABI.json",
        JSON.stringify(STCONTRACT._json.abi),
        (err) => {
          if (err) throw err;
          console.log("파일에 ABI 입력 성공");
        }
      );
    }

    fs.writeFile(
      "./src/contractInfo/STCONTRACT/ADDRESS.json",
      JSON.stringify(STCONTRACT.address),
      (err) => {
        if (err) throw err;
        console.log("파일에 주소 입력 성공");
      }
    );
  });
};
