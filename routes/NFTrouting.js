const express = require('express');
const router = express.Router();

const {getNFTDetails,getAllchainNFT,getAllchainNFTByAddress,mintingNFT} =require("../controllers/minter")
router.route("/").get(getNFTDetails);
router.route("/getAllchainNFT").get(getAllchainNFT);
router.route("/getAllchainNFTByAddress").get(getAllchainNFTByAddress);
router.route("/nftMinter").post(mintingNFT); 



module.exports = router;
