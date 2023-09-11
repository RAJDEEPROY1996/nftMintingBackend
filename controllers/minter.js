const NFTschema = require('../models/schema')
const ethers = require('ethers');
const { type } = require('os');

const chainDetails =[
    {
        chainName:"bscTestNet",
        chainId:97,
        chainRpcUrl: process.env.bscTestNet
    },
    {
        chainName:"goerli",
        chainId:5,
        chainRpcUrl: process.env.goerli
    },
    {
        chainName:"mumbaiTestNet",
        chainId:80001,
        chainRpcUrl: process.env.mumbaiTestNet
    },
    {
        chainName:"sepolia",
        chainId:11155111,
        chainRpcUrl: process.env.sepolia
    },
    {
        chainName:"optimismGoerli",
        chainId:420,
        chainRpcUrl: process.env.optimismGoerli
    },
    {
        chainName:"arbitrumGoerli",
        chainId:421613,
        chainRpcUrl: process.env.arbitrumGoerli
    },
    {
        chainName:"avalancheFuji",
        chainId:43113,
        chainRpcUrl:process.env.avalancheFuji
    },
    {
        chainName:"hederaTestNet",
        chainId:296,
        chainRpcUrl:process.env.hederaTestNet
    },
    {
        chainName:"ganache",
        chainId:1337,
        chainRpcUrl:"http://127.0.0.1:8545"
    },
]

// const contractAddress = "0x7e5CC10868d2A52eeEe0E507DFBA9AB26739DAF0";
const contractAddress = "0xFAd04EE71000236c042694058D5cf00F4BCCa6bF"

const abi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"nftOwner","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"NFTminted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"minterAddress","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"mintNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"removeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const getNFTDetails = async(req,res) =>{
    await NFTschema.deleteMany();
    res.status(200).json({
        "contract Address":"0x7e5CC10868d2A52eeEe0E507DFBA9AB26739DAF0",
        "supported Chains":["bscTestNet","goerli","mumbaiTestNet","sepolia","optimismGoerli","arbitrumGoerli","avalancheFuji","hederaTestNet"]
    });
}


const getAllchainNFT = async(req,res) =>{
    const myData = await NFTschema.find(req.query)
    res.status(200).json({myData});
} 

const getAllchainNFTByAddress = async(req,res) =>{
    if (!req.query.userAddress) {
        return res.status(400).json({ error: 'userAddress is required in the query parameters.' });
    }
    const myData = await NFTschema.find(req.query)
    res.status(200).json({myData});
}

const mintingNFT = async(req,res) => {
    const maxRetries = 5;
    var retryCount = 0;
    while (retryCount < maxRetries) {
        try {
            let tokenID = await generateTokenID(req.body.userAddress);
            const NFTschemaInfo = new NFTschema({
                ...req.body,
                tokenId: tokenID.toString() // Use the generated tokenID
            });
            await NFTschemaInfo.save();
            var rpc;
            for(let i=0;i<chainDetails.length;i++){
                if(req.body.chainId == chainDetails[i].chainId){
                    rpc = chainDetails[i].chainRpcUrl;
                    break;
                }
            }
            if(rpc == undefined) throw new Error('RPC URL not found for the provided chainId.');
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);console.log("w",wallet.address)
            let contractInstance = new ethers.Contract(contractAddress,abi,wallet); 
            // let tx = await contractInstance.mintNFT(req.body.userAddress, tokenID,req.body.tokenUri);
            
            const receipt = await tx.wait();
    
            // Maybe return this to the user or further process the transaction data
            res.status(200).json({
                message: 'NFT minted and stored successfully',
                transactionHash: tx.hash,
                blockNumber: receipt.blockNumber,
                nftData: NFTschemaInfo
            });
            break;
        } 
        catch (error) {
            if (error.code && error.code === 11000) {
                // Duplicate key error, increment the retry count and loop will retry
                retryCount++;
            } 
            else {
                // Other errors, send a response and break out of the loop.
                res.status(400).send({ message: error.message });
                break;
            }
        }
    }
    if (retryCount === maxRetries) {
        res.status(500).send({ message: 'Max retries reached for generating a unique tokenID.' });
    }
} 

async function generateTokenID(userAddress) {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const types = ['address', 'uint256'];
    const values = [userAddress, timestampInSeconds];
    const hash = ethers.utils.solidityKeccak256(types, values);
    const uintVal = ethers.BigNumber.from(hash);
    return BigInt(uintVal);
}

module.exports = {
    getNFTDetails,
    getAllchainNFT,
    getAllchainNFTByAddress,
    mintingNFT
};
 
