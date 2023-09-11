const mongoose = require('mongoose');

const NftDetails = new mongoose.Schema({
    chainId:{
        type: Number,
        required:true,
        enum:{
            values: [97,5,80001,11155111,420,421613,43113,296,1337],
            message:`{VALUE} is not supported a supported chain Id`,
        }
    },
    userAddress:{
        type:String,
        required:[true,"address must be provided"],
    },
    tokenId:{
        type: String,
        required: true,
        unique: true
    },
    tokenUri:{
        type:String,
        required: true,    
    }
});

const NFTschema = new mongoose.model("NFT",NftDetails);

module.exports = NFTschema;
