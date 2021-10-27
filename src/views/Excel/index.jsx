import React, { useEffect, useState } from "react"
import { Table, Space, Button, message, Input, Tag, Pagination, DatePicker,  } from 'antd';
import { tableList, deleteItem } from "@/ajax/api"
import "./style.less"
import Changes from "./changes"
import ExportJsonExcel from 'js-export-excel';


const { RangePicker } = DatePicker;

const ExcelDom = () => {
const H = document.body.clientHeight - 200 
const [table, setTableList] = useState(() => []) //列表
const [total,setTotal] = useState(1)
const [params, setParams] = useState( function getInitialState() {
  return { pageNum: 1, pageSize: 10 }
}) //初始入参
const [isShow,setIsShow] = useState(false) //修改弹框
const [info,setInfo] = useState(()=>({})) //修改对象
  
useEffect(() => {
  GetTableList()  //初始化 
}, [])

const columns = [
  {
    title: "作者",
    key: "author",
    dataIndex: "author",
    "min-width": 100,
    align: "left"
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    "min-width": 200,
    align: "left"
  },
  {
    title: "等级",
    dataIndex: "star",
    key: "star",
    "min-width": 195,
    align: "left",
    render:star=>{
      const color = star==="★★" ? "green" : star==="★★★" ? "red" : "";
      return(
        <Tag color={color}>{star}</Tag>
      )
    }
  },
  {
    title: "操作",
    dataIndex: "do",
    key: "do",
    width: 200,
    align: "center",
    render:(text, record) => (
      <Space size="small">
        <Button  size="small" onClick={() => changeRow(record)}>修改</Button>
        <Button type="primary" size="small" onClick={() => dele(record.id)}>删除</Button>
      </Space>
    )
  },
];

  return (
    <div>
      <div className="search">
        <Space direction="vertical" size={12}>
          <Input
              className="input"
              size="small"
              value={params.title || null}
              onChange={(e) => setParams({...params,title:e.target.value})}
              placeholder="请输入标题"
            />
        </Space>&nbsp;&nbsp;
        <Space direction="vertical" size={12}>
          <RangePicker size="small" onChange={ setPicker } />
        </Space>&nbsp;&nbsp;
        <Space direction="vertical" size={12}>
          <Button size="small" onClick={searchFun}>查询</Button>
        </Space>&nbsp;&nbsp;
        <Space direction="vertical" size={12}>
          <Button size="small" type="primary" onClick={downloadFun}>导出</Button>
        </Space>
      </div>
      <Table
        dataSource={table}
        columns={columns}
        rowKey={record => record.id}
        pagination={
          // 前端手动分页
          // { 
          //   position:"bottomLeft",
          //   showSizeChanger: true,
          //   showQuickJumper: true,
          //   showTotal: () => <span>共 {table && table.length} 条记录</span>
          // }
          false
        }
        scroll={{ y: H }}
      >
        {/* <Column title="作者" dataIndex="author" key="author" width={100} />
        <Column title="标题" dataIndex="title" key="title" width={200}/>
        <Column title="readings" dataIndex="readings" key="readings" width={200}/>
        <Column title="等级" 
        dataIndex="star" 
        min-width={100}
        render={star=>{
          const color = star==="★★" ? "green" : star==="★★★" ? "red" : ""
          return(
            <Tag color={color}>{star}</Tag>
          )
        }}
        />
        <Column
          title="操作"
          dataIndex="actions"
          key="actions"
          width={200}
          align="center"
          render={(text, record) => (
            <Space size="small">
              <Button  size="small" onClick={() => changeRow(record)}>修改</Button>
              <Button type="primary" size="small" onClick={() => dele(record.id)}>删除</Button>
            </Space>
          )}
        /> */}
      </Table>
      <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={10} total={total} onChange={onPagination}/>
      {isShow && <Changes isShow={isShow} info={info} upDateIsShow={upDateIsShow} />}
    </div>
  )
  //查询
  function GetTableList(val) {
    const data = val || params
    tableList(data).then(res => {
      if (res.code === 0) {
        setTableList([...res.data.list])
        setTotal(res.data.total)
      }
    })
  }
  //删除
  function dele(id) {
    deleteItem({ id }).then(res => {
      if (res.code === 0) {
        message.success("删除成功")
        GetTableList(params)
      }
    })
  }
  //时间选择器
  function setPicker(moment,date){
    console.log(moment,date)
    if(date && date.length===2)
      setParams({...params,startTime:date[0],endTime:date[1]})
  }
  //搜索
  function searchFun() {
    //重置第一页
    setParams(val=>{
      const data = {...val,pageNum: 1, pageSize: 10 };
      GetTableList(data) //调用查询接口
      return data //更新state值
    }) 
  }
  //修改 
  function changeRow(row){
    setInfo({...row})
    setIsShow(true)
  }
  //关闭弹框
  function upDateIsShow(val){
   val && setIsShow(val.close)
   if(val && val.type){
     GetTableList() //更新列表
   }
  }
  //分页
  function onPagination(pageNum,pageSize){
    setParams(val=>{
      const data = {...val,pageNum,pageSize};
      GetTableList(data);
      return data;
    })
  }
  //导出
  function downloadFun(){
    if(table && table.length===0){
      message.warn("导出为空")
      return
    }
    let option = {};
    option.fileName = '导出文件名';
    option.datas = [
      {
        sheetData: table,  //excel文件中的数据源
        sheetName: option.fileName,  //excel文件中sheet页名称
        sheetHeader: ['作者', '标题', 'readings', '等级'],  //excel文件中每列的表头名称
        sheetFilter: ['author', 'title', 'readings', 'star'],  //excel文件中需显示的列数据
        columnWidths: [4,10,4,4]  //每纵的长度
      }
    ]
    const toExcel = new ExportJsonExcel(option);  //生成excel文件
    toExcel.saveExcel();  //下载excel文件
  }



}
export default ExcelDom