import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
export default class Dashboard extends Component {
    render() {
        // axios.get('ec2-18-140-66-46.ap-southeast-1.compute.amazonaws.com:3000/menu')
        // .then(e=>{console.log('d',e)})
        // .catch(e=>{console.log(('de',e))})
        return (
            <div className="margin-top-62px">
                <h1>DASHBOARD</h1>
            </div>
        );
    }
}
