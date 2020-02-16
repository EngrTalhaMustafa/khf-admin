import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Divider, Form, Button, Icon } from 'antd';
import formLayout from './formLayout';
import TextInput from '../form-components/text-input';
import NumberInput from '../form-components/number-input';
import RadioField from '../form-components/radio-field';
import SelectField from '../form-components/select-field';
class MakeCheif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cheif: {
                ...this.props.cheifRequestData,
            }
        }
    }

    changeHandler = event => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            cheif: {
                ...this.state.cheif,
                [name]: {
                    ...this.state.cheif[name],
                    value: value
                },
            }
        })

        // console.log(this.state.cheif.fullAddress.value)

    }

    genderOptions = [{ value: "m", name: "male" }, , { value: "f", name: "female" }, { value: "o", name: "other" }]
    status = [{name:"Pending",value:"pending"}, {name:"Inprocess",value:"inprocess"}, {name:"Approved",value:"approved"},{name:"Disapproved",value:"disapproved"}];

    render() {
        return (

            <div>
                <br /><br /><br />
                <Card title={this.state.cheif.id}>
                    <Row>
                        <Col span={24}>
                            <Form {...formLayout} layout="vertical" onSubmit={this.submitHandler}>
                                <Row>
                                    <Form.Item label="Status">
                                        <SelectField name="status"
                                            value={this.state.cheif.status}
                                            onChange={this.changeHandler}
                                            options={this.status}
                                        />
                                    </Form.Item>

                                    <Col span={12}>
                                        <Form.Item label="Full Address">
                                            <TextInput name="fullAddress"
                                                value={this.state.cheif.fullAddress}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="City">
                                            <SelectField name="city"
                                                value={this.state.cheif.city_id}
                                                onChange={this.changeHandler}
                                                options={[{ name: "Karachi", value: 1 }]}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Postal Code">
                                            <TextInput name="postalCode"
                                                value={this.state.cheif.postalCode}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Email">
                                            <TextInput name="email"
                                                value={this.state.cheif.email}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Mobile Number">
                                            <TextInput name="mobilePhoneNumber"
                                                value={this.state.cheif.mobilePhoneNumber}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Whatapp Number">
                                            <TextInput name="whatsAppNumber"
                                                value={this.state.cheif.whatsAppNumber}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Full Name">
                                            <TextInput name="fullName"
                                                value={this.state.cheif.fullName}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Father/Husband Name">
                                            <TextInput name="fatherHusbandName"
                                                value={this.state.cheif.fatherHusbandName}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="CNIC Number">
                                            <TextInput name="CNICNumber"
                                                value={this.state.cheif.CNICNumber}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Gender">
                                            <RadioField name="gender"
                                                value={this.state.cheif.gender}
                                                onChange={this.changeHandler}
                                                options={this.genderOptions}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Age">
                                            <NumberInput
                                                name="age"
                                                type="number"
                                                value={this.state.cheif.age}
                                                min={0} max={60}
                                                onChange={this.changeHandler} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                <Form.Item>

                                    <Button.Group size={"large"}>

                                        <Button onClick={this.submitHandler} type="primary">
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
        cheifRequestData: state.cheifRequestDrawerData,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeCheif);
