import logo from './logo.png'
import profilePhoto from './avatar.png'
import { Layout, Menu, Breadcrumb } from 'antd';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Main from './components/Main'

const { Header, Content, Footer } = Layout;

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
              <Menu.Item style={{marginLeft: '1020px'}} key="3">
                <img src={profilePhoto}/>
              </Menu.Item>
          </Menu>
          </Header>
          <Content style={{ padding: '0 50px', height: '515px'}}>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
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
