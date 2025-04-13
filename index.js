//1
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");

// 2 exported from chat.js
const Chat = require("./models/chat.js"); 
// 2

const methodOverride= require("method-override")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs" );
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection successful")
})
.catch(err=> console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

// 4 Index Route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats})
});
// 4

// 7 New route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs")
});
// 7

// 9 create route
app.post("/chats",(req,res)=>{
    let {from, to, msg}=req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date()
    });

    newChat.save().then((res)=>{
        console.log("Chat was saved")
    }).catch((err)=>{
        console.log(err)
    })
    res.redirect("/chats");
})
// 9

// 10 Edit route 
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs", {chat})
});

//Update route
app.put("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let {msg: newMsg}= req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runvalidators: true, new: true}
    );

    console.log(updatedChat);
    res.redirect("/chats")

})
// 10

// 12 Destroy route
app.delete("/chats/:id", async(req,res)=>{
    let{id}= req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats")
});
// 12


app.listen(8080, ()=>{
    console.log("Server is starting at 8080")
});
//1