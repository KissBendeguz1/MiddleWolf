const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = 'mongodb+srv://Mateeeeh08:Mate2007.0802@mateeeeh08.bfcbk4e.mongodb.net/MiddleWolf_db?appName=Mateeeeh08'; 

const app = express();
const PORT = 3001;

app.use(cors());

mongoose.connect(uri)
    .then(() => console.log("Successfully connected to MongoDB!"))
    .catch(err => console.error("MongoDB connection error:", err));
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const UserModel = mongoose.model('User', UserSchema);

app.get("/getusers", async (req, res) => {
    try {
        const users = await UserModel.find({});


        res.json(users);

    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Failed to fetch users" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
