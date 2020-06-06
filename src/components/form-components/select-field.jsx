import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const SelectField = props => {
    let handleChange= (event) => {
        // console.log(`selected ${event}`);
        // console.log(props.name,event)
        props.selectChangeHandler(props.name,event)
    }
    return (
        <Select style={{ width: 120 }} {...props} onChange={handleChange}>
            {

                props.options.map(option=>{
                   return <Option key={option.value} value={option.value}>{option.name}</Option>
                })
            }
        </Select>
    )
}

export default SelectField;