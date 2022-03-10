import React from "react"
import { Pagination,Select } from 'antd';
const { Option } = Select;


const Test = ()=>{
  return(
    <div>
     <Pagination
      total={85}
    />
    <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </div>
  )
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
}

export default Test


