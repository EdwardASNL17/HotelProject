import 'moment/locale/ru';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Form, Input, Button, Typography, DatePicker } from 'antd';
import imgCity from '../img/city.png'

const { Title, Paragraph } = Typography;

const Main = ()=>{
    const [city,setCity]=useState('');
    return(
        <div className='main'>
            <Title level={3} style={{textAlign:'center'}}>Найдите спецпредложения для отелей, домов и других вариантов</Title>
            <Paragraph style={{textAlign:'center'}}>От уютных загородных домов до стильных городских квартир</Paragraph>
            <Form.Item name="city"
                rules={[{ required: true, message: 'Please input city!' }]}
            >
                <Input style={{height:'34px',width:'270px', margin:'10px 40%'}} onChange={(e)=>setCity(e.target.value)} prefix={<img src={imgCity}/>} placeholder="Город" />
            </Form.Item>
            
            <Form.Item>
                <Link to={`/Home/SearchHotel/${city}`}>
                    <Button type='primary' style={{height:'34px',width:'270px', margin:'0 40%'}} >
                        Поиск
                    </Button>
                </Link>
            </Form.Item>
            
        </div>
    )
}

export default Main