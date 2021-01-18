import { Card, Button, Rate } from 'antd';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const { Meta } = Card;

const Search =()=>{

  const [arr,setArr]=useState([]);
  const [redirect,setRedirect]=useState(false);
  const [id,setId]=useState('');
  const {city}=useParams()
  let obj={}
  const url='https://www.multitour.ru/files/imgs/1bf36c65ecfe4dc44b2ae26353c06e13e15732ba.jpeg'
  const refetch= async()=>{
      const hotels=await fetch('/Home/SearchHotel',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({"City":city})
      })
      console.log(hotels.data)
      setArr(hotels.body)
  }
  useEffect(()=>refetch,[arr])
  /*if(redirect){
    return <Redirect to={{pathname: `/Hotels/${id}`, state: obj}}/>
  }*/
  function onclickButton(id){
    setId(id);
    setRedirect(true)
  }
  return(
    <Button onClick={refetch}>get data</Button>
    /*<div style={{margin:100}}>
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
            <Button type='primary' style={{width:'190px'}} onClick={onclickButton(a.id)}>Подробнее</Button>
          </Card>
        )
      })}
    </div>*/
  );
}

export default Search;