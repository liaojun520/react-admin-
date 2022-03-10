import React, { Component } from "react";
import {
  Table,
  Space,
  Button,
  message,
  Input,
  Tag,
  Pagination,
  DatePicker,
} from "antd";
import { tableList, deleteItem } from "@/ajax/api";
import "./style.less";
import Changes from "./changes";
import ExportJsonExcel from "js-export-excel";

class Excel extends Component {
  state = {
    params: {
      pageNum: 1,
      pageSize: 10,
      title:null
    },
    list: [],
    loading: false,
    total: 0,
    info: {
      isShow: false,
    },
  };
  render() {
    const { RangePicker } = DatePicker;
    const H = document.body.clientHeight - 200;
    const columns = [
      {
        title: "作者",
        key: "author",
        dataIndex: "author",
        "min-width": 100,
        align: "left",
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        "min-width": 200,
        align: "left",
      },
      {
        title: "等级",
        dataIndex: "star",
        key: "star",
        "min-width": 195,
        align: "left",
        render: (star) => {
          const color = star === "★★" ? "green" : star === "★★★" ? "red" : "";
          return <Tag color={color}>{star}</Tag>;
        },
      },
      {
        title: "操作",
        dataIndex: "do",
        key: "do",
        align: "center",
        render: (text, record) => (
          <Space size="small">
            <Button size="small" onClick={() => this.changeRow(record)}>
              修改
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => this.dele(record.id)}
            >
              删除
            </Button>
          </Space>
        ),
      },
    ];
    const { list, info, total,params,loading} = this.state;
    return (
      <div>
        {/* 头部 */}
        <div className="search">
          <Space direction="vertical" size={12}>
            <Input
              className="input"
              size="small"
              placeholder="请输入标题"
              value={params.title}
              onChange = {(e)=>this.getTitle(e)}
            />
          </Space>
          &nbsp;&nbsp;
          <Space direction="vertical" size={12}>
            <RangePicker size="small" onChange={this.setPicker} />
          </Space>
          &nbsp;&nbsp;
          <Space direction="vertical" size={12}>
            <Button size="small" onClick={this.searchFun}>
              查询
            </Button>
          </Space>
          &nbsp;&nbsp;
          <Space direction="vertical" size={12}>
            <Button size="small" type="primary" onClick={this.downloadFun}>
              导出
            </Button>
          </Space>
        </div>
        {/* 表格 */}
        <Table
          dataSource={list}
          columns={columns}
          rowKey={(record) => record.id}
          scroll={{ y: H }}
          loading = {loading}
          pagination={
            // {
            //  current: params.pageNum,
            //  pageSize: params.pageSize,
            //  total
            // }
            false //不采用表格组件自带的分页
          } 
          // onChange={this.handleTableChange}
        />
        {/* 分页 */}
        <Pagination
          total={total}
          pageSizeOptions={["10", "20", "40","50"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={params.pageNum}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        />
        {/* 修改弹窗 */}
        <Changes info={info} upDateIsShow={this.upDateIsShow} />
      </div>
    );
  }
  componentDidMount() {
    this.getList();
  }
  // 请求列表
  getList() {
    const { params } = this.state;
    this.setState({ loading: true });
    tableList(params)
      .then((res) => {
        if (res.code === 0) {
          this.setState({
            list: [...res.data.list],
            total: res.data.total,
            loading: false,
          });
        }
      })
      .catch(() => this.setState({ loading: false }));
  }
  // 删除
  dele(id) {
    deleteItem({ id }).then((res) => {
      if (res.code === 0) {
        message.success("删除成功");
        this.getList()
      }
    });
  }
  // 时间选择器
  setPicker = (e, date) => {
    this.setState((state) => ({
      params: { ...state.params, startTime: date[0], endTime: date[1] },
    }));
  }
  // 标题
  getTitle(e){
    let title = e.target.value
    this.setState(state=>({params:{...state.params,title}}))
  }
  // 搜索
  searchFun = () => {
    this.getList();
  };
  // 修改
  changeRow(row) {
    this.setState({ info: { ...row, isShow: true } });
  }
  // 关闭弹框
  upDateIsShow = (val)=> {
    // 取消/确认
    if(val){
      this.setState(state=>({info:{...state.info,isShow:val.close}}))
      // 修改成功，更新列表
      if(val.type){
        this.getList()
      }
    }
  }
  /**
   * 分页拆分成两个函数
   * 第几页 
   * 每页几条
   */
  // 第几页
  changePage = (pageNum,pageSize)=>{
    this.setState(state=>({
      params:{
        ...state.params,
        pageNum
      }
    }),()=>{
      this.getList()
    })
  }
  // 每页几条
  changePageSize = (pageNum,pageSize)=>{
    this.setState(state=>({
      params:{
        ...state.params,
        pageSize
      }
    }),()=>{
      this.getList()
    })
  }
  handleTableChange = (pagination)=>{
    const {current,pageSize} = pagination
    this.setState(state=>({
      params:{
        ...state.params,
        pageNum:current,pageSize
      }
    }),()=>{
      this.getList()
    })
  }
  // 导出
  downloadFun = ()=> {
    const {list} = this.state
    if(list && !list.length){
      message.warn("导出为空")
      return
    }
    let option = {};
    option.fileName = '导出文件名';
    option.datas = [
      {
        sheetData: list,  //excel文件中的数据源
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

export default Excel;
