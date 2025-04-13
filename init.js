const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("Database connected");

    const allChats = [
        { from: "Neha", to: "Priya", msg: "Send me your exam sheet", created_at: new Date() },
        { from: "Rahul", to: "Vinod", msg: "Where are you right now?", created_at: new Date() },
    ];

    await Chat.insertMany(allChats);
    console.log("Sample data inserted");
    mongoose.connection.close();
}

main().catch(err => console.log(err));




