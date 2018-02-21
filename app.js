const express=require("express");
const bodyParser=require("body-parser");
const Subject=require("./Model/Subject");
const Student=require("./Model/Student");
const mysql = require('mysql');

let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));

function Connect() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "StudentManagement",
        socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock",
        multipleStatements: true
    });
    return con;
}
/*

Connect().connect(function(err) {
    if (err) console.log(err);
    console.log("Connected!");
    const producer="delimiter $$ CREATE PROCEDURE GetStudent(out student_count) BEGIN var ct; SELECT count(*) into ct FROM Student;set student_count=ct; end $$";
    Connect().query(producer, function (err, result) {
        if (err) console.log(err);
        console.log(result);
    });
});
*/


//Subject EndPoint

app.post("/add/Subject",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "INSERT INTO Subject (Subject_Name) VALUES ('"+req.body.Subject_Name+"')";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.get("/get/Subject",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "select * from Subject";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.get("/get/Subject/:name",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "select * from Subject where Subject_Name='"+req.params.name+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.put("/update/Subject/:id",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "update Subject set Subject_Name='"+req.body.Subject_Name+"' where id='"+req.params.id+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.delete("/delete/Subject/:id",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "update Subject set isDelete=1 where id='"+req.params.id+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

//Student EndPoint

app.post("/add/Student",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "INSERT INTO Student (Name,Email,Password) VALUES ('"+req.body.Name+"','"+req.body.Email+"','"+req.body.Password+"')";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });

    //Trigger Syntax
    /*Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql="CREATE TRIGGER Student_Backup after INSERT ON Student FOR EACH ROW begin insert into Student_Backup values(new.Name); end;";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });*/
});

/*User.aggregate([
    {
        $lookup:{
            from : 'marks',
            localField : 'studentname',
            foreignField : 'studentname',
            as : 'alldata'
        }
    }
]).then((ress) => {
    res.json({"msg" : ress})
})*/

app.get("/get/Student",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        //var data='@data';
        var sql=`CALL GetStudent(@student_count);select @student_count as count`;
        //var sql = "select * from Student";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result[1]);
        });
    });
});

app.get("/get/Student/:name",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "select * from Student where Name='"+req.params.name+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.put("/update/Student/:id",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "update Student set Name='"+req.body.Name+"',Email='"+req.body.Email+"',Password='"+req.body.Password+"' where id='"+req.params.id+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.delete("/delete/Student/:id",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "update Student set isDelete=1 where id='"+req.params.id+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
})

//Marks EndPoint

app.post("/add/Student/Marks",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "INSERT INTO Marks (Student_Id,Subject_Id,Marks,Result) VALUES ('"+req.body.Student_Id+"','"+req.body.Subject_Id+"','"+req.body.Marks+"','"+req.body.Result+"')";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.get("/get/Student",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "select * from Subject";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.get("/get/Student/:name",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "select * from Subject where Subject_Name='"+req.params.name+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.put("/update/Student/:id",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "update Subject set Subject_Name='"+req.body.Subject_Name+"' where id='"+req.params.id+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.delete("/delete/Student/:id",(req,res)=>{
    Connect().connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        var sql = "update Subject set isDelete=1 where id='"+req.params.id+"'";
        Connect().query(sql, function (err, result) {
            if (err) console.log(err);
            res.send(result);
        });
    });
});

app.listen(3000);