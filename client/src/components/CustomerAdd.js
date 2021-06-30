import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName : ''
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
        nextState[e.target.name] = e.target.name; // 사용자가 입력한 폼의 name 속성의 값을 실제 state에 저장하겠다는 의미.
        this.setState(nextState); // nextState를 이용해 현재 state 값을 갱신
    }

    handleFormSubmit = (e) => { // 매개변수 (e)vent 를 전달받음
        e.preventDefault(); // 데이터가 서버로 전달될때 오류가 발생하지 않도록 함수 호출.
        this.addCustomer()
            .then((response) => { // 서버로부터 어떠한 response가 건너왔을 때
                console.log(response.data); // 건너온 데이터를 콘솔에 출력
            });

    }

    addCustomer = () => { // handleFormSubmit에서 불러오는 addCustomer 함수.
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
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

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.state.handleValueChange} /><br/>
                생년월일 : <input type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        );
    }


}

export default CustomerAdd;
