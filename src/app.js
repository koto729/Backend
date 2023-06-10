const express = require('express')
const app = express()
const port = process.env.PORT || 8000
require("./DBConnection/conn")
const userRoute = require('./Routes/userRoute');
const catRoute = require('./Routes/catRoute');

app.use(express.json());
app.use('/api', userRoute)
app.use('/api', catRoute)

app.listen(port,() => {
  console.log('connection is setup at Port ${port}')
})