import React, { Component } from 'react';
import {Button, Card, Drawer, List, Divider, Col, Row, Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Select } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';


const { Option } = Select;


const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
      </p>
        {content}
    </div>
);

class OrderDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            orderSlip: {

            },
            chefs: [],
            selectedChef: null,
            chefEarning: 0,
            status: this.props.orderDrawerData && this.props.orderDrawerData.status,
            pickupTime: this.props.orderDrawerData.createdAt ? new Date(new Date(this.props.orderDrawerData.createdAt).getTime() + 32 * 60 * 1000).toISOString() : null,
            deliveryTime: this.props.orderDrawerData.createdAt ? new Date(new Date(this.props.orderDrawerData.createdAt).getTime() + 47 * 60 * 1000).toISOString() : null,
        };
    }
    showDrawer = () => {
        console.log("trigerr")
        this.setState({
            isVisible: true,
        });
    };

    onClose = () => {
        this.props.closeDrawer();
    };

    editRequest = () => {
        this.props.editRequest();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        try {
            let cityId = props.orderDrawerData.city.id;
            let createdAt = props.orderDrawerData.createdAt;
            let status = props.orderDrawerData.status;
            api.get(`/admin/chefs?status=active&city=${cityId}`).then(async e => {
                console.log("chefs", e);
                let riders = await api.get(`/admin/riders?status=active&city=${cityId}`);
                this.setState({
                    chefs: e.data,
                    status: status && status,
                    pickupTime: createdAt ? new Date(new Date(createdAt).getTime() + 32 * 60 * 1000).toISOString() : null,
                    deliveryTime: createdAt ? new Date(new Date(createdAt).getTime() + 47 * 60 * 1000).toISOString() : null,
                })
            });
        } catch (error) {
            console.log("chefs", error)
        }
    }

    submitHandler = (event)=>{
        event.preventDefault();
        let order = this.props.orderDrawerData;
        order['status'] = this.state.status;
        order['chef_id'] = this.state.selectedChef.id;
        order['pickup_time'] = this.state.pickupTime;
        order['delivery_time'] = this.state.deliveryTime;
        order['chef_earning'] = this.state.chefEarning;
        api.post('/admin/order',order).then(e=>{
        setTimeout(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Order Placed Sucessfully!',
            showConfirmButton: false,
            timer: 3500,
        });},2000)        
    })
    .catch(e=>{
        console.log(e)
    })
    }

    handleChange = (value) => {
        let chef = this.state.chefs.find(e => e.userName == value);
        if (chef) {
            this.setState({
                selectedChef: chef
            },
                () => {
                    console.log("#32", this.state)
                })
        }
    }

    setTime = (event) => {
        console.log(event)
    }

    changeStatus = (status) => {
        this.setState({ status });
    }

    reducer = (accumulator, currentValue) => accumulator + currentValue;


    render() {
        let data = this.props.orderDrawerData;
        return (
            <div>
                <Drawer
                    width={1000}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.orderDrawerState}
                >
                    <Row>
                        <Col span={12}>
                            <Row style={{ height: '35.35vh', padding: '10px 20px 10px 10px' }}>
                                <Col span={24}>
                                    {
                                        data.chef ?
                                            <div>
                                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                                    <p>Card content</p>
                                                    <p>Card content</p>
                                                    <p>Card content</p>
                                                </Card>
                                            </div> :
                                            <div>

                                                <Card title="No Chief Is Assigned" style={{}}>
                                                    {
                                                        this.state.chefs ?

                                                            <Select placeholder="Select a cheif" style={{ width: '90%' }} onChange={this.handleChange}>
                                                                {
                                                                    this.state.chefs.map(e => {
                                                                        return <Option key={e.userName} value={e.userName}>{e.userName}----{e.fullAddress}</Option>
                                                                    })
                                                                }
                                                            </Select> :
                                                            <h1> No Active Chefs Found In The City!</h1>
                                                    }
                                                </Card>
                                                <br/><br/>
                                    Chef Earning: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input name="chefEarning" onChange={(e)=>{e.preventDefault();this.setState({chefEarning:e.target.value})}} value={this.state.chefEarning} />                                 
                                            </div>
                                    }
                                    <br/><br/>
                                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <Button size={"large"} shape={"round"} style={{ width: "25%", background: "#28a745", borderColor: "#28a745" }} onClick={this.submitHandler} type="primary">
                                            Submit
                                        </Button>
                                    </div>
                                    <br/><br/>

                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col></Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Link onClick={this.onClose} to="edit-cheif">
                                        <DescriptionItem title="Order Id # " content={`${data.id}`} />
                                    </Link>
                                </Col>
                                <Col span={12}>
                                    <Select defaultValue={data.status} onChange={this.changeStatus}>
                                        <Option value="Pending">Pending</Option>
                                        <Option value="Assigned">Assigned</Option>
                                        <Option value="Cooking">Cooking</Option>
                                        <Option value="Cooked">Cooked</Option>
                                        <Option value="Delivering">Delivering</Option>
                                        <Option value="Delivered">Delivered</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col span={12}>
                                    <DescriptionItem title="Customer Name" content={data.customer_name} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionItem title="Customer Phone No." content={data.phone_no} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <DescriptionItem title="City" content={data.city && data.city.name} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionItem title="Area" content={data.area} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <DescriptionItem title="Delivery Address" content={data.address} />
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col>
                                    <List
                                        header={<div><Row type="flex" justify="space-between"><Col>Itmes</Col><Col>Quantity</Col><Col>Price</Col></Row></div>}
                                        footer={<div>
                                            <Row type="flex" justify="space-between" >
                                                <Col>Total</Col>
                                                <Col>{data.order_items && data.order_items.map(e => e.price).reduce(this.reducer)}</Col>

                                            </Row>
                                        </div>}
                                        bordered
                                        dataSource={data.order_items && data.order_items}
                                        renderItem={item => <List.Item>

                                            <Row type="flex" justify="space-between" style={{ width: '100%' }} >
                                                <Col>{item.menu_item.name}</Col><Col>{item.quantity}</Col><Col>{item.price}</Col>
                                            </Row>
                                        </List.Item>}
                                    />
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col span={12}>
                                    Pickup Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input name="pickupTime" onChange={this.setTime} value={this.state.pickupTime && this.state.pickupTime} />
                                    <br /><br />
                                    Delivery Time: &nbsp;&nbsp;&nbsp;&nbsp; <Input name="deliveryTime" onChange={this.setTime} value={this.state.deliveryTime && this.state.deliveryTime} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Drawer >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderDrawerState: state.orderDrawerState,
        orderDrawerData: state.orderDrawerData,
    }
};



const mapDispatchToProps = (dispatch) => {
    return {
        closeDrawer: () => { dispatch({ type: 'CLOSE_ORDER_DRAWER' }) }
    }
}

// AppDrawer.protoTypes ={
//     drawerData : PropTypes.object
// } 


export default connect(mapStateToProps, mapDispatchToProps)(OrderDrawer);
