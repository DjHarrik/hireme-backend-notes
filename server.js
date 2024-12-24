const express = require("express");
const mongoose = require("mongoose");
const cors = require ("cors");
const dotenv= require("dotenv");

dotenv.config();   

const app = express();

app.use(express.json());  
app.use(cors());

const hiremeRoutes = require ('./api/hireme');

app.use('/api', hiremeRoutes);

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB connected successfully"))
   .catch(err => console.log("MongoDB connection error: ", err))
   
const PORT = process.env.PORT || 5000;
app.listen (PORT, () =>{
    console.log(`Server is running on port ${PORT}`);

})