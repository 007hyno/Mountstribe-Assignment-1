const express = require('express')
const app = express()
app.use(express.json()) //app can accept json
const bcrypt = require('bcrypt') //for crypting user password
const port = 3001 //port number

const fs = require('firebase-admin');
const serviceAccount = require('./creds.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
   });
const db = fs.firestore(); //database instence


//Register user
app.post('/api/register', async(req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")

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
      res.status(201).send(response);//response
    } catch(error) {
      res.send(error);
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
app.get('/',async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.send("Testing home api");
})

//user login 

app.post('/api/login',async(req,res)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
        try {
          const userRef = db.collection("users").doc(req.body.email);//taking collectoin reference
          const response = await userRef.get();
          if (!response.exists) { //if user email dosn't exist
            return res.status(404).send('No such document!');
          } 
          try{
              if(await bcrypt.compare(req.body.password,response.data().password)){//comp password
                  res.send('Success : '+response.data().email);
                // res.redirect("/home") // if success redirect to home page 
                  res.send(response.data());
              }else{
                  res.send("passoword miss match")
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
})