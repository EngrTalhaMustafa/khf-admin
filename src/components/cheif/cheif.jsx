import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import '../../App.css';
import AppTable from '../table/table';
import { Table, Tabs, Descriptions } from 'antd';
import TextInput from '../form-components/text-input';
import NumberInput from '../form-components/number-input';
import RadioField from '../form-components/radio-field';
import AccountsDetails from '../accounts-details/accounts-details';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
class Chief extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cheif: {

            }
        }
    }

    componentDidMount() {
        console.log(this.params)
        const { match: { params } } = this.props;
        axios.get(`http://localhost:3000/admin/chef/${params.id}`)
            .then(cheif => {
                this.setState({
                    ...this.state,
                    cheif: cheif.data,
                },
                    () => {
                        console.log(this.state)
                    })
            })
            .catch(e => {
                console.error(e)
            })
    }


    hanldeAddItemFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            cheif: {
                ...this.state.cheif,
                [name]: value
            }
        })
    }

    reload = ()=>{
        this.props.history.push(`cheif/${this.state.cheif.id}`)
    }

    changeHandler = event => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, event.target)
        this.setState({
            ...this.state,
            cheif: {
                ...this.state.cheif,
                [name]: value
            }
        })

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
          },
          {
            title: 'Account Number',
            dataIndex: 'account_no',
            key: 'account_no',
          },
          {
            title: 'Account Title',
            dataIndex: 'account_title',
            key: 'account_title',
          },
          {
            title: 'Bank Name',
            dataIndex: 'bank_name',
            key: 'bank_name',
          },
                    {
            title: 'Bank Name',
            dataIndex: 'bank_name',
            key: 'bank_name',
          },
          {
            title: 'Bank Branch',
            dataIndex: 'bank_branch',
            key: 'bank_branch',
          },
    ];
    genderOptions = [{ value: "m", name: "male" }, , { value: "f", name: "female" }, { value: "o", name: "other" }]


    render() {
        const cheifs = this.state.cheif && this.state.cheif;
        console.log(cheifs)
        return (
            <div className="margin-top-62px">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Profile" key="1">
                        <Descriptions bordered title={`${cheifs.userName} (${cheifs.status})`}>
                            <Descriptions.Item label="Full Name">{cheifs.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Father/Husband">{cheifs.fatherHusbandName}</Descriptions.Item>
                            <Descriptions.Item label="Age">{cheifs.age}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{cheifs.gender}</Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Descriptions bordered title="Contact Info">
                            <Descriptions.Item label="Mobile Phone Number">{cheifs.mobilePhoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Email">{cheifs.email}</Descriptions.Item>
                            <Descriptions.Item label="Whatsapp Number">{cheifs.whatsAppNumber}</Descriptions.Item>
                            <Descriptions.Item label="CNIC Number">{cheifs.CNICNumber}</Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Descriptions bordered title="Geographic Info">
                            <Descriptions.Item label="City">{cheifs.city_id}</Descriptions.Item>
                            <Descriptions.Item label="Area">{cheifs.city_id}</Descriptions.Item>
                            <Descriptions.Item label="Postal Code">{cheifs.postalCode}</Descriptions.Item>
                            <Descriptions.Item label="Full Address">{cheifs.fullAddress}</Descriptions.Item>
                        </Descriptions>
                        <br />
                    </TabPane>
                    <TabPane tab="Accounts Details" key="5">
                    <AccountsDetails reload={this.reload} user={{userId:cheifs.id,type:"chef"}} accountDetails={cheifs.accounts_details} />
                    </TabPane>
                    <TabPane tab="Edit Profile" key="2">

                        <Descriptions bordered title={`${cheifs.userName} (${cheifs.status})`}>
                            <Descriptions.Item label="Full Name">
                                <TextInput name="fullName"
                                    value={this.state.cheif.fullName}
                                    onChange={this.hanldeUpdateItemFormChange}
                                // style={{ border: '0px' }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="Father/Husband">
                                <TextInput name="fullName"
                                    value={this.state.cheif.fatherHusbandName}
                                    onChange={this.hanldeUpdateItemFormChange}
                                // style={{ border: '0px' }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="Age">
                                <NumberInput name="price"
                                    value={this.state.cheif.age}
                                    onChange={this.hanldeUpdateItemFormChange}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="Gender">
                                <RadioField name="gender"
                                    value={this.state.cheif.gender}
                                    onChange={this.changeHandler}
                                    options={this.genderOptions}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Descriptions bordered title="Contact Info">
                            <Descriptions.Item label="Mobile Phone Number">
                                <TextInput name="mobilePhoneNumber"
                                    value={this.state.cheif.mobilePhoneNumber}
                                    onChange={this.hanldeUpdateItemFormChange}
                                // style={{ border: '0px' }}
                                />
                                {cheifs.mobilePhoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Email">
                                <TextInput name="email"
                                    value={this.state.cheif.email}
                                    onChange={this.hanldeUpdateItemFormChange}
                                // style={{ border: '0px' }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="Whatsapp Number">
                                <TextInput name="whatsAppNumber"
                                    value={this.state.cheif.whatsAppNumber}
                                    onChange={this.hanldeUpdateItemFormChange}
                                // style={{ border: '0px' }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="CNIC Number">
                                <TextInput name="CNICNumber"
                                    value={this.state.cheif.CNICNumber}
                                    onChange={this.hanldeUpdateItemFormChange}
                                // style={{ border: '0px' }}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Descriptions bordered title="Geographic Info">
                            <Descriptions.Item label="City">{cheifs.city_id}</Descriptions.Item>
                            <Descriptions.Item label="Area">{cheifs.city_id}</Descriptions.Item>
                            <Descriptions.Item label="Postal Code">{cheifs.postalCode}</Descriptions.Item>
                            <Descriptions.Item label="Full Address">{cheifs.fullAddress}</Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Descriptions bordered title="Bank/Wallet Info">
                            <Descriptions.Item label="Type">Easy Paisa</Descriptions.Item>
                            {/* <Descriptions.Item label="">{cheifs.city_id}</Descriptions.Item> */}
                            {/* <Descriptions.Item label="Postal Code">{cheifs.postalCode}</Descriptions.Item> */}
                            {/* <Descriptions.Item label="Full Address">{cheifs.fullAddress}</Descriptions.Item> */}
                        </Descriptions>

                    </TabPane>
                    <TabPane tab="Accounts" key="3">
                        <Descriptions bordered column={2} layout="horizontal">
                            <Descriptions.Item label="Current Week Balance">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Last Week Balance">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Pervious Balance (Excluding Last Week And Current Week)">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="Total Due(Current+Last+All Previous)">$80.00</Descriptions.Item>
                        </Descriptions>
                        <AppTable
                            type={"cheifAccountsWeeksColumns"}
                            data={[]}
                            handleSelectChild={this.handleSelectClick}
                        />

                    </TabPane>
                    <TabPane tab="Orders" key="4">

                    </TabPane>
                </Tabs>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chief);

























