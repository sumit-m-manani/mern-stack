require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/product')


// express app to listen application
const app = express();

//middleware 
app.use(express.json()) // express.json is a middleware which is used to store the data into req object if er are passing any data to the server

app.use((req, res, next) => {
    console.log(`Path : ${req.path} - method : ${req.method}`);
    next(); 
})

//routes
app.use("/mern",productRoutes)

//listen for request
app.listen(process.env.PORT,()=>{
    console.log(`Listening in port ${process.env.PORT} !`)
})