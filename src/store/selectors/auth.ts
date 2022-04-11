import {AppStateType} from "../store";
export const getIsAuth=(state:AppStateType)=>state.login.isAuth
export const getUserData=(state:AppStateType)=>state.login.userData
export const getLoginError=(state:AppStateType)=>state.login.error
export const getIsAppInitialized=(state:AppStateType)=>state.login.isAppInitialized