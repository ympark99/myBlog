import React, {useEffect} from 'react'
import axios from 'axios';
// 브라우저에서 node.js 기반 express 모듈 인식 못함
// import { response } from 'express';

function LandingPage() {


    useEffect(() => {
        axios.get('/api/hello').then(response => console.log(response.data))
    }, [])


    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
