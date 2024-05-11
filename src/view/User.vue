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
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
            v-model="form.birth"
          ></el-date-picker>
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
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>
      <!--搜索区-->
      <el-form :model="userFrom" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userFrom.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary"> 查询 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <!-- stripe 设置斑马纹 -->
      <el-table stripe height="85%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <!-- 自定义列 -->
          <template slot-scope="scope">
            <!-- 获取当前行的性别数据再判断 -->
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      total: 0, //用户列表总条数
      modelType: 0, //判断是什么业务 0是新增弹窗 1是编辑弹窗
      pageData: {
        //分页参数
        page: 1,
        limit: 10,
      },
      userFrom:{
        name:''
      }
    };
  },
  methods: {
    //提交用户表单
    submit() {
      // validate	任一表单项被校验后触发	被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）
      this.$refs.form.validate((validate) => {
        if (validate) {
          //后续对表单的处理
          //判断此时是什么业务 新增窗口为0 编辑窗口为1
          if (this.modelType === 0) {
            //新增
            addUser(this.form).then(() => {
              //重新获取列表
              this.getList();
            });
          } else {
            //编辑
            editUser(this.form).then(() => {
              //重新获取列表
              this.getList();
            });
          }
          //清空表单
          this.$refs.form.resetFields();
          //关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    handleClose() {
      //关闭弹窗时
      //点击取消时
      //重置表单信息
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleAdd() {
      //点击新增按钮时
      this.modelType = 0;
      this.dialogVisible = true;
    },
    handleEdit(row) {
      //点击编辑按钮时
      this.modelType = 1;
      //打开弹窗
      this.dialogVisible = true;
      //要对当前行数据进行深拷贝，否则会修改原来的row数据
      //深拷贝会递归地创建新对象，并将原始对象的数据复制到新对象中，因此新对象与原始对象之间不存在数据共享
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDel(row) {
      //删除用户
      //确认弹窗
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新加载列表
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //切换当前页时触发的回调函数
    handlePage(val) {
      (this.pageData.page = val), this.getList();
    },
    //获取列表的数据
    getList() {
    getUser({ params: {...this.userFrom,...this.pageData} }).then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
        this.total = data.count || 0; //容错处理
      });
    },
    //查询提交回调函数
    onSubmit(){
      this.getList()
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manager {
  height: 678px;
  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    height: calc(100% - 62px);
    position: relative;
    .pager {
      position: absolute;
      bottom: 25px;
      right: 20px;
    }
  }
}
</style>>
