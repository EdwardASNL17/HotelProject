import { Card, Button, Rate } from 'antd';
import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

const { Meta } = Card;

const Search =(props)=>{
  const [arr,setArr]=useState([]);
  const [redirect,setRedirect]=useState(false);
  const [id,setId]=useState('');
  let obj={}
  const url='https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg'
  useEffect( async ()=>{
    
    obj = props.location.state
    const {city}=props.location.state
    const hotels=await fetch('/Hotels',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"City":city})
    })
    setArr(hotels)
    /*setArr([{id:1,img:'https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4},
                {id:2,img:'https://s01.cdn-pegast.net/get/25/75/1a/8473b85ff7c362403ba2965bcc8c1f1ca60a6ef277262a49d77d588d43/5c811e318a525.jpg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4},
                {id:3,img:'https://s01.cdn-pegast.net/get/25/75/1a/8473b85ff7c362403ba2965bcc8c1f1ca60a6ef277262a49d77d588d43/5c811e318a525.jpg',name:'Хаятт Ридженси Сочи',stars:4,cost:36000,days:4}])
    */
  },[])
  const [img,setImg]=useState('')
  if(redirect){
    return <Redirect to={{pathname: `/Hotels/${id}`, state: obj}}/>
  }
  return(
    <div style={{margin:100}}>
      {arr.map(a=>{
        return(
          <Card
            key={a.id}
            hoverable
            style={{ width: 240, display:'inline-block', margin:'10px' }}
            cover={<img src={url} style={{width:240,height:150}} alt="example"/>}
          >
            <Meta title={a.name}/>
            <Rate disabled defaultValue={a.rating} style={{margin:'10px 0'}}/>
            <Button type='primary' style={{width:'190px'}} onClick={()=>{
              setId(a.id);
              setRedirect(true)
            }}>Подробнее</Button>
        </Card>
        )
      })}
    </div>
  );
}

export default Search;