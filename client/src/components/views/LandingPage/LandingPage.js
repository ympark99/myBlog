import React, {useEffect} from 'react'
import axios from 'axios';
// 브라우저에서 node.js 기반 express 모듈 인식 못함
// import { response } from 'express';

function LandingPage(props) {


    useEffect(() => {
        axios.get('/api/hello').then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push("/login")
            } else{
                alert('로그아웃에 실패했습니다.')
            }
        })
    }


    return (
        <div style={{
            display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center',
            width : '100%', height : '100vh'
        }}>

        <form style={{display : 'flex', flexDirection : 'row'}}>

            <button onClick = {onClickHandler}>
                로그아웃
            </button>

        </form>

        <h2>시작 페이지</h2>

        </div>
    )
}

export default LandingPage
