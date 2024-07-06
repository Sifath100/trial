const express=require('express')
const app=express()
const port=3000
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
app.get('/add',(req,res)=>{
    console.log("hey there")
})
app.post('/add',(req,res)=>{
    console.log(req.body)
    const a=req.body.a
    const b=req.body.b

    const pythonProcess=spawn('python',['script.py',a,b])

    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString();
        res.send(`The sum of ${a} and ${b} is ${result}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        res.send(`Error: ${data}`);
    });
})
app.listen(port,()=>{
    console.log("app is running")
})

