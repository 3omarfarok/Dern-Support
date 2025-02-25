const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());




  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Failed to Connect with Database', err));


// for ميدل وير
app.use(express.json()); 
app.use(cors()); 

// For routes
const userRouts=require('./routes/userRoutes');
app.use('/api/user',userRouts);

const requestRouts=require('./routes/requestRoutes');
app.use('/api/request',requestRouts);




app.get('/',(req,res)=>{
  res.send("Api is Running . . .")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running in Port :${PORT}`));
