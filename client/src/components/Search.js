import { Card, Button, Rate } from 'antd';
import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

const { Meta } = Card;

const Search =(props)=>{
  //const [arr,setArr]=useState([]);
  const [loading,setLoading]=useState(true);
  const [arr,setArr]=useState([]);
  const {city} = useParams();
  const url='https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg'
  useEffect( async ()=>{
    //obj = props.location.state
    console.log(city)
    
    /*setArr([{id:1,img:'https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4},
                {id:2,img:'https://s01.cdn-pegast.net/get/25/75/1a/8473b85ff7c362403ba2965bcc8c1f1ca60a6ef277262a49d77d588d43/5c811e318a525.jpg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4},
                {id:3,img:'https://s01.cdn-pegast.net/get/25/75/1a/8473b85ff7c362403ba2965bcc8c1f1ca60a6ef277262a49d77d588d43/5c811e318a525.jpg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4}])
    */
      const response=await fetch(`/Home/SearchHotel`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({"City":city})
      }).then(res=>res.json())
      console.log(response)
      setArr(response)
      setLoading(false)
  },[])
  if(loading){
    
    return <h2>Loading...</h2>
  }
  return(
    <div style={{margin:100}}>
      {arr.map(a=>{
        return(
          <Card
            key={a.hotelId}
            hoverable
            style={{ width: 240, display:'inline-block', margin:'10px' }}
            cover={<img src={url} style={{width:240,height:150}} alt="example"/>}
          >
            <Meta title={a.name}/>
            <Rate disabled defaultValue={a.rating} style={{margin:'10px 0'}}/>
            <Link to={`/Home/Hotels/${a.hotelId}`}><Button type='primary' style={{width:'190px'}}>Подробнее</Button></Link>
        </Card>
        )
      })}
    </div>
  );
}

export default Search;