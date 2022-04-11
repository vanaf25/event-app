import {AppStateType} from "../store";
export const getUsersSelector=(state:AppStateType)=>state.users.users
export const getIsUsersLoading=(state:AppStateType)=>state.users.isUsersLoading
export const getIsUsersReceived=(state:AppStateType)=>state.users.isUsersReceived