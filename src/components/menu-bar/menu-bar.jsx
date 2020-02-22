import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './menu-bar.css';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class MenuBar extends Component {
    render() {
        return (
     <div>
        <Sider className="sider" style={{marginTop:'62px'}}>
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            theme="dark"
      >
        <Menu.Item key="0"><Link to='/dashboard' /> Dashboard</Menu.Item>
        <Menu.Item key="1"><Link to='/orders' /> Orders</Menu.Item>
        <Menu.Item key="2"><Link to='/chief-registration-reqeuests' />Cheif Requests</Menu.Item>
        <Menu.Item key="3"><Link to='/rider-registration-requests' />Riders Requests</Menu.Item>
         <SubMenu
            key="4"
            title={
              <span>
                <Icon type="user" />
                Profiles
              </span>
            }
          >
            <Menu.Item key="5"><Link to='/accounts' />Riders Accounts</Menu.Item>
            <Menu.Item key="6"><Link to='/cheifs' />Chief Accounts</Menu.Item>
            <Menu.Item key="7"><Link to='/accounts' />Users Accounts</Menu.Item>
          </SubMenu>
          <SubMenu
            key="8"
            title={
              <span>
                <Icon type="laptop" />
                Disputes
              </span>
            }
          >
            <Menu.Item key="9"><Link to='/disputes' />Riders</Menu.Item>
            <Menu.Item key="10"><Link to='/disputes' />Cheifs</Menu.Item>
            <Menu.Item key="11"><Link to='/disputes' />Users</Menu.Item>
          </SubMenu>
          <SubMenu
            key="12"
            title={
              <span>
                <Icon type="notification" />
                Support
              </span>
            }
          >
            <Menu.Item key="13"><Link to='/support' />Cheifs</Menu.Item>
            <Menu.Item key="14"><Link to='/support' />Riders</Menu.Item>
            <Menu.Item key="15"><Link to='/support' />Users</Menu.Item>
          </SubMenu>
          <Menu.Item key="16"><Link to="/menu" />Menu</Menu.Item>
      </Menu>
            </Sider>
     </div> 
        );
    }
}
