import {authApi, userType} from "../../api/auth";
import {BaseThunkType, inferActionsType} from "../store";
const initialState={
isAuth:false,
    userData: {
        id:null as number | null,
        email:null as string | null,
        password:null as string | null,
        name:null as string | null,
    },
    error:"",
    isLoading: false,
    isAppInitialized:false
}
function setCookie(name:string, value:string, options:any = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
function deleteCookie(...names:string[]) {
    names.forEach(name=>{
        setCookie(name, "");
    });
}
const loginReducer=(state=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "auth/SET_USER_DATA":{
            return {...state,
                isAuth: action.payload.isAuth,
                error: "",
               userData: action.payload.userData
            }
        }
        case "auth/SET_ERROR":{
            return {...state,error: action.payload}
        }
        case "auth/LOGIN_OUT":{
            deleteCookie("name","id","password","email");
            return {...state,userData: {
                id:null,
                    email: null,
                    name: null,
                    password: null
                },
                isAuth: false
            }
        }
        case "auth/SET_IS_APP_INITIALIZED":{
            return {...state,isAppInitialized: action.payload}
        }
        case "auth/SET_IS_LOADING":{
            return {...state,isLoading: action.payload}
        }
        default:
            return state
    }
}
export const authActions={
    authMe:(id:number | null,email:string | null,password:string | null,name:string | null,isAuth:boolean)=>({type:"auth/SET_USER_DATA",
        payload:{
        isAuth,
        userData: {
            id,email,password,name
        }
        }
    } as const),
    setError:(errorText:string)=>({type:"auth/SET_ERROR",payload:errorText} as const),
    loginOut:()=>({type:"auth/LOGIN_OUT"} as const),
    setIsLoading:(payload:boolean)=>({type:"auth/SET_IS_LOADING",payload} as const),
    setIsAppInitialed:(payload:boolean)=>({type:"auth/SET_IS_APP_INITIALIZED",payload} as const)
}
export const login=(name:string,password:string,rememberMe:boolean):ThunkType=>async (dispatch)=>{
    dispatch(authActions.setIsLoading(true));
    const res=await authApi.login(name,password);
    if (res.statusText==="OK"){
        const data=res.data
        if (data.length){
            dispatch(loginMe(Object.assign({},data[0],{rememberMe})))
        }
        else{
        dispatch(authActions.setError("Incorrect email or password"))
        }
    }
    dispatch(authActions.setIsLoading(false));
}
export const loginMe=({id,name,password,email,rememberMe}:userType & {rememberMe:boolean}):ThunkType=>async dispatch=>{
    rememberMe && setCookie("expires","Fri, 31 Dec 9999 23:59:59 GMT")
    setCookie("name",name);
    setCookie("password",password);
    setCookie("id",String(id));
    setCookie("email",email);
    dispatch(authActions.authMe(id,email,password,name,true));
}
export const authMe=():ThunkType=>async dispatch=>{
    function getCookie(name:string) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    const name=getCookie("name");
    const password=getCookie("password");
    const id=getCookie("id");
    const email=getCookie("email")
    if (name && password && id && email){
        dispatch(authActions.authMe(+id,email,password,name,true));
    }
    dispatch(authActions.setIsAppInitialed(true));
}

export const signUp=(name:string,password:string,email:string,rememberMe:boolean):ThunkType=>async dispatch=>{
    const res=await authApi.signIn(name,password,email);
    //@ts-ignore
    const data:userType=res.data;
    if (res.statusText==="OK"){
        dispatch(loginMe(Object.assign({},data,{rememberMe})))
    }
}
type ActionsType=inferActionsType<typeof authActions>
type ThunkType=BaseThunkType<ActionsType>;
type InitialStateType=typeof initialState
export default loginReducer