import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../App.css';
import TextInput from '../form-components/text-input';
import { Tag, Radio, Spin, Table, Card, List, Avatar, Icon, Switch, Tabs, Modal, Button, Row, Col, Form } from 'antd';
import AppTable from '../table/table';
import NumberInput from '../form-components/number-input';
import FormItem from 'antd/lib/form/FormItem';
import { formLayout } from './menuItemDialogFormLayout';
import { message } from 'antd'
import SelectField from '../form-components/select-field';
import Swal from 'sweetalert2';
const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
}
class AccountsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleEditAccountClickModalState: false,
            handleAddAccountClickModalState: false,
            addAccountToMenuState: false,
            showLoading: false,
            accountToUpdate: {
                id: null,
                userId: this.props.user.userId,
                userType: this.props.user.type,
                status: 0
            },
            accountToAdd: {
                userId: this.props.user.userId,
                type: "",
                accountNo: "",
                bankName: null,
                accountTitle: "",
                bankBranch: null,
                userType: this.props.user.type,
                status: 0
            }
        }
    }

    componentDidMount() {
    }

    handleEditAcountClick = (record) => {
        this.setState({ ...this.state, accountToUpdate: {id:record.id,userId:record.userId,status:record.status}, handleEditAcocuntClickModalState: true });
    }

    handleAddAccountClick = () => {
        this.setState({ ...this.state, handleAddAccountClickModalState: true });
    }

    handleAddAccountSubmit = (event) => {
        event.preventDefault()

        let account = {
            ...this.state.accountToAdd
        };

        this.setState({ ...this.state, showLoading: true });
        axios.post('http://localhost:3000/admin/chef/account-details', account)
            .then((response) => {
                console.log(response)
                this.setState({ ...this.state, showLoading: false });
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created Sucessfully!',
                    showConfirmButton: false,
                    timer: 3500,
                });
            })
            .catch(e => {
                this.setState({ ...this.state, showLoading: false });
                console.log("Error", e);
            })
    }

    handleUpdateAccountSubmit = (event) => {
        event.preventDefault()

        let account = {
            ...this.state.accountToUpdate
        };

        this.setState({ ...this.state, showLoading: true });
        axios.patch('http://localhost:3000/admin/chef/account-details', account)
            .then((response) => {
                console.log(response)
                this.setState({ ...this.state, showLoading: false });
                Swal.fire({
                    icon: 'success',
                    title: 'Account Updated Sucessfully!',
                    showConfirmButton: false,
                    timer: 3500,
                });
            })
            .catch(e => {
                this.setState({ ...this.state, showLoading: false });
                console.log("Error", e);
            })
    }

    hanldeAddAccountFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            accountToAdd: {
                ...this.state.accountToAdd,
                [name]: value
            }
        }, () => {
            console.log("state", this.state.accountToAdd)
        })
    }

    hanldeUpdateAccountFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            accountToUpdate: {
                ...this.state.accountToAdd,
                [name]: value
            }
        })
    }

    handleDeleteAccountClick = (account) => {
        console.log(account)
        axios.delete(`http://localhost:3000/admin/chef/account-details/${account.id}`, {
            headers: {
                //   Authorization: authorizationToken
            },
        }).then(e => {
            Swal.fire({
                icon: 'success',
                title: 'Account Deleted Sucessfully!',
                showConfirmButton: false,
                timer: 3500,
                onClose: () => {
                    // this.props.reload();
                }
            });
        }).catch(e => {
            console.log(e)
        });
    }

    accountsColumns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Is Active',
            dataIndex: 'status',
            key: 'status',
            render: status => <span>{status ? "In Use" : "Not In Use"}</span>,
        },
        {
            title: 'Account Number',
            dataIndex: 'accountNo',
            key: 'accountNo',
        },
        {
            title: 'Account Title',
            dataIndex: 'accountTitle',
            key: 'accountTitle',
        },
        {
            title: 'Bank Name',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Bank Branch',
            dataIndex: 'bankBranch',
            key: 'bankBranch',
        },
        {
            title: 'Action',
            key: 'operation',
            width: 100,
            render: (account) => {
                return <div>
                    <Button size={"small"} shape={"circle"} style={{}} onClick={this.handleEditAcountClick.bind(this, account)} type="primary">
                        <Icon type="edit" />
                    </Button>
                    &nbsp;&nbsp;
                        <Button size={"small"} shape={"circle"} style={{ background: "red", border: "none" }} onClick={this.handleDeleteAccountClick.bind(this, account)} type="primary">
                        <Icon type="delete" />
                    </Button>
                </div>
            }
        }
    ];



    render() {
        console.log("this.props.accountDetails", this.props)
        return (
            <div className="margin-top-20px">
                <Spin spinning={this.state.showLoading} tip="Submiting The Request...." delay={500}>
                    <Button
                        shape={"round"}
                        type="primary" icon="plus"
                        onClick={this.handleAddAccountClick}
                    >Add Account</Button>
                    <br />
                    <br />
                    <Table dataSource={this.props.accountDetails && this.props.accountDetails.map(e => { e['key'] = e.id; return e })} columns={this.accountsColumns} />;

                    <Modal
                        title={`Add Account `}
                        visible={this.state.handleAddAccountClickModalState}
                        onCancel={() => { this.setState({ ...this.state, handleAddAccountClickModalState: false }) }}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleAddAccountSubmit}>
                                Submit
                        </Button>,
                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Form {...formLayout} layout="vertical">
                                    <Form.Item label="Account Title">
                                        <TextInput name="accountTitle"
                                            value={this.state.accountToAdd.accountTitle}
                                            onChange={this.hanldeAddAccountFormChange}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Account Type">
                                        <Radio.Group onChange={this.hanldeAddAccountFormChange} name="type" value={this.state.accountToAdd.type}>
                                            <Radio value={"easypaisa"}>Easypaisa</Radio>
                                            <Radio value={"bank"}>Bank</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <FormItem label="Make Active">
                                        <Switch checked={this.state.accountToAdd.status == 1 ? true : false} onChange={() => {
                                            this.setState({
                                                ...this.state,
                                                accountToAdd: { ...this.state.accountToAdd, status: this.state.accountToAdd.status == 1 ? 0 : 1 }
                                            }, () => {
                                            });
                                        }} />
                                    </FormItem>
                                    <Form.Item label="Account Number">
                                        <TextInput name="accountNo"
                                            value={this.state.accountToAdd.accountNo}
                                            onChange={this.hanldeAddAccountFormChange}
                                        />
                                    </Form.Item>
                                    {
                                        this.state.accountToAdd.type == "bank" ?
                                            <React.Fragment>
                                                <Form.Item label="Bank Name">
                                                    <TextInput name="bankName"
                                                        value={this.state.accountToAdd.bankName}
                                                        onChange={this.hanldeAddAccountFormChange}
                                                    />
                                                </Form.Item>
                                                <Form.Item label="Bank Branch">
                                                    <TextInput name="bankBranch"
                                                        value={this.state.accountToAdd.bankBranch}
                                                        onChange={this.hanldeAddAccountFormChange}
                                                    />
                                                </Form.Item>
                                            </React.Fragment>
                                            : null
                                    }
                                </Form>
                            </Col>
                        </Row>
                    </Modal>

                    <Modal
                        title={`Update Account `}
                        visible={this.state.handleEditAccountClickModalState}
                        onCancel={() => { this.setState({ ...this.state, handleEditAccountClickModalState: false }) }}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleUpdateAccountSubmit}>
                                Submit
                        </Button>,
                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Form {...formLayout} layout="vertical">
                                    <FormItem label="Make Active">
                                        <Switch checked={this.state.accountToAdd.status == 1 ? true : false} onChange={() => {
                                            this.setState({
                                                ...this.state,
                                                accountToAdd: { ...this.state.accountToAdd, status: this.state.accountToAdd.status == 1 ? 0 : 1 }
                                            }, () => {
                                            });
                                        }} />
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>
                    </Modal>
                </Spin>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsDetails);