import {BaseThunkType, inferActionsType} from "../store";
import {eventsApi} from "../../api/actions";
import { StatusListType } from "../../components/Actions/Actions";
const initialState={
    isLoading:false,
    events:[] as Array<Partial<EventType>>
}
export const eventsReducer=(state=initialState,action:ActionsType):InitialStateType=>{
switch (action.type) {
    case "events/SET_EVENT":{
        return  {...state,events:[...state.events,action.payload]}
    }
    case "events/SET_IS_LOADING":{
        return {...state,isLoading: action.payload}
    }
    case "events/SET_EVENTS":{
        console.log(action.payload)
        return {...state,events:action.payload }
    }
    default:{
        return state
    }
}
}
const eventsAction={
    setIsLoading:(isLoading:boolean)=>({type:"events/SET_IS_LOADING",payload:isLoading} as const ),
    setEvent:(event:Partial<EventType>)=>({type:"events/SET_EVENT",payload:event} as const),
    setEvents:(events:Array<EventType>)=>({type:"events/SET_EVENTS",payload:events} as const)
}
export const addEvent=(userId:number,status:StatusListType,text:string,data:any):ThunkType=>async dispatch=>{
    dispatch(eventsAction.setIsLoading(true));
    const res=await eventsApi.addAction(userId,text,status,data);
    if (res.statusText==="OK"){
        dispatch(eventsAction.setEvent(res.data));
    }
    dispatch(eventsAction.setIsLoading(false));
}
export  const getEvents=(userId:number | null):ThunkType=>async dispatch=>{
    dispatch(eventsAction.setIsLoading(true));
    const res=await eventsApi.getActions(userId);
    if (res.statusText==="OK"){
        dispatch(eventsAction.setEvents(res.data));
    }
    dispatch(eventsAction.setIsLoading(false));
}
type ActionsType=inferActionsType<typeof eventsAction>
type ThunkType=BaseThunkType<ActionsType>;
export type EventType={
    id:number,
    status:StatusListType,
    text:string,
    userId:number,
    data:any
}
type InitialStateType=typeof initialState
