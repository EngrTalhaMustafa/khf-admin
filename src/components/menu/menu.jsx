import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../App.css';
import TextInput from '../form-components/text-input';
import { Card, List, Avatar, Icon, Switch, Tabs, Modal, Button, Row, Col, Form } from 'antd';
import AppTable from '../table/table';
import NumberInput from '../form-components/number-input';
import FormItem from 'antd/lib/form/FormItem';
import { formLayout } from './menuItemDialogFormLayout';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            items: [],
            handleEditItemClickModalState: false,
            handleAddItemClickModalState: false,
            itemToUpdate: {
                discount: 10,
                id: 1,
                isActive: 1,
                name: "Nihari",
                price: 125,
                quantityPerUnit: "0",
            },
            itemToAdd: {
                discount: 0,
                isActive: 1,
                name: "",
                price: 0,
                quantityPerUnit: "",
            }
        }
    }

    getMenuItems = () => {

        axios.get('http://localhost:3000/admin/menu-item')
            .then(items => {
                this.setState({
                    ...this.state,
                    items: [...items.data.map(e => { e['key'] = e.id; return e })]
                });
                console.log(items.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    getMenu = () => {

        axios.get('http://localhost:3000/admin/menu/schedule')
            .then(menu => {
                this.setState({
                    ...this.state,
                    menu: [...menu.data]
                });
                console.log(menu.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    componentDidMount() {
        this.getMenu();
        this.getMenuItems();
    }

    handleEditItemClick = (record) => {
        this.setState({ ...this.state, itemToUpdate: record, handleEditItemClickModalState: true });
    }

    handleUpdateItemSubmit = () => {

    }

    handleUpdateItemCancel = () => {

    }

    handleItmeDelete = () => {

    }

    handleAddItemSubmit = (event) => {

    }

    hanldeAddItemFormChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            itemToAdd: {
                ...this.state.cheif,
                [name]: {
                    ...this.state.cheif[name],
                    value: value
                },
            }
        })
    }

    hanldeUpdateItemFormChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            itemToUpdate: {
                ...this.state.cheif,
                [name]: {
                    ...this.state.cheif[name],
                    value: value
                },
            }
        })
    }



    render() {
        const dailyMenu = (day) => {
            return (<div>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={[{ title: 'Breakfast', field: 'breakfast' }, { title: 'Lunch', field: 'Lunch' }, { title: 'Dinner', field: 'dinner' }]}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[{ title: 'Biryani' }, { title: 'Biryani' }, { title: 'Biryani' }]}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>
                                    )} />
                            </Card>
                        </List.Item>
                    )}
                />
            </div>)
        }
        return (
            <div className="margin-top-62px">
                <Modal
                    title={`Update Item ${this.state.itemToUpdate.name} `}
                    style={{ top: 20 }}
                    visible={this.state.handleEditItemClickModalState}
                    onCancel={() => { this.setState({ ...this.state, handleEditItemClickModalState: false }) }}
                    footer={[
                        <Button key="delete" onClick={this.handleItmeDelete}>
                            Delete Item
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleUpdateItemSubmit}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={24}>
                            <Form {...formLayout} layout="horizontal">
                                <Form.Item label="Dish Name">
                                    <TextInput name="name"
                                        value={this.state.itemToUpdate.name}
                                        onChange={this.hanldeUpdateItemFormChange}
                                    />
                                </Form.Item>
                                <FormItem label="Is Dish Active">
                                    <Switch checked={this.state.itemToUpdate.isActive == 1 ? true : false} onChange={() => {
                                        this.setState({
                                            ...this.state,
                                            itemToUpdate: { ...this.state.itemToUpdate, isActive: this.state.itemToUpdate.isActive == 1 ? 0 : 1 }
                                        }, () => {
                                            console.log(this.state.itemToUpdate);
                                        });
                                    }} />
                                </FormItem>
                                <Form.Item label="Dish Price">
                                    <NumberInput name="price"
                                        value={this.state.itemToUpdate.price}
                                        onChange={this.hanldeUpdateItemFormChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Quantity Per Unit">
                                    <TextInput name="quantityPerUnit"
                                        value={this.state.itemToUpdate.quantityPerUnit}
                                        onChange={this.hanldeUpdateItemFormChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Discount %">
                                    <NumberInput name="discount"
                                        value={this.state.itemToUpdate.discount}
                                        onChange={this.hanldeUpdateItemFormChange}
                                    />
                                </Form.Item>

                            </Form>
                        </Col>
                    </Row>
                </Modal>



                {/* ITEM ADD MODAL */}
                <Modal
                    title={`Add New Item `}
                    style={{ top: 20 }}
                    visible={this.state.handleAddItemClickModalState}
                    onCancel={() => { this.setState({ ...this.state, handleAddItemClickModalState: false }) }}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleAddItemSubmit}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={24}>
                            <Form {...formLayout} layout="horizontal">
                                <Form.Item label="Dish Name">
                                    <TextInput name="name"
                                        value={this.state.itemToAdd.name}
                                        onChange={this.hanldeAddItemFormChange}
                                    />
                                </Form.Item>
                                <FormItem label="Is Dish Active">
                                    <Switch checked={this.state.itemToAdd.isActive == 1 ? true : false} onChange={() => {
                                        this.setState({
                                            ...this.state,
                                            itemToAdd: { ...this.state.itemToAdd, isActive: this.state.itemToAdd.isActive == 1 ? 0 : 1 }
                                        }, () => {
                                            console.log(this.state.itemToAdd);
                                        });
                                    }} />
                                </FormItem>
                                <Form.Item label="Dish Price">
                                    <NumberInput name="price"
                                        value={this.state.itemToAdd.price}
                                        onChange={this.hanldeAddItemFormChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Quantity Per Unit">
                                    <TextInput name="quantityPerUnit"
                                        value={this.state.itemToAdd.quantityPerUnit}
                                        onChange={this.hanldeAddItemFormChange}
                                    />
                                </Form.Item>
                                <Form.Item label="Discount %">
                                    <NumberInput name="discount"
                                        value={this.state.itemToAdd.discount}
                                        onChange={this.hanldeAddItemFormChange}
                                    />
                                </Form.Item>

                            </Form>
                        </Col>
                    </Row>
                </Modal>




                {/* TABS */}
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="All Items" key="1">
                        <Button onClick={() => { this.setState({ ...this.state, handleAddItemClickModalState: true }) }} type="primary" size={"large"}>
                            <Icon type="plus-circle" theme="twoTone" />
                            Add Item
                        </Button>
                        <AppTable
                            type={"menuItemsColumns"}
                            data={this.state.items}
                            handleSelectChild={this.handleEditItemClick}
                        />
                    </TabPane>
                    <TabPane tab="Monday" key="2">
                        {dailyMenu('monday')}
                    </TabPane>
                    <TabPane tab="Tuesday" key="3">
                        {dailyMenu('monday')}
                    </TabPane>

                    <TabPane tab="Wednesday" key="4">
                        {dailyMenu('monday')}
                    </TabPane>

                    <TabPane tab="Thursday" key="5">
                        {dailyMenu('monday')}
                    </TabPane>

                    <TabPane tab="Friday" key="6">
                        {dailyMenu('monday')}
                    </TabPane>


                    <TabPane tab="Saturday" key="7">
                        {dailyMenu('monday')}
                    </TabPane>


                    <TabPane tab="Sunday" key="8">
                        {dailyMenu('monday')}
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

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect()(Menu);