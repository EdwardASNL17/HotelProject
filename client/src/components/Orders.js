import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie'
import {Table} from 'antd'

const Orders=()=>{
    const [cookies,setCookie]=useCookies(['id']);
    const [table,setTable]=useState([])
    const id=cookies.id;
    useEffect(async()=>{
        const response=await fetch('/Home/Orders',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:{
                "UserId":id
            }
        }).then(res=>res.json)
        setTable(response)
    },[])
    const columns = [
        {
          title: 'Hotel ID',
          dataIndex: 'HotelId',
          key: 'HotelId',
        },
        {
          title: 'Date time in',
          dataIndex: 'DateTimeIn',
          key: 'DateTimeIn',
        },
        {
          title: 'Date time out',
          dataIndex: 'DateTimeOut',
          key: 'DateTimeOut',
        },
      ];
    return(
        <Table dataSource={table} columns={columns} />
    )
}
export default Orders