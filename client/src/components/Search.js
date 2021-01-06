import { Card, Button, Rate } from 'antd';
import image from '../img/hotel.webp'

const { Meta } = Card;

const Search =()=>{
  return(
    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={image} />}
    >
        <Meta title="Хаятт Ридженси Сочи"/>
        <Rate disabled defaultValue={4} style={{margin:'10px 0'}}/>
        <h3 style={{marginTop:'0',marginBottom:'0px'}}>36000 руб.</h3>
        <Meta style={{marginTop:'0',marginBottom:'10px'}} description='за 4 ночи'/>
        <Button type='primary' style={{width:'190px'}}>Бронировать</Button>
    </Card>
  );
}

export default Search;