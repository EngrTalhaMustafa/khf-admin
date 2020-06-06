import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Divider, Form, Button, Icon } from 'antd';
import formLayout from './formLayout';
import TextInput from '../form-components/text-input';
import NumberInput from '../form-components/number-input';
import RadioField from '../form-components/radio-field';
import SelectField from '../form-components/select-field';
import axios from 'axios';
class MakeRider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rider: {
                ...this.props.riderRequestData,
                userName: `KHF-RD-${this.props.riderRequestData.id}`,
                password: `${btoa(new Date().getMilliseconds()).concat(btoa(new Date().getUTCSeconds())).slice(0, 8)}`,
            }
        }
        console.log(this.props.riderRequestData)
    }

    createRiderSubmitHandler = event => {
        axios.post('http://localhost:3000/admin/rider', this.state.rider)
            .then(rider => {
                console.log("rider created!", rider)
            })
            .catch(e => {
                console.log("error while creating rider!", e)
            })
    }

    selectChangeHandler = (name, value) => {
        console.log(name, value)
        this.setState({
            ...this.state,
            cheif: {
                ...this.state.rider,
                [name]: value,
            }
        },()=>{

            console.log(this.state.rider)
        }
        )

    }

    changeHandler = event => {
        // console.log(event)
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, event.target)
        this.setState({
            ...this.state,
            rider: {
                ...this.state.rider,
                [name]: {
                    ...this.state.rider[name],
                    value: value
                },
            }
        }
        )
    }

    genderOptions = [{ value: "Male", name: "Male" }, , { value: "Female", name: "Female" }]
    statusOp = [{ name: "Pending", value: "pending" }, { name: "Inprocess", value: "inprocess" }, { name: "Approved", value: "approved" }, { name: "Disapproved", value: "disapproved" }];
    render() {
        return (

            <div>
                <br /><br /><br />
                <Card title={this.state.rider.id}>
                    <Row>
                        <Col span={24}>
                            <Form layout="vertical" onSubmit={this.submitHandler}>
                                <Row>
                                    <Form.Item>
                                        <SelectField name="status"
                                            value={this.state.rider.status}
                                            selectChangeHandler={this.selectChangeHandler}
                                            options={this.statusOp}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Username">
                                        <TextInput name="userName"
                                            value={this.state.rider.userName}
                                            onChange={this.changeHandler}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Password">
                                        <TextInput name="password"
                                            value={this.state.rider.password}
                                            onChange={this.changeHandler}
                                        />
                                    </Form.Item>

                                    <Divider />
                                    <Col span={7}>
                                        <Form.Item label="Full Address">
                                            <TextInput name="fullAddress"
                                                value={this.state.rider.address}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="City">
                                            <SelectField name="city"
                                                value={this.state.rider.city_id}
                                                onChange={this.changeHandler}
                                                options={[{ name: "Karachi", value: 1 }]}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Postal Code">
                                            <TextInput name="postalCode"
                                                value={this.state.rider.postal_code}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Email">
                                            <TextInput name="email"
                                                value={this.state.rider.email}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Mobile Number">
                                            <TextInput name="mobilePhoneNumber"
                                                value={this.state.rider.phone_no}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>


                                    </Col>
                                    <Col span={7} push={2}>
                                        <Form.Item label="Full Name">
                                            <TextInput name="fullName"
                                                value={this.state.rider.first_name &&  this.state.rider.first_name.concat(this.state.rider.last_name)}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Father/Husband Name">
                                            <TextInput name="fatherHusbandName"
                                                value={this.state.rider.father_name}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="CNIC Number">
                                            <TextInput name="CNICNumber"
                                                value={this.state.rider.cnic_no}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Gender">
                                            <RadioField name="gender"
                                                value={this.state.rider.gender}
                                                onChange={this.changeHandler}
                                                options={this.genderOptions}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Owns Bike">
                                        <RadioField name="owns_bike"
                                                value={this.state.rider.own_bike}
                                                onChange={this.changeHandler}
                                                options={[{value:true,name:"Yes"},{value:false,name:"No"}]}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                <Form.Item>

                                    <Button.Group size={"large"}>

                                        <Button onClick={this.createChefSubmitHandler} type="primary">
                                            Submit
                            <Icon type="right" />
                                        </Button>
                                    </Button.Group>

                                </Form.Item>

                            </Form>
                        </Col>
                    </Row>
                    <Divider />

                </Card>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        riderRequestData: state.riderRequestDrawerData,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeRider)