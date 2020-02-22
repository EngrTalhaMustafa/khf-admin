import React from 'react';
import { InputNumber } from 'antd';
const NumberInput = props => {
    return (
        <input style={{
            height: '33px',
            borderRadius: '5px',
            borderWidth: '1px',
            borderColor: 'lightgray'


        }} {...props} />
    )
}

export default NumberInput;