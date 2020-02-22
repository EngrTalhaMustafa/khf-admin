import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import '../../App.css';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { connect } from 'react-redux';
import CheifRequestDrawer from '../drawer/cheifRequestViewdrawer';
import AppTable from '../table/table';

class ChiefRegistraionReuqest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    }
 
  }
  componentDidMount() {
    // axios.post('localhost:3000/auth/chef/login',{user_name:'rider',password:'12345'})
    // .then(e=>{console.log('result',e.data)})
    // .catch(e=>{console.log('de',e)})

    axios.get('http://localhost:3000/admin/chef-requests')
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data.map(req=>{req['key']=req.id;return req})
        })
      })
      .catch(e => {
        this.setState({
          ...this.state,
          isLoading: false,
        })
      });
  }

  handleSelectClick = (obj) => {
    console.log("MNMNMN",obj)
    this.props.selectChiefRequest(obj);
    this.props.openDrawer();
  };

  editRequest = ()=>{
    // alert(1)
    console.log(this.props)
    // this.props.location.push('/edit-cheif-request')
  }

  render() {
    const { data } = this.state;

    console.log(data);
    return (
      <div className="margin-top-62px">
        <CheifRequestDrawer editRequest={this.editRequest} ref={(cd) => this.child = cd} />
        <AppTable
          type={"cheifRequestColumns"}
          data={data}
          handleSelectChild={this.handleSelectClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    testData: state.testData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChiefRequest: (obj) => { dispatch({ type: "SELECT_CHIEF_REQUEST", payload: obj }) },
    openDrawer: () => { dispatch({ type: 'OPEN_CHEIF_REQUEST_DRAWER' }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChiefRegistraionReuqest);