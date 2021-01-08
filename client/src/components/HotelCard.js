import { useParams } from "react-router-dom"
import { Carousel } from 'antd';
import { useEffect, useState } from "react";

const HotelCard=()=>{
    const {id}=useParams();
    const [arr,setArr]=useState([]) 
    useEffect(()=>{
        return setArr(['https://cf.bstatic.com/images/hotel/max1024x768/259/259279353.jpg',
        'https://cf.bstatic.com/images/hotel/max1024x768/227/227923022.jpg',
        'https://cf.bstatic.com/images/hotel/max1024x768/269/269916456.jpg',
        'https://cf.bstatic.com/images/hotel/max1024x768/168/168980549.jpg',
        'https://cf.bstatic.com/images/hotel/max1024x768/115/115068175.jpg'])
    },[])
    return(
        <Carousel autoplay style={{width:600,height:340,backgroundColor:'#'}}>
            {
                arr.map(url=>{
                    return <img className='carousel' src={url}/>
                })
            }
        </Carousel>
    )
}

export default HotelCard