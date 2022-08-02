require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')


// express app to listen application
const app = express();

//middleware 
app.use(express.json()) // express.json is a middleware which is used to store the data into req object if er are passing any data to the server

app.use((req, res, next) => {
    next(); 
})

//routes
app.use("/product/",productRoutes)
app.use("/category/",categoryRoutes)

const CONNECTION_URL = process.env.MONGO_URI + "/" + process.env.DB_NAME

//connect to database
mongoose.connect(CONNECTION_URL).then(()=>{
    //listen for request
    app.listen(process.env.PORT,()=>{
        console.log(`Database Connected Successfully & Listening to port ${process.env.PORT} !`)
    })
})
.catch(error => {
    console.log("Database not connected : ", error);
})
