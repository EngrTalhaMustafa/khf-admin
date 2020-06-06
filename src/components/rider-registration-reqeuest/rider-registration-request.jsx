import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import '../../App.css';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { connect } from 'react-redux';
import RiderRequestDrawer from '../drawer/riderRequestViewdrawer';
import AppTable from '../table/table';
class RiderRegistraionReuqest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    }
    console.log("XXXXXXX")
  }
  componentDidMount() {
    axios.get('http://localhost:3000/admin/rider-requests')
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data.map(req => { req['key'] = req.id; return req })
        })
        console.log("riderrequests", res)
      })
      .catch(e => {
        this.setState({
          ...this.state,
          isLoading: false,
        })
      });
  }


  handleSelectClick = (obj) => {
    this.props.selectRiderRequest(obj);
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
        <RiderRequestDrawer editRequest={this.editRequest} ref={(cd) => this.child = cd} />
        <AppTable
          type={"riderRequestColumns"}
          data={data}
          handleSelectChild={this.handleSelectClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRiderRequest: (obj) => { dispatch({ type: "SELECT_RIDER_REQUEST", payload: obj }) },
    openDrawer: () => { dispatch({ type: 'OPEN_RIDER_REQUEST_DRAWER' }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RiderRegistraionReuqest);