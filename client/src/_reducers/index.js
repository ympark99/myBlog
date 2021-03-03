// store의 reducer들을 root reducer에서 하나로 합쳐줌
import {combineReducers} from 'redux';
// import user from './user_reducer';

// combineReducers 을 rootReducer로 합쳐줌
const rootReducer = combineReducers({
    // user,
})

export default rootReducer;