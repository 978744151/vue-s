<template>
<div class="contanier">
 <router-view/>
 <div style="width:100% height:46px;">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <div @click="$router.push('/home')">
          <span class="fa fa-home"></span>
          <span>首页</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="分类">
        <div @click="$router.push('/category')">
        <span class="fa fa-bars"></span>
        <span>分类</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="购物车" >
        <div @click="$router.push('/cart')">
        <span class="fa fa-shopping-cart"></span>
        <span>购物车</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="我的" >
        <div @click="$router.push('/user')">
        <span class="fa fa-user"></span>
        <span>我的</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
 </div>

</div>

</template>

<script>
export default {
  data() {
    return {
      selected: '首页'
    }
  }
}
</script>

<style lang="less">
html,body{
  padding: 0;
  margin: 0;
	height: 100%;
  background-color: #fff;
  width: 100%;
}
.contanier{
  width: 100%;
  padding-bottom: 50px;
}
li{
  list-style: none;
}
.fa{
  font-size: 20px;
}
.mint-tab-item span{
  display: block;
}

</style>
