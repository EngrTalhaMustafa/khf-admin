import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import '../../App.css';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { connect } from 'react-redux';
// import AppDrawer from '../drawer/drawer';
import AppTable from '../table/table';
class RiderRegistraionReuqest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    }
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data.slice(0, 10).map(e => {
            let req = {
              name: e.userId,
              number: e.id,
              status: e.completed,
              area: e.title
            }
            return req;
          })
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
    this.props.changeDrawerState({
      

    });
  };

  render() {
    const { data } = this.state;

    console.log(data);
    return (
      <div className="margin-top-62px">
        {/* <AppDrawer ref={(cd) => this.child = cd} /> */}
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
    changeDrawerState: (payload) => { dispatch({ type: "CHANGE_DRAWER_STATE",payload:payload }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RiderRegistraionReuqest);