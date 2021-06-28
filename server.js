const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const port = process.env_PORT || 5000;

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended : true}));
// 여기까지는 node.js 에서의 기본적인 문법 포트설정 및 인코딩

app.get('/api/hello', (req, res) => { // '/api/hello' 접속시 처리할 내용 (메세지 전송)
    res.send({message : 'Hello Express!'})
});

// '' 가 아닌 `` 처리를 해주어야 포트번호를 제대로 입력 받을 수 있음
app.listen(port, () => console.log(`Listening on port ${port}`));
