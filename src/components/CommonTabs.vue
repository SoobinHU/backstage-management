<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in this.$store.state.tab.tabsList"
      :key="item.path"
      :closable="item.name!=='home'"
      :effect="item.name === $route.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "CommonTabs",
  data() {
    return {};
  },
  methods:{
    //点击tag转跳的实现
    changeMenu(item){
        this.$router.push({name:item.name})
    },
    //删除tag的实现
    handleClose(item,index){
        this.$store.commit('closeTag',item)
        const length = this.$store.state.tab.tabsList.length
            //跳转逻辑
            //如果删除的tag不是当前高亮的tag 则直接删除就好
            if(item.name !== this.$route.name){
                return
            }
            //如果删除的是最后一项高亮项时 得往上一级跳转
            if(index === length){
                this.$router.push({
                    name:this.$store.state.tab.tabsList[index-1].name
                })
            }
            //除此之外 删除中间高亮项时 得往下一级跳转
            else{
                this.$router.push({
                    name:this.$store.state.tab.tabsList[index].name
                })
            }
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>
