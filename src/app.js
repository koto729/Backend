const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
require("./DBConnection/conn");
const userRoute = require('./Routes/userRoute');
const catRoute = require('./Routes/catRoute');
const favoritedCatRoute = require('./Routes/favoritedCatRoute');

app.use(express.json());
app.use(cors());
app.use('/api', userRoute);
app.use('/api', catRoute);
app.use('/api', favoritedCatRoute);

app.listen(port,() => {
  console.log('connection is setup at Port ${port}');
})