const moongose = require("monngose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
type:String,
required:true,
    },
    description:String,
    image:{
        type:String,
        default:"",
        set:(v)=>{

        }
    },
    price: Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;