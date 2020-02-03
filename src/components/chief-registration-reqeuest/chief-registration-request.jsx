import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import '../../App.css';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { connect } from 'react-redux';
import AppDrawer from '../drawer/drawer';
import AppTable from '../table/table';
class ChiefRegistraionReuqest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    }
    this.childTwo = React.createRef();
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
    // this.child.showDrawer()
    this.props.selectChiefRequest(obj);
    this.props.updateFirstDrawerData(obj)
    this.props.openDrawer();
  };

  render() {
    const { data } = this.state;

    console.log(data);
    return (
      <div className="margin-top-62px">
        <AppDrawer ref={(cd) => this.child = cd} />
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
    selectChiefRequest: (obj) => { dispatch({ type: "SELECT_CHEIF_REQUEST", payload: obj }) },
    updateFirstDrawerData: (obj) => { dispatch({ type: "UPDATE_FIRST_DRAWER_DATA", payload: obj }) },
    openDrawer: () => { dispatch({ type: "OPEN_DRAWER_STATE" }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChiefRegistraionReuqest);