require('dotenv').config();

const express = require('express');
const app = express();
const generateToken = require('otp-generator');
const port = process.env.PORT | 3000;
const DatabasePassword = process.env.DatabasePassword;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Jeswin:"+ DatabasePassword +"@cluster0.5nwhj.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json())
app.use(express.static('./src'));

app.post('/api/store-ip-info', async(req, res) => {
    const ip = req.body.ip;
    
    try {
        await client.connect();
        const collection = client.db('ip-logger').collection('logs');
        await collection.insertOne({
            ip: ip
        })
    } finally {
        await client.close();

        res.send({ success: true })
    }
});

app.listen(port, console.log(`PORT: ${port}`));