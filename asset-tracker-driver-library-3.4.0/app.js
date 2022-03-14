const driver = require('./main')

const express = require('express')
const app = express()

app.use(express.json()) 

function convertToByteArray(payload){
    var bytes = [];
    var length = payload.length/2;
    for(var i = 0; i < payload.length; i+=2){
        bytes[i/2] = parseInt(payload.substring(i, i+2),16)&0xFF;
    }
    
    return bytes;
}

function convertBytesToString(bytes){
    var payload = "";
    var hex;
    for(var i = 0; i < bytes.length; i++){
        hex = convertByteToString(bytes[i]);
        payload += hex;
    }
    return payload;
}

function convertByteToString(byte){
    let hex = byte.toString(16);
    if (hex.length < 2){
        hex = "0" + hex;
    }
    return hex;
}


app.post('/decodeuplink', (req,res) => {
    console.log(req.body)
    var inputBytes = convertToByteArray(req.body.bytes)
    var input = req.body
    input.bytes = inputBytes
    var reply = driver.decodeUplink(input)
    console.log(reply)
    res.json(reply)
})

app.post('/decodedownlink', (req,res) => {
    console.log(req.body)
   
    var inputBytes = convertToByteArray(req.body.bytes)
    var input = req.body
    input.bytes = inputBytes
    var reply = driver.decodeDownlink(input)
    console.log(reply)
    res.json(reply)
})

app.post('/encodedownlink', (req,res) => {
    console.log(req.body)
    var input = req.body
    var reply = convertBytesToString(driver.encodeDownlink(input).bytes)
    console.log(reply)
    res.send(reply)
})



app.listen(4000, () => {
    console.log("Server listening on http://localhost:4000")
})

