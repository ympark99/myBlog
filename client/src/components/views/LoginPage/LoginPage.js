import React, {useState} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    // 데이터 변화를 위해 state 생성
    const [Email, setEmail] = useState("") // 초기값 빈 스트링
    const [Password, setPassword] = useState("")

    // 키보드 입력시 입력내용 input tag에 써줌
    const onEmailHandler = (event) => {        
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 로그인 버튼 클릭시 리프레시 막아줌

        let body = {
            email : Email,
            password : Password
        }

        
        // action 함수 실행
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/') // 루트 페이지로 컴백
                } else {
                    alert('Error˝')
                }
            })
    }

    return (
        <div style={{
            display : 'flex', justifyContent : 'center', alignItems : 'center',
            width : '100%', height : '100vh'
        }}>
        <form style={{display : 'flex', flexDirection : 'column'}}
            onSubmit = {onSubmitHandler}
        >
        <label>Email</label>
        <input type = "email" value = {Email} onChange = {onEmailHandler} />
        <label>Password</label>
        <input type = "password" value = {Password} onChange = {onPasswordHandler} />        

        <br />

        <button>
            Login
        </button>

        </form>

        </div>
    )
}

export default withRouter(LoginPage)
