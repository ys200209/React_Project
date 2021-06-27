import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'

const customers = [
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
]

class App extends Component {
  render() {
    return (
      <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birth={c.birth}
              gender={c.gender}
              job={c.job}
            />
          );
        })
      }
      </div>
      
    );
  }
  
}

/*
<div>

      </div>
*/
export default App;