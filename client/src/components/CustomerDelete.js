import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        // /api/customers/1
        const url = '/api/customers/' + id;
        fetch(url, {
            method : 'DELETE' 
            // REST API에서는 DELETE 메서드로 해당 경로에 접속했을 때, 
            // 삭제가 이루어지도록 하는것이 가장 합리적이다.
        });
        this.props.stateRefresh(); // 삭제가 된 이후 새롭게 고객 목록을 불러오는 함수.
    }

    render() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        );
    }
}

export default CustomerDelete;