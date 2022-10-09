const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const math = require("mathjs")




const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"password",
    database: "Calculator",
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/test",(req,res)=> {
    res.send("hi")
})

app.post("/api/calculate",(req,res)=>{
    const equation = req.body.mathEquation;
    //decoding Equation
    const decodedEq = equation.split('d').join('/');
    console.log(decodedEq)
    let result = math.evaluate(decodedEq)
    res.end(""+result)
    //posting to Database
    const sqlInsert = "INSERT INTO calculationHistory (expression , result) VALUES (?,?)";
    db.query(sqlInsert,[decodedEq,result],(err,resul)=>{
    console.log(resul);
    
    });
    
    console.log(result)
});


   
app.listen(3001,()=>{
    console.log("running at port 3001");
});
