import React, { Fragment } from "react";
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import styles from './Styles.modules.css';
import './styles.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Table, Input, Button } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { fetchall, storeAll, addNew, deleter } from "./Dashboard.actions";
import Axios from "axios";

class Dashboard extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            userdata: [],
            singleData: {
                name: '',
                id: null,
                shop: '',
                status: ''
            },
            reset: {
                name: '',
                id: null,
                shop: '',
                status: ''
            }
        }
    }
    componentWillMount() {
        this.props.dispatch(fetchall())


    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data) {
            this.setState({ userdata: nextProps.data })
            this.setState({ singleData: this.state.reset })
        }
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
            </div>
        ),
        // filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    rowSelect = row => {
        console.log(row)

        this.setState({ singleData: row })
    }
    addData = e => {
        debugger
        this.props.dispatch(addNew(this.state.singleData))
    }
    render() {
        let { userdata } = this.state
        let { name, shop, id, status } = this.state.singleData
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Shop',
                dataIndex: 'shop',
                key: 'shop',
                width: '20%',
                ...this.getColumnSearchProps('shop'),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                ...this.getColumnSearchProps('status'),
            },
            {
                title: 'DELETE',
                key: 'delete',
                render: (text, row, index) => <span style={{ cursor: "pointer" }} onClick={() => this.props.dispatch(deleter(row.id))} > del</span >
            },
        ];
        return (
            <div style={{ display: 'flex', padding: '30px' }}>
                <Table
                    columns={columns}
                    dataSource={userdata}
                    onRowClick={(selectedRowKeys, selectedRows) => this.rowSelect(selectedRowKeys)}
                />
                <div >
                    <span className={'label'}>Name</span>
                    <Input
                        value={name}
                        onChange={(e, value) => this.setState({ singleData: { ...this.state.singleData, name: e.target.value } })}
                    />
                    <span className={'label'}>Shop Name</span>
                    <Input
                        value={shop}
                        onChange={(e, value) => this.setState({ singleData: { ...this.state.singleData, shop: e.target.value } })}
                    />
                    <span className={'label'}> Status</span>
                    <TextArea
                        value={status}
                        onChange={(e, value) => this.setState({ singleData: { ...this.state.singleData, status: e.target.value } })}
                    />

                    <span className={'submitButton'} onClick={() => this.addData()}>SUBMIT</span>
                    <span onClick={() => this.setState({ singleData: this.state.reset })}>reset</span>
                </div>
            </div >
        );
    }
}

export default withRouter(connect(state => ({
    data: state.DashboardReducer.users,
}))(Dashboard));