const Web3 = require('web3');
const EthereumEvents = require('ethereum-events');
const http = require('http');

const {CONTRACT_ABI, CONTRACT_ADDRESS, WEB3_PROVIDER} = require('./constants');


let storage = {'CollectionCreated': [], 'TokenMinted': []};

const port = 3000

const requestHandler = (request, response) => {
    console.log(request.url);
    const event = request.url.replace('/', '');
    response.end(JSON.stringify(storage[event]));
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if(err) {
        return console.log("Server Error", err)
    }
    console.log(`Listening of local network on port ${port}`);
});

const contracts = [
    {
      name: 'NftCollectionFactory',
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      events: ['CollectionCreated', 'TokenMinted']
    } 
];

const options = {
    pollInterval: 5000, // period between polls in milliseconds (default: 13000)
    confirmations: 12,   // n° of confirmation blocks (default: 12)
    chunkSize: 100,    // n° of blocks to fetch at a time (default: 10000)
    concurrency: 1,     // maximum n° of concurrent web3 requests (default: 10)
    backoff: 1000        // retry backoff in milliseconds (default: 1000)
};
  
const web3 = new Web3(WEB3_PROVIDER);  
const ethereumEvents = new EthereumEvents(web3, contracts, options);

ethereumEvents.on('block.confirmed', (blockNumber, events, done) => {

    // Events contained in 'confirmed' blocks are considered final,
    // hence the callback is fired only once for each blockNumber.
    // Blocks are delivered in sequential order and one at a time so that none is skipped
    // and you know for sure that every block up to the latest one received was processed.
    
    // Call 'done()' after processing the events in order to receive the next block. 
    // If an error occurs, calling 'done(err)' will retry to deliver the same block
    // without skipping it.
    
    console.log('Block confirmed: ', blockNumber, events);
    events.forEach(event => {
        storage[event.name].push(event);
    });
    done();
});
  
ethereumEvents.on('block.unconfirmed', (blockNumber, events, done) => {
    
    // Events contained in 'unconfirmed' blocks are NOT considered final
    // and may be subject to change, hence the callback may be fired multiple times
    // for the same blockNumber if the events contained inside that block change.
    // Blocks are received one at a time but, due to reorgs, the order is not guaranteed.
    
    // Call 'done()' after processing the events in order to receive the next block. 
    // If an error occurs, calling 'done(err)' will retry to deliver the same block
    // without skipping it.
    done();
});
  
ethereumEvents.on('error', err => {
  
    // An error occured while fetching new blocks/events.
    // A retry will be attempted after backoff interval.
    console.log('Error: ', err);
});

const startBlock = 8981000;

ethereumEvents.start(startBlock); // startBlock defaults to 'latest' when omitted

console.log(`Listening of blockchain network for address ${CONTRACT_ADDRESS} ...`);

const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

sleep(1000000);