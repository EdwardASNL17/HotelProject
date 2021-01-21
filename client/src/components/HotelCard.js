import { Redirect, useParams } from "react-router-dom"
import moment from 'moment';
import { Carousel, Typography, Rate, Card, Button, Row, Col, DatePicker} from 'antd';
import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";

const {Title}=Typography
const {RangePicker}=DatePicker

const HotelCard=(props)=>{
    const {id}=useParams();
    const [arr,setArr]=useState(['https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg','https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg','https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg','https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg'])
    const [hotel,setHotel]=useState({});
    const [rooms,setRooms]=useState([]); 
    const [redirect,setRedirect]=useState(false)
    const [loading,setLoading]=useState(true)
    const [value,setValue]=useState({})
    const [cookies,setCookie]=useCookies(['id'])
    const userId=cookies.id
    useEffect(async()=>{
        console.log(id)
        const hotelResponse = await fetch(`/Home/Hotels/${id}`).then(res=>res.json());
        const roomsResponse = await fetch(`/Home/Rooms/${id}`).then(res=>res.json());
        setHotel(hotelResponse);
        setRooms(roomsResponse);
        setLoading(false)
    },[])
    const addOrder = async(roomId)=>{
        const order={
            RoomId:+roomId,
            HotelId:+id,
            DateTimeIn:value[0],
            DateTimeOut: value[1],
            UserId:userId
        }
        console.log(order)
        const response = await fetch(`/Home/AddOrder`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(order)
        }).then(res=>res.json())
        
            console.log(response)
        //    setRedirect(true)
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    }
    if(redirect){
        return <Redirect to='/'/>
    }
    if(loading){
        return <h2>Loading...</h2>
    }
    return(
        <div>
            <Title level={2}>{hotel.name}</Title>
            <Rate disabled defaultValue={hotel.rating} style={{margin:'10px 0'}}/>
            <Row>
                <Col span={6}>
                    <Carousel autoplay style={{width:300,height:170,margin:'10px auto'}}>
                        {
                            arr.map(url=>{
                                return <img className='carousel' src={url}/>
                            })
                        }
                    </Carousel>
                </Col>
                <Col span={18}>
                    <Row>
                        <RangePicker disabledDate={disabledDate} style={{margin:'10px'}} onChange={(data,string)=>setValue(string)} format='DD/MM/YYYY'/>
                    </Row>
                    <Row>
                        {rooms.map(room=>{
                        return(
                                <Col span={6}>
                                    <div className="site-card-border-less-wrapper">
                                        <Card size="small" title={room.numClass} key={room.roomId} bordered={false} style={{ width: 200, margin:'10 0 0 20' }}>
                                        <p>Вместимость (человек): {room.capacity}</p>
                                        <p>Стоимость: {room.price}</p>
                                        <Button type='primary' onClick={()=>addOrder(room.roomId)}>Заказать</Button>
                                        </Card>
                                    </div>                                                                                  
                                </Col>
                            )
                        })} 
                    </Row>
                </Col>
            </Row>
            
        </div>
    )
}

export default HotelCard