import { Form, Input, Button, DatePicker } from 'antd';
import {useState} from 'react'
import { Redirect } from 'react-router-dom';

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
  const [redirect,setRedirect]=useState(false)
  const onFinish = async() => {
    const user={
      Name:name,
      Surname:surName,
      UserName:login,
      BirthDate:birthday,
      Email:email,
      Password:password,
      PasswordConfirm:password
    }
    const response= await fetch('/Account/Register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    })
    if(response.status=='200'){
      
      setRedirect(true)
    }
    else{
      console.log('bad request')
    }
  };

  const onFinishFailed = errorInfo => {
    console.log(errorInfo)
  };
  if(redirect){
    return(
      <Redirect to='/'/>
    )
  }
  return (
    <Form
      {...layout}
      style={{marginTop:'100px'}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Введите имя!' }]}
      >
        <Input onChange={(e)=>setName(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="surname"
        rules={[{ required: true, message: 'Введите фамилию!' }]}
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
        rules={[{ required: true, message: 'Введите логин!' }]}
      >
        <Input onChange={(e)=>setLogin(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль!' }]}
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