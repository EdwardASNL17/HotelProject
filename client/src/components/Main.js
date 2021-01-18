import 'moment/locale/ru';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/ru_RU';
import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, Typography, DatePicker } from 'antd';
import imgCity from '../img/city.png'
import Search from './Search'

const { Title, Paragraph } = Typography;
const {RangePicker} = DatePicker;

const Main = ()=>{
    const [form] = Form.useForm();
    const [city,setCity]=useState('');
    const [peopleCount,setPeopleCount]= useState(1);
    const [numberCount,setNumberCount]= useState(1);
    const [childrenCount,setChildrenCount]= useState(0);
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState();
    const [isVisible,setVisible]= useState(false);
    const [, forceUpdate] = useState();
    const [redirect,setRedirect]=useState(false);
    const [redirectData,setRedirectData]=useState({})

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);
    const onFinish = () => {
        const DateTimeIn=dates[0]
        const DateTimeOut=dates[1]
        const search={
            city,
            DateTimeIn,
            DateTimeOut,
            peopleCount,
            childrenCount,
            numberCount
        }
        setRedirectData(search);
        setRedirect(true);
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current <= (moment().startOf('day'))+1;
    };
    if(redirect){
        return(
            <Redirect
                to={{
                    pathname: "/Hotels",
                    state: redirectData
                }}
            />
        )
    }
    
    return(
        <div className='main'>
            <Title level={3} style={{textAlign:'center'}}>Найдите спецпредложения для отелей, домов и других вариантов</Title>
            <Paragraph style={{textAlign:'center'}}>От уютных загородных домов до стильных городских квартир</Paragraph>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{margin:'7% 12%'}}>
            <Form.Item name="city"
                rules={[{ required: true, message: 'Please input city!' }]}
            >
                <Input onChange={(e)=>setCity(e)} prefix={<img src={imgCity}/>} placeholder="Город" />
            </Form.Item>
            <Form.Item>
                <RangePicker format='DD/MM/YY' disabledDate={disabledDate} locale={locale} style={{height:'34px'}}
                onCalendarChange={(value, dateString) => setDates(dateString)} onChange={(value, dateString) => setValue(dateString)}/>
            </Form.Item>
            <Form.Item>
                <Button style={{height:'34px',width:'270px'}} onClick={()=>isVisible?setVisible(false):setVisible(true)}>
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
            {
                isVisible?
                <div class='modal'>
                    <div className='modal-item'><span className='modal-label'>Взрослых: </span><Button className='modal-button' onClick={()=>peopleCount==1?1:setPeopleCount(peopleCount-1)}>-</Button>
                     <span className='modal-value'>{peopleCount}</span>
                    <Button className='modal-button' onClick={()=>peopleCount<20?setPeopleCount(peopleCount+1):20}>+</Button></div>
                    <div className='modal-item'><span className='modal-label'>Номеров: </span><Button className='modal-button' onClick={()=>numberCount==1?1:setNumberCount(numberCount-1)}>-</Button>
                    <span className='modal-value'>{numberCount}</span>
                    <Button className='modal-button' onClick={()=>numberCount<10?setNumberCount(numberCount+1):10}>+</Button></div>
                    <div className='modal-item'><span className='modal-label'>Детей: </span><Button className='modal-button' onClick={()=>childrenCount==0?0:setChildrenCount(childrenCount-1)}>-</Button>
                    <span className='modal-value'>{childrenCount}</span>
                    <Button className='modal-button' onClick={()=>childrenCount<10?setChildrenCount(childrenCount+1):10}>+</Button></div>
                </div>
                :''
            }
            
            </Form>
        </div>
    )
}

export default Main