const express= require("express");
const https=require("https");
const path=require("path");
const fs=require("fs");


var constants=require("./constants.js");
const app=express();
app.use(express.json());

var myinterv = setInterval(function() {
console.log("Configurations Loadded and Updated");

//======================MQTT CLIENT========================
const main=require("./routes/main");
app.use("/main",main);
//====================================================================
//================================================================
//=========================CONFIG READING END HERE=================
clearInterval(myinterv);
}, 500);
app.get('/', function (req, res) {

    console.log("API SERVER IS RUNING");

});
// var sslServer=https.createServer({
// 'key':fs.readFileSync(path.join(__dirname,'cert','key.pem')),
// 'cert':fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// },app);
// sslServer.listen(3001,function(){
//     console.log("Secure server listen on port 3001");
// });


app.listen(3004,function(){
  
    console.log("server listen on port 3000");
   
});