import {instance} from "./api";
import {userType} from "./auth";
export const usersApi={
    getUsers:()=>{
        return instance.get<userType[]>('users');
    }
}
