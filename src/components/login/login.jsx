import React, { Component } from 'react';
import api from '../../api';
import { Form, Input, Button } from 'antd';
import { layout, tailLayout, style } from './login.layout'
import '../../App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eamil: '',
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
        const { email, password } = this.state;
        if (email && password) {
            api.post('/auth/admin/login', { email, password })
                .then(({data}) => {
                    console.log("success", data)
                    this.props.loginSuccess({token:data.token,user:data.user});
                    this.props.history.push('/')
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
                    style={{ width: '500px', marginTop: '200px' }}
                    onSubmit={this.submitHandler}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input name="email" onChange={this.changeHandler} />
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



const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (obj) => { dispatch({ type: "LOGIN_SUCCESS", payload: obj }) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
