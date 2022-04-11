import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Preloader:React.FC=()=>{
    const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;
    return (
        <Spin indicator={antIcon} />
    )
}
export default Preloader