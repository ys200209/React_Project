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

const multer = require('multer'); // multer 라이브러리 호출
const upload = multer({dest : './upload'}) // 업로드 폴더 설정

app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM customer WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

app.use('/image', express.static('./upload')); // 사용자가 실제로 접근해서 프로필 이미지를 확인할 수 있도록 express.static을 이용
// 이것은 사용자가 image폴더로 접근하는것 같지만 실제 서버로는 upload와 매핑이 된다.

app.post('/api/customers', upload.single('image'), (req, res) => { // upload.single('image')는 사용자가 image라는 이름의 변수로 프로필 이미지의 Binary 데이터를 서버로 전송하기 때문에 그것을 받아오기로 설정. 
  let sql = "INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = '/image/' + req.file.filename; // 사용자 입장에서는 이미지 경로에 있는 파일 이름으로 접근하게 된다.
  let name = req.body.userName;
  let birth = req.body.birth;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(image);
  console.log(name);
  console.log(birth);
  console.log(gender);
  console.log(job);
  let params = [image, name, birth, gender, job]; // 위의 sql의 ?자리수마다 들어갈 값을 배열로 담아둔다.
  connection.query(sql, params, // sql문에 담아둔 파라미터들을 넣어준다.
    (err, rows, fields) => { // 결과값을 받아오고
      res.send(rows); // 데이터(rows)를 클라이언트에게 출력할 수 있도록 한다.
      console.log("Excetpion! : ", err);
    })
  
})

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE customer SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows); // 실제 쿼리 실행결과를 클라이언트 측에 전송해준다.
    }
  )
}); // DELETE 메서드로 접속한 경우, 특정한 아이디값과 매핑된 경우에 처리함.

// '' 가 아닌 `` 처리를 해주어야 포트번호를 제대로 입력 받을 수 있음
app.listen(port, () => console.log(`Listening on port ${port}`));
