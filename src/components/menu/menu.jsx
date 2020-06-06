import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../App.css';
import TextInput from '../form-components/text-input';
import { Tag, Spin, Card, List, Avatar, Icon, Switch, Tabs, Modal, Button, Row, Col, Form } from 'antd';
import AppTable from '../table/table';
import NumberInput from '../form-components/number-input';
import FormItem from 'antd/lib/form/FormItem';
import { formLayout } from './menuItemDialogFormLayout';
import ImageUploader from '../form-components/image-uploader';
import { message } from 'antd'
import SelectField from '../form-components/select-field';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
}
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            items: [],
            handleEditItemClickModalState: false,
            handleAddItemClickModalState: false,
            addItemToMenuState: false,
            showLoading: false,
            itemToUpdate: {
                discount: 10,
                id: 1,
                isActive: 1,
                name: "Nihari",
                price: 125,
                quantityPerUnit: "0",
                imageURL: "",
            },
            itemToAdd: {
                discount: 0,
                isActive: 1,
                price: 0,
                name: "",
                quantityPerUnit: "",
                imageURL: "",
            },
            addItemToMenu: { day: 'day', shift: 'shift', itemID: '' }
        }
    }

    getMenuItems = () => {

        axios.get('http://localhost:3000/admin/menu-item')
            .then(items => {
                this.setState({
                    ...this.state,
                    items: [...items.data.map(e => { e['key'] = e.id; return e })]
                });
                // console.log(items.data);
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
                }, () => {
                    console.log("hhhh", this.state.menu)
                });

                // console.log(menu.data);
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

    handleImageChange = (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    handleUpdateItemSubmit = () => {

    }

    handleUpdateItemCancel = () => {

    }

    handleItmeDelete = () => {

    }

    handleAddItemSubmit = (event) => {
        event.preventDefault()
        // console.log(this.state.itemToAdd);
        this.setState({ ...this.state, showLoading: true });
        axios.post('http://localhost:3000/admin/menu-item', this.state.itemToAdd)
            .then((response) => {
                this.setState({ ...this.state, showLoading: false });
                // console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Item Created Sucessfully!',
                    showConfirmButton: false,
                    timer: 3500,
                });
                this.getMenuItems();
                this.getMenu();
            })
            .catch(e => {
                this.setState({ ...this.state, showLoading: false });
                console.log("Error");
            })
    }

    hanldeAddItemFormChange = (event) => {
        // event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name, value)
        this.setState({
            ...this.state,
            itemToAdd: {
                ...this.state.itemToAdd,
                [name]: name == 'price' ? parseFloat(Number(value)) : value
            }
        })
    }

    hanldeUpdateItemFormChange = (event) => {
        // event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            itemToUpdate: {
                ...this.state.itemToAdd,
                [name]: name == 'price' ? parseFloat(Number(value)) : value
            }
        })
    }

    getImage = e => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            // console.log(file);
            this.setState({ file });

            // const { file } = this.state;
            this.setState({ message: 'Uploading...' })
            const contentType = file.type; // eg. image/jpeg or image/svg+xml

            const generatePutUrl = 'http://localhost:3000/image-uploader/generate-put-url';
            const options = {
                params: {
                    Key: file.name,
                    ContentType: contentType,

                    headers: {
                        'Content-Type': contentType,
                    }
                }
            }

            // X-Amz-Date=20200223T123208Z&X-Amz-Expires=900&X-Amz-Signature=0b72cf7a46fd3b61e30069252ad0b742b1f82405124513bc0bcd64c693b91c5c&X-Amz-SignedHeaders=host

            axios.get(generatePutUrl, options).then(res => {
                const {
                    data: { putURL }
                } = res;
                // console.log(putURL)
                axios.put(putURL, file, options)
                    .then(res => {
                        // console.log('aaaa', res)
                        // this.setState({ message: 'Upload Successful' })
                        // setTimeout(() => {
                        //     this.setState({ message: '' });
                        //     document.querySelector('#upload-image').value = '';
                        // }, 2000)
                    })
                    .catch(err => {
                        console.log("cv", err)
                        // this.setState        ({ message: 'Sorry, something went wrong' })
                        // console.log('err', JSON.stringify(err));
                    });

            })
        };
    }

    getMenuItemNameList = () => {
        return this.state.items.map(item => {
            return { name: item.name, value: item.id }
        })
    }

    handleAddItemToMenuClick = (data) => {


        // console.log(event.value)
        this.setState({ ...this.state, addItemToMenu: { 'day': data.day, 'shift': data.shift }, addItemToMenuState: true },
            () => {
                console.log(this.state)
            });

    }

    selectChangeHandlerForMenuItem = (name, id) => {
        this.setState({ ...this.state, addItemToMenu: { ...this.state.addItemToMenu, itemID: id } })
    }

    handleAddItemToMenuSubmit = () => {
        let addItemToMenu = { ...this.state.addItemToMenu };
        // console.log(addItemToMenu)
        let dayToId = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thurday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7
        }

        let item = {
            day_id: dayToId[addItemToMenu.day],
            menu_item_id: addItemToMenu.itemID,
            shift: addItemToMenu.shift.charAt(0).toUpperCase().concat(addItemToMenu.shift.slice(1))
        }

        console.log(item)

        axios.post('http://localhost:3000/admin/day/assign/menu-items', item)
            .then(response => {
                // console.log(response)
                this.getMenu();
                Swal.fire({
                    icon: 'success',
                    title: 'Item Added To Menu Sucessfully!',
                    showConfirmButton: false,
                    timer: 3500,
                });
            })
            .catch(e => {
                console.error(e)
            })


    }

    handleDeleteItemToMenuClick = (data)=>{
        console.log(data.day,data.shift,data.itemId)
        let deleteItemToMenu = { ...this.state.deleteItemToMenu };
        let dayToId = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thurday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7
        }

        let item = {
            day_id: dayToId[deleteItemToMenu.day],
            menu_item_id: deleteItemToMenu.itemID,
            shift: deleteItemToMenu.shift.charAt(0).toUpperCase().concat(deleteItemToMenu.shift.slice(1))
        }

        axios.delete('http://localhost:3000/menu/delete-item', {
            headers: {
            //   Authorization: authorizationToken
            },
            data: item
          });
    }



    render() {
        console.log("menu", this.state.menu)
        const dailyMenu = (day) => {
            // console.log(day  )
            // console.log
            let menu = {
                Lunch: this.state.menu.length > 0 && [...this.state.menu.find(e => e.name == day).lunch],
                Breakfast: this.state.menu.length > 0 && [...this.state.menu.find(e => e.name == day).breakfast],
                Dinner: this.state.menu.length > 0 && [...this.state.menu.find(e => e.name == day).dinner]
            }
            // console.log(menu)
            return (<div>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={[{ title: 'Breakfast', field: 'breakfast', items: menu.Breakfast }, { title: 'Lunch', field: 'lunch', items: menu.Lunch }, { title: 'Dinner', field: 'dinner', items: menu.Dinner }]}
                    renderItem={item => (

                        <List.Item>
                            <Card title={item.title}
                                extra={<Button
                                    type="primary" shape="circle" icon="plus"
                                    onClick={this.handleAddItemToMenuClick.bind(this, { day, shift: item.field })}
                                ></Button>}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={item.items}
                                    renderItem={itemFood => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={itemFood.imageURL} />}
                                                title={itemFood.name}
                                            />

                                            <h3>Price: {itemFood.price}</h3>
                                            {<a
                                                style={{marginLeft:'20px'}}
                                                onClick={this.handleDeleteItemToMenuClick.bind(this, { day, shift: item.field,itemId:itemFood.id })}
                                            ><Icon
                                            style={{ marginTop:'-10px',fontSize: '20px', color: 'red' }}
                                            type="delete"/></a>}
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
                <Spin spinning={this.state.showLoading} tip="Submiting The Request...." delay={500}>

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
                                <Form layout="horizontal">
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
                                                // console.log(this.state.itemToUpdate);
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

                                    <Form.Item label="Image">

                                        <TextInput name="imageURL"
                                            value={this.state.itemToUpdate.imageURL}
                                            onChange={this.hanldeUpdateItemFormChange}
                                        />
                                    </Form.Item>

                                </Form>
                            </Col>
                        </Row>
                    </Modal>


                    {/* ITEM ADD MODAL */}
                    <Modal
                        title={`Add Item To ${this.state.addItemToMenu.day.toUpperCase()} - ${this.state.addItemToMenu.shift.toUpperCase()}`}
                        style={{ top: 20 }}
                        visible={this.state.addItemToMenuState}
                        onCancel={() => { this.setState({ ...this.state, addItemToMenuState: false }) }}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleAddItemToMenuSubmit}>
                                Submit
                        </Button>,
                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Form layout="horizontal">
                                    <Tag color="magenta">{this.state.addItemToMenu.day}</Tag> <Tag color="magenta">{this.state.addItemToMenu.shift}</Tag>
                                    <Form.Item label="Dishes">
                                        <SelectField
                                            name="itemsToSelectFrom"
                                            value={this.state.addItemToMenu.itemID}
                                            selectChangeHandler={this.selectChangeHandlerForMenuItem}
                                            options={this.getMenuItemNameList()}
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
                                <Form layout="horizontal">
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
                                                // console.log(this.state.itemToAdd);
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
                                    <Form.Item label="Image">
                                        <TextInput name="imageURL"
                                            value={this.state.itemToAdd.imageURL}
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
                            {dailyMenu('Monday')}
                        </TabPane>
                        <TabPane tab="Tuesday" key="3">
                            {dailyMenu('Tuesday')}
                        </TabPane>

                        <TabPane tab="Wednesday" key="4">
                            {dailyMenu('Wednesday')}
                        </TabPane>

                        <TabPane tab="Thursday" key="5">
                            {dailyMenu('Thursday')}
                        </TabPane>

                        <TabPane tab="Friday" key="6">
                            {dailyMenu('Friday')}
                        </TabPane>


                        <TabPane tab="Saturday" key="7">
                            {dailyMenu('Saturday')}
                        </TabPane>


                        <TabPane tab="Sunday" key="8">
                            {dailyMenu('Sunday')}
                        </TabPane>
                    </Tabs>
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

export default connect()(Menu);