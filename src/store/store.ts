import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import loginReducer from "./reducers/login";
import thunkMiddleWare, { ThunkAction } from "redux-thunk"
import {eventsReducer} from "./reducers/events";
import usersReducer from "./reducers/users";
const rootReducer=combineReducers({
   login:loginReducer,
   events:eventsReducer,
   users:usersReducer,
});
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
export   type AppStateType=ReturnType<typeof  rootReducer>;
export type BaseThunkType<A extends Action,R=Promise<void> >=ThunkAction<R,AppStateType,unknown,A>
export type inferActionsType<T> =T extends {[key:string]:(...args:any[])=>infer U } ? U:never;
// @ts-ignore;
window.store=store;