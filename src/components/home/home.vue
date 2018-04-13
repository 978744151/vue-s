<template>
  <div class="home_content">
    <van-nav-bar
    title="标题"
    left-text="返回"
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <div class="lt_search">
      <i class='mui-icon mui-icon-search'></i>
      <input type="text" class="search_text" placeholder="请输入搜索关键字" @focus="handleinput()">
    </div>
    <div class="content">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in banner" :key="index" @click="$router.push('product.html'+item.barcode)">
            <img :src=item.commoditycarousel alt="" @click="$router.push('product.html?key='+item.barcode)">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="goods-list">
        <div class="goods-item" v-for="(item,index) in goodlist" :key="index" @click="$router.push('/product?key='+item.barcode)">
          <img :src="item.commoditypic">
          <h4></h4>
          <div class="info">
            <p class="price">
              <span class="nowPrice">￥{{item.buyprice}}</span>
              <span>
                <del>￥{{item.saleprice}}</del>
              </span>
            </p>
            <p class="sale">
              <span>热卖中</span>
              <span>销量{{item.totalsale}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
import common from '../common/common'
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  data() {
    return {
      banner: [],
      goodlist: {}
    }
  },
  methods: {
    handleinput() {
      this.$router.push({path: '/search'})
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    onClickRight() {
    
    }
  },
  created() {

    axios({
      url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryBannerPicture.action?shopcode=10000000',
      type: 'get'
    }).then(res => {
      this.banner = res.data.result.Banner;
    })
    axios({
      url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryAllGoods.action?shopcode=10000000',
      type: 'get'
    }).then(res => {
      console.log(res.data.result)
      this.goodlist = res.data.result.goods;
    })
  }
}
</script>

<style lang="less">

.lt_search {
  text-align: center;
  padding: 8px 0px;
  border-radius: 62px;
  width: 100%;
}
.van-nav-bar__left{

    span{
    color: black;

    }
    .van-icon{
        color: black;
    }
}
input {
  border: 1px solid rgba(0, 0, 0, .2);
  outline: 0;
  width: 94.7%;
  margin: 0;
  border-radius: 25px;
  height: 31px;
  font-size: 14px;
  text-align: center;
}



.content .banner {
  width: 100%;
  height: 200px;
}

.content .banner img {
  width: 100%;
  height: 100%;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
}

.goods-list .goods-item {
  width: 46%;
  border: 1px solid #ccc;
  margin: 1%;
  box-shadow: 0 0 7px #aaa;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-list .goods-item img {
  width: 100%;
  border: 0;
}

.goods-list .goods-item .info {
  background-color: #eee;
}

.goods-list .goods-item h4 {
  font-size: 14px;
}

.goods-list .goods-item .info p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

.goods-list .goods-item .info p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}

.goods-list .goods-item .info p:nth-child(1) .nowPrice {
  color: red;
  font-size: 15px;
  margin-right: 8px;
}
</style>
