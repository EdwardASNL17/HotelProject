import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import city from '../img/city.png'

const { Title, Paragraph } = Typography;
const {RangePicker} = DatePicker;

const Main = ()=>{
    const [form] = Form.useForm();
    const [peopleCount,setPeopleCount]= useState(2);
    const [numberCount,setNumberCount]= useState(1);
    const [childrenCount,setChildrenCount]= useState(1)
    const [, forceUpdate] = useState();

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        console.log('Finish:', values);
    };
    return(
        <div className='main'>
            <Title level={3} style={{textAlign:'center'}}>Найдите спецпредложения для отелей, домов и других вариантов</Title>
            <Paragraph style={{textAlign:'center'}}>От уютных загородных домов до стильных городских квартир</Paragraph>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{margin:'7% 14%'}}>
            <Form.Item name="city"
                rules={[{ required: true, message: 'Please input city!' }]}
            >
                <Input prefix={<img src={city}/>} placeholder="Город" />
            </Form.Item>
            <Form.Item>
                <RangePicker style={{height:'34px'}}/>
            </Form.Item>
            <Form.Item>
                <Button style={{height:'34px'}}>
                    {peopleCount>1?`${peopleCount} взрослых`:'1 взрослый'} &#183; {childrenCount==0?'без детей':childrenCount==1?'1 ребёнок':`${childrenCount} детей`} &#183; {numberCount==1?'1 номер':(numberCount>1&&numberCount<5)?`${numberCount} номера`: `${numberCount} номеров`}
                </Button>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                <Button
                    style={{height:'34px'}}
                    type="primary"
                    htmlType="submit"
                    disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                >
                    Поиск отелей
                </Button>
                )}
            </Form.Item>
            </Form>
        </div>
    )
}

export default Main