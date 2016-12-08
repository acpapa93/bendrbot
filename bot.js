var HTTPS = require('https');
//var gOptions = require ("./googleSheetCall.js");
var botID = process.env.BOT_ID;

//google sheet vars and auths
var Sheet_ID = process.env.SHEET_ID;
var Auth_key = process.env.Auth_Key;
var name1, rent1, name2, rent2, name3, rent3, name4, rent4, name5, rent5, name6, rent6, name7, rent7, rentStatement, owes, per = "";

//request parameters
var gUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + Sheet_ID + "/values/I25%3AJ32?majorDimension=ROWS&key=" + Auth_key;



function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/rent$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    googlePull();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = "GET RENTY: " + rentStatement;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;

//googleSheetCall.js below///////////
var parsed="";
owes=" owes ";
per = ".";
function googlePull() {
    HTTPS.get(gUrl, function(res) {
        var body ="";
        console.log("STATUS:" + res.statusCode);
        console.log("HEADERS:" + JSON.stringify(res.headers));
        res.on("error", function(e) {
            console.log("SHIT");
            console.log("error:" + JSON.stringify(e));
        });
        res.on("data", function(d) {
            body+=d;
          });
        res.on ("end", function() {
          parsed= JSON.parse(body);
          console.log(parsed);

          name1 = parsed.values[1][0];
          rent1 = parsed.values[1][1];
          name2 = parsed.values[2][0];
          rent2 = parsed.values[2][1];
          name3 = parsed.values[3][0];
          rent3 = parsed.values[3][1];
          name4 = parsed.values[4][0];
          rent4 = parsed.values[4][1];
          name5 = parsed.values[5][0];
          rent5 = parsed.values[5][1];
          name6 = parsed.values[6][0];
          rent6 = parsed.values[6][1];
          name7 = parsed.values[7][0];
          rent7 = parsed.values[7][1];

            var oneStatement = name1 + owes + rent1 + per;
            var twoStatement = " " + name2 + owes + rent2 + per;
            var threeStatement = " " + name3 + owes + rent3 + per;
            var fourStatement = " " + name4 + owes + rent4 + per;
            var fiveStatement = " " + name5 + owes + rent5 + per;
            var sixStatement = " " + name6 + owes + rent6 + per;
            var sevStatement = " " + name7 + owes+ rent7 + per;
            rentStatement = oneStatement + twoStatement + threeStatement + fourStatement + fiveStatement + sixStatement + sevStatement;

            postMessage(rentStatement);
          });
        });
      }
