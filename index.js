const express = require('express');

const app = express();

app.use('/',(req,res)=>{
    res.send('hola mundo')
})

app.listen(3000);