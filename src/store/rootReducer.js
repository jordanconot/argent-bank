import { combineReducers } from "@reduxjs/toolkit";
import useReducer from '../slice/sliceUser';
import profileSlice from "../slice/sliceProfile";

const rootReducer = combineReducers({
    user: useReducer,
    profile: profileSlice
});

export default rootReducer;