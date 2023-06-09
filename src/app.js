const express = require('express')
const app = express()
const port = process.env.PORT || 8000
require("./DBConnection/conn")
const userRoute = require('./Routers/userRoute');

app.use(express.json());
app.use('/api', userRoute)

app.listen(port,() => {
  console.log('connection is setup at Port ${port}')
})