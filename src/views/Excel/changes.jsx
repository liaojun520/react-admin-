import React,{useEffect} from 'react'
import { Modal, Button, Form, Input} from 'antd';
import { editItem } from "@/ajax/api"
import { message } from 'antd';


function Changes(props) {
  const {upDateIsShow,isShow,info} = props;
  const [form] = Form.useForm();
  form.setFieldsValue({
    author:info.author,
    title:info.title
  })
  return (
        <Modal
          forceRender //防止Form组件还没加载
          title="修改" 
          visible={isShow} 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={[
            <Button size="small" key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button size="small" key="submit" type="primary" htmlType="submit" onClick={handleOk}>
              确认
            </Button>
          ]}
        >
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: '请填写作者' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请填写标题' }]}
            >
              <Input />
            </Form.Item>
            
          </Form>
          <div>
            {info.author}
            <br/>
            {info.title}
          </div>
        </Modal>
  )
  function handleOk(){  //提交
    form.validateFields()
      .then(()=>{
        const val = form.getFieldValue()
        const data ={...info,...val}
        editItem(data).then(res=>{
          if(res.code===0){
            message.success("修改成功");
            upDateIsShow({close:false,type:"success"})  //type说明修改成功，列表需要重新渲染
          }
        })  
      })
      .catch(_=>{
        message.error("请填写完整信息");
      })
  }
  function handleCancel(){
    upDateIsShow({close:false})
  }
}

export default Changes
