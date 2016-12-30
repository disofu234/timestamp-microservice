var express = require("express");
var path = require("path");

var app = express();

var months = new Array(	"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/:id", function(req, res){
    var date_param = req.params.id;
    
    if (!isNaN(date_param)) {
        date_param = +date_param * 1000;
    } else {
        date_param = date_param.split("%").join(" ");
    }
    
    var date = new Date(date_param);
    
    var json = {
        "unix": date.getTime() / 1000,
        "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    };
    
    res.json(json);
});

app.listen(process.env.PORT);