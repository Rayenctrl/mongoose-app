const express = require("express")
const app=express()
const connectDB=require('./config/connectDB')

//4 parse data
app.use(express.json())
//3 routes
app.use('/api/persons', require("./routes/person"))
//2 connectDB
connectDB()
//1 run server
const PORT= process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));