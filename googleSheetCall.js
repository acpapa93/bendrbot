var HTTPS = require ("https");
//add request
var request = require("request");
//add express
var express = require ("express");
var app = express();

//identifying info
var Sheet_ID = process.env.SHEET_ID;
var Auth_key = process.env.Auth_Key;
var name1, rent1, name2, rent2, name3, rent3, name4, rent4, name5, rent5, name6, rent6, name7, rent7, rentStatement = "";

//request parameters
var options = {
  host: "https://sheets.googleapis.com/v4/spreadsheets/",
  path: Sheet_ID + "/values/I25%3AJ32?majorDimension=ROWS&key=" + Auth_key,
};

var req = HTTPS.get(options, function (res){
  console.log("STATUS:" + res.statusCode);
  console.log("HEADERS:" + JSON.stringify(res.headers));
  req.on("error", function(e){
    console.log("SHIT");
    console.log("error:" + JSON.stringify(e));
  });
  res.on("end", function(){

    name1 = data.values[1][0];
    rent1 = data.values[1][1];
    name2 = data.values[2][0];
    rent2 = data.values[2][1];
    name3 = data.values[3][0];
    rent3 = data.values[3][1];
    name4 = data.values[4][0];
    rent4 = data.values[4][1];
    name5 = data.values[5][0];
    rent5 = data.values[5][1];
    name6 = data.values[6][0];
    rent6 = data.values[6][1];
    name7 = data.values[7][0];
    rent7 = data.values[7][1];

    var oneStatement = name1 + " owes " + rent1 + ".";
    var twoStatement = " " + name2 + " owes " + rent2 + ".";
    var threeStatement = " " + name3 + " owes " + rent3 + ".";
    var fourStatement = " " + name4 + " owes " + rent4 + ".";
    var fiveStatement = " " + name5 + " owes " + rent5 + ".";
    var sixStatement = " " + name6 + " owes " + rent6 + ".";
    var sevStatement = " " + name7 + " owes " + rent7 + ".";
    rentStatement = oneStatement + twoStatement + threeStatement + fourStatement + fiveStatement + sixStatement + sevStatement;

    postMessage();
  });
});
