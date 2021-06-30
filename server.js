const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env_PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
// 여기까지는 node.js 에서의 기본적인 문법 포트설정 및 인코딩

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});
console.log("connection");
connection.connect(); // 실제 DB와 연결을 수행

app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM customer",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

// '' 가 아닌 `` 처리를 해주어야 포트번호를 제대로 입력 받을 수 있음
app.listen(port, () => console.log(`Listening on port ${port}`));
