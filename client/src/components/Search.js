import { Card, Button, Rate } from 'antd';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const { Meta } = Card;

const Search =(props)=>{
  const [arr,setArr]=useState([]);
  useEffect(()=>{
    /*
    const obj = props.location.state
    {
      { startDay, endDay, peopleCount, numberCount, childrenCount }
    }
    */
    return setArr([{id:1,img:'https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4},
                {id:2,img:'https://s01.cdn-pegast.net/get/25/75/1a/8473b85ff7c362403ba2965bcc8c1f1ca60a6ef277262a49d77d588d43/5c811e318a525.jpg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4},
                {id:3,img:'https://s01.cdn-pegast.net/get/25/75/1a/8473b85ff7c362403ba2965bcc8c1f1ca60a6ef277262a49d77d588d43/5c811e318a525.jpg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4}])
  },[])
  const [img,setImg]=useState('')
  return(
    <div style={{margin:100}}>
      {arr.map(a=>{
        return(
          <Card
            key={a.id}
            hoverable
            style={{ width: 240, display:'inline-block', margin:'10px' }}
            cover={<img src={a.img} style={{width:240,height:150}} alt="example"/>}
          >
            <Meta title={a.name}/>
            <Rate disabled defaultValue={a.stars} style={{margin:'10px 0'}}/>
            <h3 style={{marginTop:'0',marginBottom:'0px'}}>{a.cost} руб.</h3>
            <Meta style={{marginTop:'0',marginBottom:'10px'}} description={`за ${a.days} ночи`}/>
            <Link to={`/hotel/${a.id}`}><Button type='primary' style={{width:'190px'}}>Подробнее</Button></Link>
        </Card>
        )
      })}
    </div>
  );
}

export default Search;