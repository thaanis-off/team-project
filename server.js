// Using Express
const express = require('express');
// Using mongoose
const mongoose = require('mongoose'); 
// using cors to avoid cors policy error 
const cors = require('cors');

// create a instance of express
const app = express();

// use express middleware
app.use(express.json());
app.use(cors());

// Define route 
// app.get('/', (req, res) =>{
//     res.send("Hello my name  is thaanis");  
// });

//todos in-memory storage
// let todos = [];

// connecting mongodb
mongoose.connect('mongodb://localhost:27017/mern-app')
.then( () =>{
    console.log('db connected')
})
.catch((err) =>{
    console.log(err);
})

// creating shcema 
const todosSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    }
})

// creating model || the firsr parameter which is model name only be Singuler 
const todoModel = mongoose.model('Todo', todosSchema);

// create a new route post data
app.post('/myApp', async(req, res) =>{
    const {title, description} = req.body;
    // const newTodo = {
    //     id: todos.length + 1,
    //     title,
    //     description
    // };
    // todos.push(newTodo);
    // console.log(todos);

    try {
        const newTodo = new todoModel({title, description})
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error)
        //                   handeling the error when table colum name change
        res.status(500).json({message: error.message})
    }

    
   
})

// create a new route for get data
app.get('/myApp', async(req, res) =>{
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
   
})


// start the server
const port = 3000;
app.listen(port, () =>{
    console.log('server listening the port ' + port);
})