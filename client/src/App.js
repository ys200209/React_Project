import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper'
import Customer from './components/Customer'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : 'auto'
  },
  table : {
    minWidth : 1080
  },
  progress: {
    margin : theme.spacing.unit * 2
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers : '',
      completed : 0
    }
  }

  stateRefresh = () => { // state를 초기화해주는 함수
    this.setState({
      customers : '',
      completed : 0
    });
    this.callApi() // 고객 데이터를 불러오는 부분
      .then(res => this.setState({customers : res}))
      .catch(err => console.log("Exception! : ", err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi() // 고객 데이터를 불러오는 부분
      .then(res => this.setState({customers : res}))
      .catch(err => console.log("Exception! : ", err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed : completed + 1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => { 
                return ( <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job} /> )
              }) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
  
}

/*
<div>

      </div>
*/
//export default App;
export default withStyles(styles)(App);