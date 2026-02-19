const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Direct MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API Route
app.post("/api/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Message saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
