<template>
  <div class="manager">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      >
      <!-- 用户的表单信息 -->
      <!-- 设置 inline 属性可以让表单域变为行内的表单域 一行可以放多个 -->
      <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
      <el-form ref="form"  :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manager-header">
      <el-button @click="dialogVisible = true" type="primary">
        + 新增
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
    name:'User',
    data() {
        return {
            dialogVisible: false,
            form:{
              name:'',
              age:'',
              sex:'',
              birth:'',
              addr:''
            },
            // 校验规则
            rules:{
              name :[
                { required: true, message: '请输入姓名'}
              ],
              age :[
                { required: true, message: '请输入年龄'}
              ],
              sex :[
                { required: true, message: '请选择性别'}
              ],
              birth :[
                { required: true, message: '请选择出生日期'}
              ],
              addr :[
                { required: true, message: '请输入地址'}
              ],
            }
        }
    },
    methods:{
      //提交用户表单
      submit(){
        // validate	任一表单项被校验后触发	被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）
        this.$refs.form.validate((validate)=>{
          if(validate){
            //后续对表单的处理
            console.log(this.form)
            //清空表单
            this.$refs.form.resetFields()
            //关闭弹窗
            this.dialogVisible = false
          }
        })
      },
      handleClose(){
        //关闭弹窗时
        this.$refs.form.resetFields()
        this.dialogVisible = false
      }
    }
}
</script>

<style>

</style>