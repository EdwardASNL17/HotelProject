import logo from './logo.png'
import profilePhoto from './avatar.png'
import { Layout, Menu, Breadcrumb } from 'antd';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Main from './components/Main'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <Layout className="layout">
          <Header>
          <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1" className="logo">
                <Link to='/'><img src={logo}/></Link>
              </Menu.Item>
              <SubMenu style={{marginLeft: '1020px'}} key="2" icon={<img src={profilePhoto}/>} title="">
                <Menu.Item key="Submenu1">
                  <Link to='/signin'>Войти</Link>
                </Menu.Item>
                <Menu.Item key="Submenu2">
                  <Link to='/signup'>Регистрация</Link>
                </Menu.Item>
              </SubMenu>
          </Menu>
          </Header>
          <Content style={{ padding: '0 50px', height: '515px'}}>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route path='/' component={Main}/>
          </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
