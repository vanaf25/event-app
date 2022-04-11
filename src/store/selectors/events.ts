import {AppStateType} from "../store";
export const getEventsSelector=(state:AppStateType)=>state.events.events
export const getIsLoading=(state:AppStateType)=>state.events.isLoading