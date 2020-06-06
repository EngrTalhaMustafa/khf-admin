import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import '../../App.css';
import Highlighter from 'react-highlight-words';

class AppTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
        }
    }

    handleSelectHandlerInTable = (data) => {
        this.props.handleSelectHandlerInComponent(data);
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            ...this.state,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ ...this.state, searchText: '' });
    };

    handleSelectClick = (record) => {
        this.props.handleSelectChild(record);
    }

    render() {
        const comsColumns = {
            ordersColumns:[
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    // width: '15%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    // width: '15%',
                    ...this.getColumnSearchProps('status'),
                },
                {
                    title: 'Customer Name',
                    dataIndex: 'customer_name',
                    key: 'customer_name',
                    // width: '15%',
                    ...this.getColumnSearchProps('customer_name'),
                },
                {
                    title: 'Customer Number',
                    dataIndex: 'phone_no',
                    key: 'phone_no',
                    // width: '15%',
                    ...this.getColumnSearchProps('phone_no'),
                },
                {
                    title: 'City',
                    dataIndex: 'city.name',
                    key: 'city.name',
                    // width: '15%',
                    ...this.getColumnSearchProps('city.name'),
                },
                {
                    title: 'Area',
                    dataIndex: 'area',
                    key: 'area',
                    // width: '15%',
                    ...this.getColumnSearchProps('area'),
                },
                {
                    title: 'Action',
                    key: 'operation',
                    // fixed: 'right',
                    width: 100,
                    render: (record) => {
                        return <a onClick={this.handleSelectClick.bind(this, record)}>View</a>
                    }
                },
            ],
            cheifAccountsWeeksColumns:[
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    width: '15%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'Action',
                    key: 'operation',
                    // fixed: 'right',
                    width: 100,
                    render: (record) => {
                        return <a onClick={this.handleSelectClick.bind(this, record)}>View</a>
                    }
                },
            ],
            cheifColumns:[
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    width: '15%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'User Name',
                    dataIndex: 'userName',
                    key: 'userName',
                    width: '15%',
                    ...this.getColumnSearchProps('userName'),
                },
                {
                    title: 'Name',
                    dataIndex: 'fullName',
                    key: 'fullName',
                    width: '15%',
                    ...this.getColumnSearchProps('fullName'),
                },
                {
                    title: 'Address',
                    dataIndex: 'fullAddress',
                    key: 'fullAddress',
                    width: '15%',
                    ...this.getColumnSearchProps('fullAddress'),
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: '15%',
                    ...this.getColumnSearchProps('status'),
                },
                {
                    title: 'Phone Number',
                    dataIndex: 'mobilePhoneNumber',
                    key: 'mobilePhoneNumber',
                    width: '15%',
                    ...this.getColumnSearchProps('mobilePhoneNumber'),
                },
                {
                    title: 'Action',
                    key: 'operation',
                    // fixed: 'right',
                    width: 100,
                    render: (record) => {
                        return <a onClick={this.handleSelectClick.bind(this, record)}>View</a>
                    }
                },
            ],
            menuItemsColumns: [
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    width: '15%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'Dish Name',
                    dataIndex: 'name',
                    key: 'name',
                    width: '15%',
                    ...this.getColumnSearchProps('name'),
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    width: '15%',
                    ...this.getColumnSearchProps('price'),
                },
                {
                    title: 'Quantity Per Unit',
                    dataIndex: 'quantityPerUnit',
                    key: 'quantityPerUnit',
                    width: '15%',
                    ...this.getColumnSearchProps('quantityPerUnit'),
                },
                {
                    title: 'Is Active',
                    dataIndex: 'isActive',
                    key: 'isActive',
                    width: '15%',
                    ...this.getColumnSearchProps('isActive'),
                },
                {
                    title: 'Action',
                    key: 'operation',
                    // fixed: 'right',
                    width: 100,
                    render: (record) => {
                        return <a onClick={this.handleSelectClick.bind(this, record)}>View</a>
                    }
                },
            ],
            cheifRequestColumns:
                [{

                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    width: '15%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'Name',
                    dataIndex: 'fullName',
                    key: 'fullName',
                    width: '15%',
                    ...this.getColumnSearchProps('fullName'),
                },
                {
                    title: 'Area',
                    dataIndex: 'fullAddress',
                    key: 'fullAddress',
                    width: '20%',
                    ...this.getColumnSearchProps('fullAddress'),
                },
                {
                    title: 'Number',
                    dataIndex: 'mobilePhoneNumber',
                    key: 'mobilePhoneNumber',
                    ...this.getColumnSearchProps('mobilePhoneNumber'),
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    ...this.getColumnSearchProps('status'),
                },
                {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 100,
                    render: (record) => {
                        return <a onClick={this.handleSelectClick.bind(this, record)}>View</a>
                    }
                }
                ],
                riderRequestColumns:
                [{

                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    width: '15%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'First Name',
                    dataIndex: 'first_name',
                    key: 'first_name',
                    width: '15%',
                    ...this.getColumnSearchProps('first_name'),
                },
                {
                    title: 'Last Name',
                    dataIndex: 'last_name',
                    key: 'last_name',
                    width: '15%',
                    ...this.getColumnSearchProps('last_name'),
                },
                {
                    title: 'Area',
                    dataIndex: 'address',
                    key: 'address',
                    width: '20%',
                    ...this.getColumnSearchProps('address'),
                },
                {
                    title: 'Number',
                    dataIndex: 'phone_no',
                    key: 'phone_no',
                    ...this.getColumnSearchProps('phone_no'),
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    ...this.getColumnSearchProps('status'),
                },
                {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 100,
                    render: (record) => {
                        return <a onClick={this.handleSelectClick.bind(this, record)}>View</a>
                    }
                }
                ],

            }
            console.log(this.props.data)
        return (
            <div>
                <Table columns={comsColumns[this.props.type]} dataSource={this.props.data} />
            </div>
        );
    }
}

export default AppTable;