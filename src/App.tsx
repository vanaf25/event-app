import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import Header from './components/Header/Header';
import Login from "./components/Login/Login";
import {Button, Layout, Result,  } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import SignUp from "./components/SignUp/SignUp";
import {Redirect, Route, Switch } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {authMe} from "./store/reducers/login";
import Actions from "./components/Actions/Actions";
import {getIsAppInitialized} from "./store/selectors/auth";
import Preloader from "./common/Preloader/Preloader";
function App() {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(authMe());
    },[]);
    const isAppInitialized=useSelector(getIsAppInitialized);
  return (
      <>
          {
              isAppInitialized ?
                  <Layout style={{minHeight:"100%"}}  className="layout wrapper">
                      <Header/>
                      <Content style={{padding:"50px 0", flex:"1 1 auto"}}>
                          <Switch>
                              <Route exact path={'/'} render={()=><Redirect to={"/actions"}/>} />
                              <Route exact path={"/actions"} render={()=><Actions/>}  />
                              <Route exact path={"/login"} render={()=><Login/>}/>
                              <Route exact path={"/signup"} render={()=><SignUp/>}/>
                              <Route exact path={"*"} render={()=> <Result
                                  status="404"
                                  title="404"
                                  subTitle="Sorry, the page you visited does not exist."
                                  extra={<Button type="primary">Back Home</Button>}
                              />}/>
                          </Switch>
                      </Content>
                      <Footer style={{ textAlign: 'center',color:"#ddd",backgroundColor:"#2e2e2e" }}>Ant Design ©2018 Created by Ant UED</Footer>
                  </Layout>:<Preloader/>
          }
      </>

  )
}

export default App;
