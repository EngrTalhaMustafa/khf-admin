import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import '../../App.css';
import AppTable from '../table/table';
import {withRouter} from 'react-router-dom';
class Chiefs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cheifs: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/admin/chefs')
      .then(cheifs => {
        this.setState({
          ...this.state,
          cheifs: cheifs.data.map(cheif=>{cheif['key']=cheif.id;return cheif})
        },
          () => {
            console.log(this.state)
          })
      })
      .catch(e => {
        console.error(e)
      })
  }


  handleSelectChild = (cheif) => {
    // alert(JSON.stringify(cheif))
    this.props.history.push(`/cheif/${cheif.id}`)
    
  }

  render() {
    const {cheifs} = this.state;
    return (
      <div className="margin-top-62px">
        <AppTable
          type={"cheifColumns"}
          data={cheifs}
          handleSelectChild={this.handleSelectChild}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chiefs));