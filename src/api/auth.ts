import {instance} from "./api";
export type userType={
    id:number
    name:string,
    email:string
    password:string
}
export const authApi={
    login:(userName:string,password:string)=>{
       return instance.get<userType[]>(`users?name=${userName}&password=${password}`)
    },
    signIn:(name:string,password:string,email:string)=>{
        return instance.post(`users`,{
            name,
            password,
            email
        })
}
}