import {instance} from "./api";
import {EventType} from "../store/reducers/events";
import {StatusListType} from "../components/Actions/Actions";
export const eventsApi={
    getActions:(userId:number | null)=>{
        return instance.get(`events?userId=${userId}`)
    },
    addAction:(userId:number,text:string,status:StatusListType,data:any)=>{
        return instance.post<Omit<EventType, "id">>('events',{
            userId,
            text,
            status,
            data,
        });
}
}
