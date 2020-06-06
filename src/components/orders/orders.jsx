import React, { Component } from 'react';
import '../../App.css';
import api from '../../api';
import { connect } from 'react-redux';
import AppTable from '../table/table';
import OrderDrawer from '../drawer/orderDrawer';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    api.get('/admin/orders').then(orders => {
      console.log(orders);
      this.setState({ orders: orders.data.data.map(order => { order['key'] = order.id; return order }) })
    })
      .catch(e => {
        console.log(e)
      })
  }

  handleSelectClick = (order) => {
    // console.log("x34",order)
    this.props.selectOrder(order);
    this.props.openDrawer();
  }

  editRequest = (obj)=>{
    
  }

  render() {
    const { orders } = this.state;
    console.log("orders", orders)
    return (

      <div className="margin-top-62px">
        <OrderDrawer editRequest={this.editRequest} ref={(cd) => this.child = cd} />
        <AppTable
          type={"ordersColumns"}
          data={orders}
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
    selectOrder: (obj) => { dispatch({ type: "SELECT_ORDER", payload: obj }) },
    openDrawer: () => { dispatch({ type: 'OPEN_ORDER_DRAWER' }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);