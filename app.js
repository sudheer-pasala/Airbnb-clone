const express = require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path= require("path");
const methodOverride = require("method-override");
const ejsMate =require("ejs-mate");


const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(_dirnae,"/public")));

app.get("/" ,(res, req) => {
    res.send("hi im root");
});
//Index route
app.get("/listing",async (req, res)=>{
   const allListing = await Listing.find({});
   res.render("/listings/index.ejs", {allListing});
     
});

//New Route
app.get("/lisitngs/new", (req, res)=>{
    res.render("listings/new.ejs");
});
//show route
app.get("/lisitngs/:id", async(req, res) =>{
    let {id} =req.params;
    const lisitng = await Listing.findById(id);
    res.render("listings/show.ejs",{listing} );
});

// create route
app.post("/listing", async(req, res)=>{
   const newListing =  new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
   
});
//Edit Route
app.get("/listings/:id/edit", async(req, res) =>{
    let {id} =req.params;
    const lisitng = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// Update Route
app.put("/listings/:id", async(req, res) =>{
    let {id} =req.params;
   await Listing.findByIdAndUpdate(id, {...req.body.listing});
   res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
//app.get("/testListing" ,async (req,res)=>{
   // let sampleListing = new Listing({
      //  title:"my new villa",
       // description:"by the beach",
        //price:1200,
        //location:"cal , goa",
        //country:"India",
   // });

    //await sampleListing.save();
    //console.log("sample was saved");
    //res.send("sucessful testing");
    
//});
app.listen( 8080, ()=>{
    console.log("server is listening");
});