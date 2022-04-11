import {Button, Calendar, Cascader, DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker } from 'antd';
import Badge from 'antd/lib/badge';
import React, {useEffect} from 'react';
import './../../App.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getUserData} from "../../store/selectors/auth";
import { Redirect } from 'react-router-dom';
import {addEvent, EventType, getEvents} from "../../store/reducers/events";
import {getEventsSelector, getIsLoading} from "../../store/selectors/events";
import Preloader from "../../common/Preloader/Preloader";
import {getUsers} from "../../store/reducers/users";
import {getIsUsersLoading, getIsUsersReceived, getUsersSelector} from "../../store/selectors/users";
import {inspect} from "util";
import moment, {Moment} from "moment";
import {formatDate} from "../../utils/date";
const { Option } = Select;
export type StatusListType="success" | "processing" | "error" | "default" | "warning"
const Actions=()=>{
    const isAuth=useSelector(getIsAuth);
    const userData=useSelector(getUserData);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getEvents(userData.id));
    },[]);
    const users=useSelector(getUsersSelector);
    const isUsersLoading=useSelector(getIsUsersLoading);
    type ListDataType={
        type:StatusListType,
        content:string
    }
    const events=useSelector(getEventsSelector);
    function getListData(value:Moment):Array<ListDataType> {
        switch (value.date()) {
            case 8:
                return [
                    { type: 'warning', content: 'warning' },
                ];
            case 10:
                return [
                    { type: 'warning', content: 'warning' },]
            case 15:
                return [
                    { type: 'warning', content: 'This is warning' },
                ];
            default:
                return []
        }
    }

    function dateCellRender(value:Moment) {
        const date=value.toISOString();
        const formattedDate=formatDate(new Date(date))
        const currentDayEvents=events.filter(ev=>formatDate(new Date(ev.data))===formattedDate);
        return (
            <>
                <ul className="events">
                    {currentDayEvents.map((item) => (
                        <li style={{listStyle:"none"}} key={item.text}>
                            <Badge status={item.status }  text={item.text} />
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    function getMonthData(value:Moment) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value:Moment) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }
    const isUsersReceived=useSelector(getIsUsersReceived);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const showModal = () => {
        setVisible(true);
      !isUsersReceived &&  dispatch(getUsers());
    };
    type FormEventType={
        textOfEvent:string,
        type:StatusListType,
        userId:number,
        date:Moment
    }
    const handleOk = async (values:FormEventType) => {
      await  dispatch(addEvent(values.userId,values.type,values.textOfEvent,values.date))
        setConfirmLoading(true);
            setVisible(false);
            setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const isLoading=useSelector(getIsLoading);
    if (!isAuth) return <Redirect to={"/login"}/>
    return (
        <div className={"container"}>
            { isLoading ? <Preloader/>:
            <>
                <Calendar style={{marginBottom:"10px"}}
                          dateCellRender={dateCellRender}
                          monthCellRender={monthCellRender} />
                <Button onClick={showModal} style={{width:"100%"}} type={"primary"}>
                    Добавить событие
                </Button>
                <Modal
                    title="Добавить событие"
                    visible={visible}
                    confirmLoading={confirmLoading}
                    footer={null}
                    onCancel={handleCancel}
                >
                        {isLoading ? <Preloader/>:
                            <Form onFinish={handleOk}>
                            <Form.Item rules={[{required:true,message:"Please enter a text of event"}]}
                                       name={"textOfEvent"} label={"Input text of event"}>
                                <Input/>
                            </Form.Item>
                            <Form.Item rules={[
                                {required:true,message:"Please enter a date"},
                                {
                                    validator(_, value:Moment) {
                                        if (value.isSameOrAfter(moment())) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The name must contains at least 3 letters '));
                                    },
                                    message:"You mustn't pick a past date"
                                }
                                ]}
                                       label="Select a date" name={"date"} hasFeedback >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label={"select a type of event"}
                                       rules={[{required:true,message:"Please select a type of event"}]}
                                       name={"type"}
                                       hasFeedback>
                                <Select allowClear>
                                    <Option value="success">success</Option>
                                    <Option value="warning">warning</Option>
                                    <Option value="processing">processing</Option>
                                    <Option value="default">default</Option>
                                    <Option value="error">error</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label={"select a user"}
                                       rules={[{required:true,message:"Please select user"}]}
                                       name={"userId"}>
                                <Select>
                                    {users.map(user=>{
                                        return <Option value={user.id}>{user.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type={"primary"} htmlType={"submit"}>Добавить событие</Button>
                            </Form.Item>
                        </Form>}
                        </Modal>
            </>
            }
        </div>
    )
}
export default Actions