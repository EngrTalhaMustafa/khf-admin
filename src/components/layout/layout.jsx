import React, { Component } from 'react';
import Narvbar from '../navbar/navbar';
import MenuBar from '../menu-bar/menu-bar';
// import Dashboard from '../dashboard/dashboard';
import { Layout } from 'antd';
import { Switch,Route, Link, BrowserRouter as Router } from 'react-router-dom';
import MakeCheif from '../make-cheif/makeCheif';
import './layout.css';
import Orders from '../orders/orders';
import ChiefRegistraionReuqest from '../chief-registration-reqeuest/chief-registration-request';
// import ChiefRegistraionReuqest from './components/chief-registration-reqeuest/chief-registration-request';
import Dashboard from '../dashboard/dashboard';

const { Header, Content, Sider } = Layout;
let Layoutt = () => {

    return (
        <div>
            <Layout className="layout">
                {/* <Header> */}
                    <Narvbar />
                {/* </Header> */}
                <Layout>
                    <br /><br /><br />

                    <MenuBar />
                    <Layout style={{ }}>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 15,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
      <Route exact path="/chief-registration-reqeuests" component={ChiefRegistraionReuqest}></Route>
      <Route exact path="/edit-cheif" component={MakeCheif}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>

                    {/* <MakeCheif/> */}
                            {/* <Dashboard /> */}
                            {/* <Orders/> */}
                                <ChiefRegistraionReuqest/>                            
        </Content>
                    </Layout>
                </Layout>

            </Layout>
        </div>
    );
}

export default Layoutt;






















