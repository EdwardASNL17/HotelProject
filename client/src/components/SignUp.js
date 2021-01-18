import { Form, Input, Button, DatePicker } from 'antd';
import {useState} from 'react'

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6},
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 },
};

const SignUp = () => {
  const [name,setName]=useState('');
  const [surName,setSurName]=useState('');
  const [login,setLogin]=useState('');
  const [birthday,setBirthday]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const onFinish = async() => {
    const user={
      Name:name,
      Surname:surName,
      Login:login,
      Birthday:birthday,
      Email:email,
      Password:password,
      ConfirmPassword:password
    }
    const response= await fetch('/Account/Register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    })
    console.log(response)
  };

  const onFinishFailed = errorInfo => {
    
  };

  return (
    <Form
      {...layout}
      style={{marginTop:'150px'}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e)=>setName(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="surname"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e)=>setSurName(e.target.value)}/>
      </Form.Item>
      <Form.Item label="Дата рождения">
        <DatePicker format='DD/MM/YYYY' onChange={(date, dateString)=>setBirthday(dateString)}/>
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ type: 'email' , required:true}]}>
        <Input onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e)=>setLogin(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button style={{width:'315px'}} type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp