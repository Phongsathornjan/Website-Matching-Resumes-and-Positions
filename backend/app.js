const express = require('express');

const app = express();

app.get('/',(req, res) => {
    res.send('data');
})

app.listen(5000, () => {
    console.log('Server started successfully')
})