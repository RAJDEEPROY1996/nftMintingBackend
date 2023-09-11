const express = require("express");
const app = express();
require('dotenv').config()
const connectDb = require("./db/connect")

const PORT = process.env.PORT || 6501;
app.use(express.json());

const nft_routes = require("./routes/NFTrouting")

app.use("/api/v0",nft_routes);


const start = async ()=>{
    try{
        await connectDb(process.env.uri);
        app.listen(PORT, () =>{
            console.log(`Server is running at ${PORT}`);
        });
    } catch(error){
        console.log(error);
    }
}


start()