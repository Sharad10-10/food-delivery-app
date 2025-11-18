const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/foodDelivery')
.then(()=>console.log("Connection succeeded"))
.catch((err)=>console.log(err))

const userDetails = new mongoose.Schema({
    userId : String,
    password : String,
    address : String
})

const orderDetails = new mongoose.Schema({
    userId : String,
    cheeseandcorn : Number,
    capsicum : Number,
    margherita : Number,
    onion : Number,
    address : String,
    totalAmount : Number
})

const adminDetails = new mongoose.Schema({
    userId : String,
    password : String,
})

const Admdetails = mongoose.model('adminDetails', adminDetails, 'adminDetails')

const Odetails = mongoose.model('orderDetails', orderDetails, 'orderDetails')

const details = mongoose.model('userDetails', userDetails, 'userDetails')

const app = express();
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.send("Hello world")
})

app.post('/CreateAccount', (req, res)=> {
    details.create({
        userId : req.body.userId,
        password : req.body.password,
        address : req.body.address
    }).then(()=>{res.json({msg: 'Registration successful'})})
    .catch((err)=>res.json({msg: 'Error Occurred'}))
})



app.post("/checklogin", (req, res)=>{
    const uid = req.body.userId
    const pwd = req.body.password

    details.findOne({"userId":uid})
    .then((myData)=> {
    if (myData) {
        if(pwd==myData.password){
            res.json({userId : myData.userId, address: myData.address})
        }
        else{
            res.send(false)
        }
    }
    else {
        res.send(false)
    }
}).catch((err)=>console.log(err))    
})


app.post('/placeorder', (req, res)=>{
    Odetails.create({
        userId : req.body.userId,
        cheeseandcorn : req.body.cheeseandcorn,
        capsicum : req.body.capsicum,
        margherita : req.body.margherita,
        onion : req.body.onion,
        address: req.body.address,
        totalAmount : req.body.totalAmount
    })
    .then((data)=>{res.json({orderId : data._id.toString()})})
    .catch((err)=>res.json({msg: 'Order failed to place, Please try again!'}))
})


app.post('/adminlogin', (req, res)=> {
    const uid = req.body.userId
    const pwd = req.body.password

    Admdetails.findOne({"userId":uid})
    .then((myData)=> {
    if (myData) {
        if(pwd==myData.password){
            res.json({msg : "Login Successful"})
        }
        else{
            res.send(false)
        }
    }
    else {
        res.send(false)
    }
    }).catch((err)=>console.log(err)) 
})


app.get("/getorders", (req, res)=> {
    Odetails.find().then((mydata)=>res.send(mydata))
    .catch((err)=>console.log(err))

})

app.listen(8000, ()=> {
    console.log("Server running.....");
});
