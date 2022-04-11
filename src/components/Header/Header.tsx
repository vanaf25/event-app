import {Col, Menu, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { Button } from 'antd/lib/radio';
import React from 'react';
import './../../App.css'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getUserData} from "../../store/selectors/auth";
import {authActions} from "../../store/reducers/login";
 const HeaderComponent:React.FC= ()=>{
    const isAuth=useSelector(getIsAuth);
    const userData=useSelector(getUserData);
    const dispatch=useDispatch();
    return (
            <Header>
                <div className={"container"}>
                <Menu style={{display:"flex",justifyContent:"flex-end"}}
                      theme="dark" mode="horizontal"  >
                    {
                        isAuth ?
                            <Row>
                                <Col>
                                    <span>{userData.name}</span>
                                </Col>
                                <Col style={{marginLeft:"10px"}}>
                                    <Button onClick={()=>dispatch(authActions.loginOut())} >
                                        Выйти
                                    </Button>
                                </Col>

                            </Row>:
                            <Menu.Item>
                                Login
                            </Menu.Item>
                    }

                </Menu>
                </div>
            </Header>

    )
}
export default HeaderComponent