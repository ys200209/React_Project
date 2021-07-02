import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display : 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName : '',
            open : false // 현재 다이얼로그창이 열려있는가에 대한 속성
        }
    }

    handleFileChange = (e) => { // 매개변수 (e)vent 를 전달받음
        this.setState({
            file : e.target.files[0], // e.target은 event가 발생한 input값 자체를 의미하는데 그중에 첫번째 값을 설정해준다.
            fileName : e.target.value
        })
    }

    handleValueChange = (e) => { // 매개변수 (e)vent 를 전달받음
        let nextState = {};
        console.log("e.target.name = ", e.target.name);
        console.log("e.name = ", e.name);
        console.log("nextState[e.target.name] = ", nextState[e.target.name]);
        nextState[e.target.name] = e.target.value; // 사용자가 입력한 폼의 name 속성의 값을 실제 state에 저장하겠다는 의미.
        this.setState(nextState); // nextState를 이용해 현재 state 값을 갱신
    }

    handleFormSubmit = (e) => { // 매개변수 (e)vent 를 전달받음
        e.preventDefault(); // 데이터가 서버로 전달될때 오류가 발생하지 않도록 함수 호출.
        this.addCustomer()
            .then((response) => { // 서버로부터 어떠한 response가 건너왔을 때
                console.log(response.data); // 건너온 데이터를 콘솔에 출력
                console.log("stateRefresh() 함수 실행 전");
                this.props.stateRefresh(); // 비동기로 실행되기에 정확하게 추가된 뒤 새로고침되리란 보장이 없으므로 위치를 옮긴다.
                console.log("stateRefresh() 함수 실행 후");
            });
        this.setState({ // 추가하기 버튼을 통해 전송하면 다시 빈칸으로 만들어주기.
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName : ''
        })
        //window.location.reload(); // 페이지 새로고침 (좋지않은 방식)
        // console.log("stateRefresh() 함수 실행 전");
        // this.props.stateRefresh(); // 비동기로 실행되기에 정확하게 추가된 뒤 새로고침되리란 보장이 없으므로 위로 위치를 옮긴다.
        // console.log("stateRefresh() 함수 실행 후");

    }

    addCustomer = () => { // handleFormSubmit에서 불러오는 addCustomer 함수.
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('userName', this.state.userName);
        formData.append('birth', this.state.birth);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = { // 파일이 포함되어있는 데이터를 서버로 전송하고자 할때는
            headers : { // 웹 표준에 맞는 헤더를 추가해주어야 한다.
                // multipart/form-data는 전달하고자 하는 데이터에 파일이 포함되어있을때 설정해주는 요소중 하나
                'content-type' : 'multipart/form-data' 
            }
        }
        return post(url, formData, config); // 해당 url에 폼 데이터를 환경설정에 맞게 post로 전송.
    }

    handleClickOpen = () => { // 바인딩 처리
        this.setState({
            open:true
        });
    }

    handleClose = () => { // 바인딩 처리
        this.setState({
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName : '',
            open : false 
        });
    }

    render() {
        const { classes } = this.props; // 디자인을 입히기 위해서 classes 변수 초기화
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                        <TextField label="생년월일" type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


}

export default withStyles(styles)(CustomerAdd); // 디자인 요소가 적용되면 리턴값이 달라진다.
