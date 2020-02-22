import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import '../../App.css';
import AppTable from '../table/table';
import { Tabs, Descriptions } from 'antd';
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




    render() {
        const { cheifs } = this.state;
        return (
            <div className="margin-top-62px">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Profile" key="1">
                        <Descriptions bordered title="Custom Size">
                            <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Config Info">
                                Data disk type: MongoDB
            <br />
                                Database version: 3.4
            <br />
                                Package: dds.mongo.mid
            <br />
                                Storage space: 10 GB
            <br />
                                Replication factor: 3
            <br />
                                Region: East China 1<br />
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <br />

                    </TabPane>
                    <TabPane tab="Edit Profile" key="2">
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