const express = require('express');
require("./db/connection");
const Register =require("./models/register");

const app = express();
const port=process.env.PORT || 4000;

app.use(express.json());


// post request to create a new account 
app.post("/register", async(req,res) => {
    try{
        const user = new Register(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
        
})

//get request to read the all registered Students
app.get("/register", async(req,res)=>{
    try{
        const regAccount = await Register.find();
        res.send(regAccount);
    }
    catch(e){
                res.status(404).send(e);
    }
})

//find a particular student details by id
app.get("/register/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const idRegister = await Register.findById(_id);
        if(!idRegister){
            return res.status(404).send();
        }
        else{
            res.send(idRegister);
        }        
        
    }
    catch(e){
                res.status(500).send(e);

    }
})

app.patch("/register/:id", async (req,res)=>{
    try{
        const _id = req.params.id;
        const updateRegistration = await Register.findByIdAndUpdate(_id, req.body,
            {new:true});   
            res.send(updateRegistration); 
    }
        
    catch(e){
        res.send(400).send(e);
    }
})



app.delete("/register/:id", async(req,res)=>{
    try{
        
        const deleteRegistration =await Register.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        
    }   
         res.send(deleteRegistration);
    }
    catch(e){
            res.send(500).send(e);
    }
})

app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
})