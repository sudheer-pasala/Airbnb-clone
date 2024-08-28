const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("./models/listing.js");

const MONGO_URL = "";

main().then(()=>{
    console.log("connected to DB");
}).catch ((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}