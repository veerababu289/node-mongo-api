const express = require('express')
const mongoose = require ('mongoose')
const User = require('./model')
const app = express()
const cors = require ('cors')
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://veerababu:12345@cluster0.gwkcyhq.mongodb.net/?retryWrites=true&w=majority').then( 
    () => console.log('db connected..')).catch(err  => console.log(err))

//posting the data in to the database
app.post('/add', (req,res) => {
    var data=[{
         id:1,
        product_Name:"redmi",
        cost:20000,
        color:"white",
        availabilty:[533401,588401],
        quantity:5,
        rating:4.2,
        seller:"manikatamobi"
        },
        {
        id:2,
        product_Name:"realme",
        cost:15000,
        color:"black",
        availabilty:[533406,535701],
        quantity:10,
        rating:4,
        seller:"balajimobi"
        },
        {
            id:3,
            product_Name:"nokia",
            cost:30000,
            color:"gold",
            availabilty:[533406,535701],
            quantity:10,
            rating:4.5,
            seller:"karunamobi"
            },
            {
                id:4,
                product_Name:"honour",
                cost:25000,
                color:'black',
                availabilty:[533406,535701],
                quantity:20,
                rating:3,
                seller:"venkatmobi"
                }
    ]
    User.insertMany(data, function(err, data){
        if (err)
        {
            console.log(err)
        }
        else{
        res.json(data)
        console.log("documents inserted")}
    })
})


//getting the data
app.get('/get', async (req,res) => {
    try{
          const info = await User.find()
          res.json(info)
    }
    catch(err)
    {
        console.log(err.message)
    }
})

//updating the data by id
app.put('/up/:id', async (req,res) => {
     try{
       const uid = req.params.id
    await User.findByIdAndUpdate({_id:uid},{seller: 'gopalmobi'})
     return res.json( await User.find())
     }
     catch(err)
     {
        console.log(err.message)
     }
    })

//delete the data by id
app.delete('/delete/:id', async (req,res) => {
    
        const uid = req.params.id
        await User.findByIdAndDelete( {_id:uid})
        res.json('deleted')
    
 
})

//getting data as per user cost need
app.get('/getneed', (req,res) => {
      try{
         User.find({Cost:{$gt:18000}},function(err,data)
                 {
                    res.send(data)
                    console.log('getneed done')
                 })
            }
        catch(err)
           {
            console.log(err)
           }
          })

//getting data as per users need regarding cost, color, rating.
app.get('/getneed1', (req,res) => {
    try{
        User.find({$and : [{Cost : {$gt:20000}}, {Color:'black'}, {Rating : {$gte:3}}]}, function(err,data) {
            res.json(data)
        })
    }
    catch(err)
    {
        console.log(err)
    }
})

//getting data as per users need regarding colour starts with letters "go"
app.get('/getneed2', (req,res) => {
    try{
        User.find({Color: /^go/} , function(err,data){
            res.json(data)
        })
    }
    catch(err)
    {
        console.log(err)
    }
})

//posting data in database through postman
app.post('/add1', (req,res) => {
      try{
        data=req.body
        User.insertMany(data, function(err, data){
            if (err)
            {
                console.log(err)
            }
            else{
                res.json(data)
            }
        })
    }
        catch(err)
        {
            console.log(err)
        }
    })

//deleting the  data in database
app.delete('/delete1',(req,res) =>{
    try{
    User.deleteMany({ Quantity: 5 }).then( () =>{
        console.log("deleted all")
    })
    }
    catch(err)
    {
        console.log(err)
    }
})

//update the data by postman body
app.put('/up1/:id', async (req,res) => {
    try{
    const uid = req.params.id
    const color = req.body.color
   const leo = await User.findByIdAndUpdate({_id:uid},{color:color})
     res.json( leo)
    }
    catch(err)
    {
        console.log(err)
    }
})
app.listen(9000, () => console.log('server...'))