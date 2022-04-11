import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth} from "../../store/selectors/auth";
import {Link, Redirect} from "react-router-dom";
import {signUp} from "../../store/reducers/login";
const SignUp:React.FC=()=>{
    type ValuesType={
        email:string,
        rememberMe:false,
        password:string,
        confirm:string,
        username:string
    }
    const dispatch=useDispatch();
    const onFinish = (values: ValuesType) => {
        dispatch(signUp(values.username,values.password,values.email,values.rememberMe));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const isAuth=useSelector(getIsAuth);
    return (
        <>
            {
                isAuth ? <Redirect to={"/"} />:
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
                                name="username"
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your username!' },
                                    {
                                        validator(_, value) {
                                            if (value?.trim().length>=3) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The name must contains at least 3 letters '));
                                        },
                                        message:"The name must contains at least 3 letters"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="E-mail"
                                name="email"
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your e-mail!' },
                                    { type:"email",
                                        message:
                                            'Enter a valid email address!'}]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    {validator(_,value,callback){
                                            if (value.match((/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,32})$/))){
                                                callback()
                                            }
                                            else{
                                                callback(`Password must contains:
                                 at least 8 symbols;
                                 at least one number;
                                 at least 1 lowercase character (a-z)
                                 contain at least 1 uppercase character (A-Z)
                                 contain only numbers i letters
                                '
                                `)
                                            }
                                        }
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    SignUp
                                </Button>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                                <p> Have an account? <Link to={"/login"}>SignIn</Link></p>
                            </Form.Item>
                        </Form>
                    </div>
            }
        </>

    )
}
export default SignUp
/* document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";*/