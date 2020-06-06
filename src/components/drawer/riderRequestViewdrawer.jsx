import React, { Component } from 'react';
import { Drawer, Divider, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

class RiderRequestDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }
    showDrawer = () => {
        console.log("trigerr")
        this.setState({
            isVisible: true,
        });
    };

    onClose = () => {
        // alert(1)
        this.props.closeDrawer();
    };

    editRequest = () => {
        this.props.editRequest();
    }

    render() {
        let data = this.props.riderRequestDrawerData;
        console.log("#0900",data)
        return (
            <div>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.riderRequestDrawerState}
                >
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Request Id # " content={`${data.id}`} />
                        </Col>
                        <Col span={12}>
       

                            <Link onClick={this.onClose} to="edit-rider">Edit</Link>

                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="Status" content={data.status} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Full Name" content={data.first_name} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Email" content={data.email} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="City" content={data.city_id} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Postal Code" content={data.postal_code} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Phone Number" content={data.phone_no} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Address"
                                content={data.address}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Gender" content={data.gender} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Father/Husband" content={data.father_name} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Requested At" content={data.createdAt} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Updated At" content={data.updatedAt} />
                        </Col>
                    </Row>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        riderRequestDrawerState: state.riderRequestDrawerState,
        riderRequestDrawerData: state.riderRequestDrawerData,
    }
};



const mapDispatchToProps = (dispatch) => {
    return {
        closeDrawer: () => { dispatch({ type: 'CLOSE_RIDER_REQUEST_DRAWER' }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RiderRequestDrawer);
