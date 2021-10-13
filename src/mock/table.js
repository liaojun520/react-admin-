import Mock from "mockjs";
let List = [];
const count = 100;
const Random = Mock.Random

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Random.id(),
      title: "@ctitle(5, 10)",
      author: "@cname",
      readings: "@integer(300, 5000)",
      "star|1-3": "★",
      "status|1": ["published", "draft"],
      date: "@datetime",
    })
  );
}
export default {
  //查询
  tableList: (config) => {  //参数有{pageNum,pageSize,title}
     let value = JSON.parse(config.body)
     console.error(value)
     let start = 0,end = List.length,mockList = JSON.parse(JSON.stringify(List));
     if(value.title && value.title!==""){
        mockList = List.filter((item) => {
          if (item.title.indexOf(value.title) < 0) return false;
          return true;
        });
     }
     if(value.pageNum && value.pageSize){
        let pageNum = value.pageNum,pageSize = value.pageSize
        start = (pageNum - 1) * pageSize;
        end = pageNum * pageSize;
     }
    let pageList = mockList.slice(start, end);
    return {
      code: 0,
      data: {
        total: List.length,
        list: pageList,
        value
      },
    };
  },
  //删除
  deleteItem: (config) => {
    const { id } = JSON.parse(config.body);
    const item = List.filter((item) => item.id === id);
    try {
      const index = List.indexOf(item[0]);
      let value = List.splice(index, 1);
      return {
        code:0,
        data:value
      };
    } catch (error) {
      return{
        code:-1,
        message:"异常"
      }
    }
  },

//修改
editItem:(config)=>{
  const val = JSON.parse(config.body);
  const item = List.filter((item) => item.id === val.id);
  try {
    const index = List.indexOf(item[0]);
    const value = List.splice(index,1,val);
    return {
      code:0,
      data:value,
      message:"修改成功"
    };
  } catch (error) {
    return{
      code:-1,
      message:"异常"
    }
  }
}



};
