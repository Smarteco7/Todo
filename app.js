const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const List= require('./model/list');
const mongoose = require('mongoose')



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}));


mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

function validateListSchema(List) {
    const error = [];
    if(!List.title){
        error.push('title is required and must be a string');
    }   
    return error; 
}

//To filter lists 
app.get('/lists', async(req,res)=>{
    try {
        const lists = await List.find()
        res.json({lists})
    } catch (error) {
        error.message='could not find result'
        res.json({message:error.message})
    }
    
})

app.get('/lists/filter', async(req,res)=>{
    try {
            const { status } = req.query;
        const todos = await List.find({ isCompleted: status }).exec();
        return res.status(200).json({
            message: "Got all todos successfully",
            todos: todos
        })
       
    } catch (error) {
        console.log(error);
    }
    })


app.get('/lists/:id', async(req,res)=>{
    const {id}=req.params
    try {
        const lists = await List.findById(id)
        res.json({lists})
    } catch (error) {
        error.message='could not find result'
        res.json({message:error.message})
    }
    
})



app.post('/lists', async(req,res) => {
    const { title, date, time, isCompleted} = req.body;
    const error = validateListSchema({title});

    if (error.length>0) {
        return res.json({message:"validation failed", error})
    }
    try {
        const newList = new List({title,date,time,isCompleted});
         const savedList = await newList.save();
         console.log(savedList)
         return res.json({message:'new reminder added'})
    } catch (error) {
        error.message='could not send data'
        res.json({message:error.message})
    }
})



app.put('/lists/:id', async(req,res)=>{
const {id}=req.params;
try {
    const updatedList = await List.findByIdAndUpdate(id, req.body)
    res.json({message:'Successful'})  
} catch (error) {
    res.json({message:error.message})
}
 
})


app.delete('/lists/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const deleteList =await List.findByIdAndDelete(id)
        res.json({message:'Deleted sucessful'})
    } catch (error) {
        res.json({message:error.message})
    }
})



const port = 4000
app.listen(port,()=>{
    console.log('it is running')
})