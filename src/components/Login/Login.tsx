import {Button, Checkbox, Form, Input } from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect } from "react-router-dom";
import {login} from "../../store/reducers/login";
import {getIsAuth} from "../../store/selectors/auth";
const Login  = () => {
    const dispatch=useDispatch();
    const onFinish = (values: any) => {
        debugger;
        dispatch(login(values.name,values.password,values.rememberMe))
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
const isAuth=useSelector(getIsAuth);
    return (
        <>
            {isAuth ? <Redirect to={"/"}/>:
            <div style={{maxWidth:"600px",margin:"0 auto"}}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="rememberMe" valuePropName="checked"
                               wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                        <p>Dont have an account? <Link to={"/signup"}>SignUp</Link></p>
                    </Form.Item>
                </Form>
            </div> }
            </>
    );
};
export default Login