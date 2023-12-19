
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
// MiddleWear
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i7jrqrv.mongodb.net/?retryWrites=true&w=majority`;
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.i7jrqrv.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeServer = client.db('coffeeServerDB').collection('coffee'); 
    app.get('/coffees',async(req,res)=>{
      const cursor=coffeeServer.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/updateCoffee/:id',async(req,res)=>{
            const id = req.params.id;
            const query= { _id: new ObjectId(id)}
            const result= await coffeeServer.findOne(query);
            res.send(result)
    })
    app.post('/addCoffe', async (req, res) => {
            const newCoffee = req.body;
            // console.log(newCoffee)
            const result=await coffeeServer.insertOne(newCoffee);
            res.send(result)

    })
    app.put( '/updateCoffee/:id',async(req,res)=>{
      const id = req.params.id;
      const coffee=req.body;
      // console.log(id,updateInfo)
     const filter= { _id : new ObjectId(id)};
     const options = { upsert:true } ;
     const updateInfo={
      $set:{
        name:coffee.name,
        chef:coffee.chef,
        taste:coffee.taste,
        supplier:coffee.supplier,
        quantity:coffee.quantity,
        imgURL:coffee.imgURL
        
      }
     }
     const result = await coffeeServer.updateOne(filter,updateInfo,options);
     res.send(result)
    })
    app.delete('/coffee/:id',async(req,res)=>{
      const id = req.params.id;
      // console.log(id)
      const query = {_id: new ObjectId(id)};
      const result=await coffeeServer.deleteOne(query);
      res.send(result)
    
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('your server is working')
})
app.listen(port, () => {
  console.log('server is running at Port =>', port)
})