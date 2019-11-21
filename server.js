const express = require('express'); // expressモジュールを読み込む
const bodyParser = require('body-parser');
const app = express(); // expressアプリを生成する
app.use(express.static('web')); // webフォルダの中身を公開する
// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/onload', (req,res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("todo");
        dbo.collection("todo").find({},{employee_number:179022}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.json(result)
          db.close();
        });
      });
});

app.post('/save', (req, res) => {
    // クライアントからの送信データを取得する
    // const todoData = req.body;
    // const todoTitle = todoData.item;
    console.log("updata value : " + req.body.item);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("todo");
        var myquery = { employee_number: 179022 };
        var newvalues = { $set: { item : String(req.body.item)  } };
        dbo.collection("todo").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
        //   console.log(res);
          console.log("1 document updated");
          db.close();
        });
    });   
});

// ポート3000でサーバを立てる
app.listen(3003, () => console.log('Listening on port 3003'));
