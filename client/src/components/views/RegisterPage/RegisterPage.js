import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {    
    const dispatch = useDispatch();

    // 데이터 변화를 위해 state 생성
    const [Email, setEmail] = useState("") // 초기값 빈 스트링
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("") // 초기값 빈 스트링
    const [ConfirmPassword, setConfirmPassword] = useState("")    

    // 키보드 입력시 입력내용 input tag에 써줌
    const onEmailHandler = (event) => {        
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }        
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 로그인 버튼 클릭시 리프레시 막아줌

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        let body = {
            name : Name,
            email : Email,
            password : Password
        }

        
        // action 함수 실행
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                }else{
                    alert('회원가입에 실패했습니다.')
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

        <label>Name</label>
        <input type = "text" value = {Name} onChange = {onNameHandler} />  

        <label>Password</label>
        <input type = "password" value = {Password} onChange = {onPasswordHandler} />  

        <label>Confirm Password</label>
        <input type = "password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler} />        

        <br />

        <button>
            회원가입
        </button>

        </form>

        </div>
    )
}

export default RegisterPage
