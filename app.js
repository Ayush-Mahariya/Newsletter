const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://ayushmahariya:Ayusha11@cluster0.tuathop.mongodb.net/newsletterDB?retryWrites=true&w=majority", {useNewUrlParser:true});

const listSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    emailId: {
        type: String,
        unique: true
    }
});
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let listData = new List({
        fName: firstName,
        lName: lastName,
        emailId: email
    });
    listData.save().then(function(){
        console.log("Contact inserted");  // Success
        res.sendFile(__dirname+"/success.html");
    }).catch(function(error){
        console.log(error)      // Failure
        res.sendFile(__dirname+"/failure.html");
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(port, function(){console.log("Server is running at "+port);})