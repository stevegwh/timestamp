var express = require('express');

var app = express();

Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};

function timeConv(str) {
  if(/[a-z]/i.test(str)) {
    var natural = new Date(str);
    var unix = parseInt((new Date(str).getTime() / 1000).toFixed(0));
  } else {
    var unix = str;
    var natural = new Date(str*1000);
  }
  var month = natural.getMonthName();
  var day = natural.getDate();
  var year = natural.getFullYear();
  if(natural instanceof Date && isFinite(natural)) {
    return {natural: month + " " + day + ", " + year,
     unix: unix};
  } else {
    return {null: null};
  }
}

app.get('/:time?', function(req, res) {
  var time = req.params.time;
  res.send(timeConv(time));
})

app.listen(process.env.PORT);
