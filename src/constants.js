const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_beacon","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"symbol","type":"string"}],"name":"CollectionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"tokenUri","type":"string"}],"name":"TokenMinted","type":"event"},{"inputs":[],"name":"beacon","outputs":[{"internalType":"contract IBeacon","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"name":"createCollection","outputs":[{"internalType":"address","name":"collection","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"tokenUri","type":"string"}],"name":"mintToken","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wasCreated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
const CONTRACT_ADDRESS = '0x7B76D0B5cBD05E771ef9A1d5842D5778AFeF349d';

const WEB3_PROVIDER = 'https://eth-goerli.g.alchemy.com/v2/{YOUR_ALCHEMY_API_KEY}';

module.exports = {
    CONTRACT_ABI,
    CONTRACT_ADDRESS,
    WEB3_PROVIDER
};