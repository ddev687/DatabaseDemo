const express=require("express");
const bodyParser=require("body-parser");
const Subject=require("./Model/Subject");
const Student=require("./Model/Student");
const DB=require('./Config/DB');
const triggers=require('mongo-triggers');

let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));


//Subject EndPoint

app.post("/add/Subject",(req,res)=>{
    let subject=new Subject({
        Subject_Name:req.body.Subject_Name
    });
    subject.save().then(subject=>res.status(200).send(subject));
});

app.get("/get/Subject",(req,res)=>{
    Subject.find().then(subject=>res.status(200).send(subject));
});

app.get("/get/Subject/:id",(req,res)=>{
    Subject.findById(req.params.id).then(subject=>res.status(200).send(subject));
});

app.put("/update/Subject/:id",(req,res)=>{
    Subject.findByIdAndUpdate(req.params.id,{$set:{Subject_Name:req.body.Subject_Name}}).then(subject=>res.status(200).send(subject));
});

app.delete("/delete/Subject/:id",(req,res)=>{
    Subject.findByIdAndUpdate(req.params.id,{$set:{isDelete:true}}).then(subject=>res.status(200).send(subject));
});

//Student EndPoint

app.post("/add/Student",(req,res)=>{
    let student=new Student({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password,
        Marks:req.body.Marks
    });
    student.save().then(subject=>res.status(200).send(subject));
});

app.get("/get/Student",(req,res)=>{
    Student.find().then(subject=>res.status(200).send(subject));
});

app.get("/get/Student/:id",(req,res)=>{
    Student.findById(req.params.id).then(subject=>res.status(200).send(subject));
});

app.put("/update/Student/:id",(req,res)=>{
    Student.findByIdAndUpdate(req.params.id,{$set:{Name:req.body.Name,Email:req.body.Email,Password:req.body.Password,Marks:req.body.Marks}}).then(subject=>res.status(200).send(subject));
});

app.delete("/delete/Student/:id",(req,res)=>{
    Student.findByIdAndUpdate(req.params.id,{$set:{isDelete:true}}).then(subject=>res.status(200).send(subject));
});

app.listen(3000);