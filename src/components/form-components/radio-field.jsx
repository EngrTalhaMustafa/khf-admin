import React from 'react';
import { Radio } from 'antd';
const RadioField = props => {
    let { options } = props;
    let RadioOptions = options.map(option => {
        return <Radio key={option.value} value={option.value}>{option.name}</Radio>
    });
    return (
        <Radio.Group value={props.value} onChange={props.onChange} name={props.name}>
            {RadioOptions}
        </Radio.Group>
    )
}

export default RadioField;