import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper'
import Customer from './components/Customer'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : 'auto'
  },
  table : {
    minWidth : 1080
  }
})

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
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
            {customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job} /> )})}
          </TableBody>
        </Table>
      </Paper>
      
    );
  }
  
}

/*
<div>

      </div>
*/
//export default App;
export default withStyles(styles)(App);