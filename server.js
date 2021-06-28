const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const port = process.env_PORT || 5000;

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended : true}));
// 여기까지는 node.js 에서의 기본적인 문법 포트설정 및 인코딩

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'https://placeimg.com/64/64/1',
            'name' : '홍길동',
            'birth' : '981001',
            'gender' : '남자',
            'job' : '대학생'},
          {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : '강감찬',
            'birth' : '960201',
            'gender' : '여자',
            'job' : '선생님'},
            {
              'id' : 3,
              'image' : 'https://placeimg.com/64/64/3',
              'name' : '이순신',
              'birth' : '950820',
              'gender' : '남자',
              'job' : '프로그래머'}
    ]);
})

// '' 가 아닌 `` 처리를 해주어야 포트번호를 제대로 입력 받을 수 있음
app.listen(port, () => console.log(`Listening on port ${port}`));
