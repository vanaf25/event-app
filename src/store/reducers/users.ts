import {authApi, userType} from "../../api/auth";
import {BaseThunkType, inferActionsType} from "../store";
import {usersApi} from "../../api/users";
const initialState={
    users:[] as Array<userType>,
    isUsersLoading:true,
    isUsersReceived:false
}
const usersReducer=(state=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "users/SET_USERS":{
            return {...state,users:action.payload,isUsersLoading: true }
        }
        case "users/SET_IS_USERS_LOADING":{
            return {...state,isUsersLoading: action.payload}
        }
        default:
            return state
    }
}
export const usersActions={
    setIsUsersLoading:(isLoading:boolean)=>({type:"users/SET_IS_USERS_LOADING",payload:isLoading} as const),
    setUsers:(users:Array<userType>)=>({type:"users/SET_USERS",payload:users} as const)

}
export const getUsers=():ThunkType=>async (dispatch)=>{
    dispatch(usersActions.setIsUsersLoading(true));
    const res=await usersApi.getUsers();
    if (res.statusText==="OK"){
       dispatch(usersActions.setUsers(res.data));
    }
    dispatch(usersActions.setIsUsersLoading(false));
}
type ActionsType=inferActionsType<typeof usersActions>
type ThunkType=BaseThunkType<ActionsType>;
type InitialStateType=typeof initialState
export default usersReducer