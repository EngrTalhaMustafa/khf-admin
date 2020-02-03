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

    handleSelectHandlerInTable =(data)=>{
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

    handleSelectClick = (record)=>{
        this.props.handleSelectChild(record);
    }

    render() {
       const comsColumns = {
            cheifRequestColumns: 
            [      
                {
          
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  width: '15%',
                  ...this.getColumnSearchProps('name'),
                },
                {
                  title: 'Area',
                  dataIndex: 'area',
                  key: 'area',
                  width: '20%',
                  ...this.getColumnSearchProps('area'),
                },
                {
                  title: 'Number',
                  dataIndex: 'number',
                  key: 'number',
                  ...this.getColumnSearchProps('number'),
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
                   return <a onClick={this.handleSelectClick.bind(this,record)}>Hello</a>
                  }
                }
              ],
        }
        return (
            <div className="margin-top-62px">
                <Table columns={comsColumns[this.props.type]} dataSource={this.props.data} />
            </div>
        );
    }
}

export default AppTable;