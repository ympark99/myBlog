import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataTosubmit){
    // state의 입력된 정보 서버로 전송
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data) // 서버에서 받은 데이터 request에 저장
        // request reducer에 넘기기
        return {
            type : LOGIN_USER,
            payload : request,
        }
}

export function registerUser(dataTosubmit){
    // state의 입력된 정보 서버로 전송
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data) // 서버에서 받은 데이터 request에 저장
        // request reducer에 넘기기
        return {
            type : REGISTER_USER,
            payload : request,
        }
}