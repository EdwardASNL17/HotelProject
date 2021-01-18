import { Redirect, useParams } from "react-router-dom"
import { Carousel, Typography, Rate, Card, Button} from 'antd';
import { useEffect, useState } from "react";

const {Title}=Typography

const HotelCard=(props)=>{
    const {id}=useParams();
    const [arr,setArr]=useState([])
    const [hotel,setHotel]=useState({});
    const [rooms,setRooms]=useState([]); 
    const [redirect,setRedirect]=useState(false)
    useEffect(async()=>{
        const hotel = await fetch(`/Home/Hotels/${id}`);
        const rooms = await fetch(`/Home/Rooms/${id}`);
        setHotel(hotel.body);
        setRooms(rooms.body);
    },[])
    const addOrder = async(roomId)=>{
        const body= props.location.state;
        const response = await (`/Home/AddOrder/${id}/${roomId}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        if(response.status=='200'){
            console.log(response.body)
            setRedirect(true)
        }else{
            console.log('bad request')
        }
    }
    if(redirect){
        return <Redirect to='/'/>
    }
    return(
        <div>
            <Title level={2}>{hotel.name}</Title>
            <Rate disabled defaultValue={hotel.rating} style={{margin:'10px 0'}}/>
            <Carousel autoplay style={{width:600,height:340,margin:'10px auto'}}>
                {
                    arr.map(url=>{
                        return <img className='carousel' src='https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg'/>
                    })
                }
            </Carousel>
            {rooms.map(a=>{
                return(
                    <div className="site-card-border-less-wrapper">
                        <Card title="Card title" key={a.id} style={{ width: 300 }}>
                        <p>Класс: {a.numClass}</p>
                        <p>Вместимость: {a.capacity}</p>
                        <p>Стоимость: {a.price} руб.</p>
                        <Button type='primary' onclick={addOrder(a.id)}>Забронировать</Button>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default HotelCard