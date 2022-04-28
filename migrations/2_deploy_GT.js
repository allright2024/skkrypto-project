const YouTubeThumbnailToken = artifacts.require('./GameToken.sol');
const fs = require('fs');

module.exports = function (deployer) {
  var name = 'Youtube Thumbnail';
  var symbol = 'YTT';

  deployer.deploy(YouTubeThumbnailToken, name, symbol).then(() => {
    if (YouTubeThumbnailToken._json) {
      fs.writeFile('./src/contractInfo/GTCONTRACT/ABI.json', JSON.stringify(YouTubeThumbnailToken._json.abi), (err) => {
        if (err) throw err;
        console.log('파일에 ABI 입력 성공');
      });
    }

    fs.writeFile('./src/contractInfo/GTCONTRACT/ADDRESS.json', JSON.stringify(YouTubeThumbnailToken.address), (err) => {
      if (err) throw err;
      console.log('파일에 주소 입력 성공');
    });
  });
};
