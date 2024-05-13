<template>
  <el-form ref="form" class="login-container" :model="form" :rules="rules" >
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item> 
    <el-form-item class="login-button">
        <el-button @click="submit" type="primary">登录</el-button>
    </el-form-item>    
  </el-form>    
</template>

<script>
import  Mock  from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
    name:'Login',
    data() {
        return {
            form :{
                username :'',
                password : ''
            },
            rules :{
                username:[
                    { required:true,trigger:'blur',message:'请输入用户名'}
                    // trigger:'blur' 失去焦点时触发
                ],
                password:[
                    { required:true,trigger:'blur',message:'请输入密码'}
                ]
            }
        }
    },
    methods :{
        submit(){
            //校验通过
            this.$refs.form.validate((valid)=>{
                if(valid){
                    getMenu(this.form).then(({ data })=>{
                        // console.log(data)
                       if( data.code === 20000){
                         //存入token信息
                        Cookie.set('token',data.data.token)

                        //获取菜单数据，存入store中
                        this.$store.commit('setMenu',data.data.menu)
                        //传递路由
                        this.$store.commit('addMenu',this.$router)
                        //跳转到首页
                        this.$router.push('/home')
                       }else{
                            this.$message.error(data.data.message)
                       }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    .login-button{
        text-align:center;
    }
}
</style>


