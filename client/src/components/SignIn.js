import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {useCookies} from 'react-cookie'

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6},
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 },
};

const SignIn = () => {
  const [login,setLogin]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const [cookie,setCookie]=useCookies(['id'])

  const onFinish = async() => {
    const user={
      "UserName":login,
      "Password":password
    }
    const response = await fetch('/Account/Login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    }).then(res=>res.json())
      setCookie('id',response)
      setRedirect(true)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  if(redirect){
    return(
      <Redirect to='/'/>
    )
  }
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
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn