const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
require("./DBConnection/conn");
const userRoute = require('./Routes/userRoute');
const catRoute = require('./Routes/catRoute');
const favoritedCatRoute = require('./Routes/favoritedCatRoute');
const chatroomRoute = require('./Routes/chatroomRoute');
const messageRoute = require('./Routes/messageRoute');

app.use(express.json());
app.use(cors());
app.use('/api', userRoute);
app.use('/api', catRoute);
app.use('/api', favoritedCatRoute);
app.use('/api', chatroomRoute);
app.use('/api', messageRoute);

const docsPath = path.join(__dirname, 'docs');
app.use('/docs', express.static(docsPath));

app.listen(port,() => {
  console.log('connection is setup at Port port');
})