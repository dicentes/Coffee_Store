const express = require('express');
const cors = require('cors');
const app = express();
const port = 3500;

const jwt = require('jsonwebtoken'); // require the jsonwebtoken package
const secret = 'thoushaltnotpass';

// Apply CORS middleware to all routes
app.use(cors());
//test 
app.use(express.json()); // add middleware to parse JSON request bodies (makes info available in req.body)
//test 
//WRITE A ROUTE THAT WILL HANDLE AUTHENTICATION OF THE TOKEN - FOR THE TIME BEING, SIMPLY STORE THE TOKEN IN THE DB 
//AND HAVE THE REACT APPLICATION CHECK AGAINST IT WHENVER THE USER REFRESHES, SO THAT THE COMPONENT - RECHECKS IF THE TOKEN IS STILL GOOD
//recideves the token locally from localstorage and is sent via json post to the api
app.post('/api/validate', async (req, res) => {
  const { token } = req.body;
  //console.log(`Received token from frontend:  ${token}`);
  // REACH OUT TO MONGODB
  try {
    await client.connect();
    const collection = client.db("mydb").collection("users");
    const user = await collection.findOne({ token });
    // if we find a user that matches the username, password, and token
    if (user) {
      res.json({ username: user.username, password: user.password, token: user.token, authStatus: "validated", userRole: user.userRole}); // send the username, password and token back to frontend
      console.log("I've validated the front end users token.");
    } else {
      // this is actually important now, we need error handling for when the token is not valid
      res.json({authStatus: "invalidated"});
      console.log("I sent an error back to the frontend that the token was not found, or something.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error validating user information');
  } finally {
    //nothing
  }
  //await client.close();
});
// This will eventually be unncessary, but I wanted to first get the data from node to react, then eventually we'll do real calls. 
const fakeInventoryData = [
  {
    productID: "1233456",
    name: "Ferrara Brand One",
    description: "A damn fine cup of coffee. I mean it's really good.",
    quantity: "10",
    price: "10"
  },
  {
    productID: "7890123",
    name: "Ferrara Brand Two",
    description: "Basically mudwater. Undrinkable, even, but we oblige out of kindness.",
    quantity: "50",
    price: "12"
  }
];

app.get("/api/inventory", async (req, res) => {
  try {
    // Simulate a delay to mimic an asynchronous operation
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // Return the inventory data as the response
    res.json(fakeInventoryData);
    console.log("I've sent the inventory data.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//INSERT the app.post for the login route 
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received username: ${username}, password: ${password}`);

   // choose a secret key
  
  try {
    // Connect to MongoDB using the MongoClient instance
    await client.connect();
    // Get the appropriate collection and find the matching document
    const collection = client.db("mydb").collection("users");
    const user = await collection.findOne({ username, password }); //check that the db has these entries
    if (user) {
      const token = jwt.sign({ username }, secret); // sign a JWT with user's info and secret key
      res.json({ token }); // send the token to the client
      //should this also send "validated" the first time? no one is going to refresh before they get a token...right?
      //WRITE TO THE MONGODB AND INCLUDE TOKEN FOR THAT USER AND PW COMBINATION 
      await collection.updateOne(
        { username },
        { $set: { token } },
        console.log("Login route is working."),
      );
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error validating user information');
  } finally {
    //does this need to be here?
  }
  //await client.close();
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received username: ${username}, password: ${password}`);
  const userRole = "normal";
  try {
    // Connect to MongoDB using the MongoClient instance
    await client.connect();
    
    // Get the appropriate collection and insert the document
    const collection = client.db("mydb").collection("users");
    const result = await collection.insertOne({ username, password, userRole });
    //console.log(`Inserted document with _id: ${result.insertedId}`);
    console.log("Register route is working.");
    
     // Close the connection

    res.status(201).send('Received and stored!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing user information');
  } finally {
    //nothing
  }
  //await client.close();
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rlbradshaw77:Q1O80LdaGNiOXxo4@coffeestore.dtdgyix.mongodb.net/?retryWrites=true&w=majority";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});