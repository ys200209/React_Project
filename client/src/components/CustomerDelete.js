import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : false
        }
    }

    handleClickOpen = () => { // 바인딩 처리
        this.setState({
            open:true
        });
    }

    handleClose = () => { // 바인딩 처리
        this.setState({
            open : false 
        });
    }

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
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;