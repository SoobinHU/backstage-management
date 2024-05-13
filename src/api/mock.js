import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import user from "./mockServeData/user";
import permission from "./mockServeData/permission";
//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//定义用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)
// mock只能拦截确定的url地址，拦截到不到带参数的url，如果一定要传参数则要加个正则进行匹配

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)