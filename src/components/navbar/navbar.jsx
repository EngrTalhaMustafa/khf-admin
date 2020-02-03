import React, { Component } from 'react';
import { Layout, Col, Row } from 'antd';
import './navbar.css';
import menu from '../../menu-button.png'
const { Header } = Layout;
export default class Narvbar extends Component {
    state={

    }
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Header style={{padding: '0px',textAlign: 'center', backgroundColor: '#D70F64', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }}>
                    <Row style={{display:'flex'}} type="flex">
                    {/* <Col style={{ height: '62px' }} md={4} xl={2} lg={2} xs={2}>
                        <div className="logo"><img style={{ verticalAlign: 'top', width: '30%', height: '40%' }} src={menu} /></div>
                    </Col> */}
                    <Col md={4} xl={4} lg={4} xs={0}>
                    {
                        this.props.authenticated ? 
                        <p>
                            hello
                        </p>
                        :
                        null
                    }
                    </Col>
                    </Row>
                </Header>
            </div>
        );
    }
}
