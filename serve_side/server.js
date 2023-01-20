const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json()) //app can accept json
const bcrypt = require('bcrypt') //for crypting user password
const port = 8080 //port number

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const fs = require('firebase-admin');
// const serviceAccount = require('./creds.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_API_KEY);

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
   });
const db = fs.firestore(); //database instence


//Register user
app.post('/api/register', async(req, res) => {
  try {
    const userRef = db.collection("users").doc(req.body.email);//taking collectoin reference
    const response = await userRef.get();
    if (response.exists) { //if user email dosn't exist
      return res.status(404).json({message:' ALredy register!'});
    }}catch(e){
      console.log({message:e})
    }
    try {
      console.log(req.body);
      const id = req.body.email;
      const hashedPassword = await bcrypt.hash(req.body.password,10)//1-param:encrypted_password || 2-param:salt 
      const userJson = {
        email: req.body.email,
        password: hashedPassword,
        mobileNo: req.body.mobileNo,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      const usersDb = db.collection('users'); //storing db reference
      const response = await usersDb.doc(id).set(userJson); //inserting doc 
      res.status(200).json(response);//response
    } catch(error) {
      res.status(404).json({message:error});
    }
  });
  

//Home 
app.get('/:email',async(req,res)=>{//home page route with get 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")

    let email_ = req.params.email;
    const userRef = db.collection("users").doc(email_);
    const response = await userRef.get();
    res.send(response.data());
})

//Api for post testing only
app.post('/api/test',async(req,res)=>{
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  console.log("post req 😍");
  console.log(req.body.email);
  console.log(req.body.password);
  res.status(200).json({test:req.body.email});
})

//Api for get testing only
app.get('/api/test',async(req,res)=>{
  console.log("get req 😊");
    res.status(200).json({test:"req.body.email"});
})

//user login 
app.post('/api/login',async(req,res)=>{
  console.log("🤘🏻s🚀🚀 - "+req.body.email)
  // res.json(req.body)
        try {
          const userRef = db.collection("users").doc(req.body.email);//taking collectoin reference
          const response = await userRef.get();
          if (!response.exists) { //if user email dosn't exist
            return res.status(401).json({message:'No such user!'});
          } 
          try{
              if(await bcrypt.compare(req.body.password,response.data().password)){//comp password
                  res.status(200).json({message :{"firstName":response.data().firstName,
                "lastName":response.data().lastName,  
                "email":response.data().email,  
                "mobileNo":response.data().mobileNo,  
                }});
              }else{
                  res.status(402).json({message:"passoword miss match"})
              }
          }catch(err) {
            console.log("🟢🟩"+err.stack);
          }

        } catch(err) {
            console.log(err.stack);
          }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // console.log(process.env);
})