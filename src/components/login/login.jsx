import React, { Component } from 'react';
import api from '../../api';
import { Form, Input, Button } from 'antd';
import { layout, tailLayout, style } from './login.layout'
import '../../App.css';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        const { userName, password } = this.state;
        if (userName && password) {
            api.post('/user/login', { userName, password })
                .then(user => {
                    console.log("success", user)
                })
                .catch(e => {
                    console.log('failure', e)
                })
        }
    }


    render() {

        return (
            <div style={style}>
                <Form
                    // {...layout}
                    name="loginForm"
                    initialvalues={{
                        remember: true,
                    }}
                    layout="vertical"
                    style={{width:'500px',marginTop:'200px'}}
                    onSubmit={this.submitHandler}
                >
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input name="userName" onChange={this.changeHandler} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password required name="password" onChange={this.changeHandler} />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Submit
              </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default LoginPage;