<template>
    <div>
        <van-nav-bar
        title="标题"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <van-popup v-model="show" position="bottom" :overlay="true">
            <div  class="menu-wrapper" ref="menuWrapper">
            <div class="sku">
                <div v-if = "this.goods.morespec == 1">
                    <div class="">价格：<span>{{this.goods.buyprice}}</span></div>
                    <div class="">库存：<span>{{this.goods.storage}}</span></div>
                </div>
                <div v-if = "this.goods.morespec == 0">
                    <div class="van-sku-row__title">价格：<span>{{this.goods.buyprice}}</span></div>
                    <div class="van-sku-row__title">库存：<span>{{this.morespec.storecount}}</span></div>
                    <!-- red指的是定义的类名， red等于item.active  click事件引入this 先全部遍历一边， items.active 为false = ！ items.active 为true 实现效果-->
                    <div class="van-sku-row__title"  v-for="(item,index) in pro_goods" :key="index" > {{index}} 
                        <!-- <div class="spec" v-for="(k,v) in items" :key="v"  :class="{'active':active == k}"  @click="(active = k)  @click="changeItem(active,items,index)"><span></span></div> -->
                          <div class="spec" v-for="(items,index) in item" :key="index" :class="{'red' :red == items.active}" @click="changeItem(red,items,index,item)">{{items.name}}<span>
                            </span></div>
                    </div>
                </div>
               
                <div class="pro_num">
                <div style="margin-top:20px;">购买数量：</div>
                <van-stepper v-model="value" />
                </div>
            </div>
            </div>
            <van-button type="primary" bottom-action @click="cart_button">购物</van-button>
        </van-popup>

        <div class="pro_content">
            <van-swipe :autoplay="5000">
                <van-swipe-item v-for="(items,index) in banner" :key="index">
                    <img :src="items" alt="">
                </van-swipe-item>
            </van-swipe>
            <div class="pro_layer">
                <p>已选
                    <span>{{this.goods.buyprice}}</span>
                </p>
                <span>已选
                    <span>{{this.goods.commodityname}}</span>
                </span>
                <div class="pro_bottom"></div>
                <p @click="popup">已选
                    <span >{{this.goods.commodityname}}
                    </span>
                </p>

            </div>
            <div class="details_img">
                <div v-for="(items,index) in banner" :key="index" style="text-align:center">
                    <img :src="items" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Qs from 'qs'
import common from '../common/common'
import Vue from "vue"
import { Button,Stepper ,Icon,Swipe, SwipeItem,Popup} from 'vant';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Popup);
Vue.use(Stepper);
import { Checklist } from 'mint-ui';

Vue.component(Checklist.name, Checklist);

import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox).use(CheckboxGroup);
export default {
    data() {
        return {
            red:true,
            banner: [],
            goods: [],
            show: false,
            value: 1,
            active: '1',
            morespec : [],
            barcode : '',
            goodspec:[],
            spec:[],
            pro_spec:[],
            pro_goods:{
                内存:[{ name: 8 , active : false}, { name: 16 , active : false},{ name: 32 , active : false}],
                颜色:[{ name: '蓝色' , active : false},{ name: '红色' , active : false}]
            }
        }
    },
    methods: {
        changeItem(red, items,index,item){
            for(var i in item) {
                item[i].active = false
                console.log()
            }
            items.active = !items.active
        },
        // acti(k,active,$event){
        //     k == active
        //     console.log($event)
        // },
        cart_button(){
            console.log(this.active)
            console.log(this.value)
        },
        popup() {
            this.show = true

        },
        onClickLeft() {
            this.$router.back(-1)
        },
        onClickRight() {
        
        }
    },
    mounted() {
        axios({
            method: 'post',
            transformRequest: [data => Qs.stringify(data)],
            url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryOneGoods.action',
            data: {
                shopcode: 10000000,
                userid: 86,
                barcode: this.$route.query.key
            }
        }).then(res => {
            console.log(res.data)
            this.goods = res.data.result.goods
            let pro_img = res.data.result.goods.commoditysmallpic
            this.banner = pro_img.split(';')
            this.morespec = res.data.result.defaultspec
            this.barcode = res.data.result.goods.barcode
        })
            axios({
                method: 'get',
                transformRequest: [data => Qs.stringify(data)],
                url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryGoodsSpec.action?barcode=' +  this.$route.query.key,
            }).then(res => {
            console.log(res.data)
            this.goodspec = res.data.goodspec
            for(var k in res.data.goodspec){
                this.spec.push(k)
                this.pro_spec.push(res.data.goodspec[k])
            }
            console.log(this.pro_spec)
        })
    },
    components: {
        Button,
        Icon
    }
}

</script>

<style lang="less">
.banner {
    width: 100%;
    height: 200px;
}

.banner img {}

.van-swipe-item {
    height: 300px;
    text-align: center;
}

.pro_layer {
    padding: 5px 10px;
}

.pro_bottom {
    width: 100%;
    height: 20px;
    background-color: #eee;
}
.van-popup--bottom{
  
}

.sku{
    padding: 20px;
    overflow: scroll;
}
.pro_price{
    display: inline-block;
    padding: 5px 9px;
    margin: 0 10px 10px 0;
    height: 28px;
    min-width: 52px;
    line-height: 16px;
    font-size: 12px;
    color: #333;
    text-align: center;
    border: 1px solid #999;
    border-radius: 3px;
    box-sizing: border-box;
}
.red{
    color: red!;
    border: 1px solid red;
    background: red;
}
.spec{
    display: inline-block;
    padding: 5px 9px;
    margin: 0 10px 10px 0;
    height: 28px;
    min-width: 52px;
    line-height: 16px;
    font-size: 12px;
    color: #333;
    text-align: center;
    border: 1px solid #999;
    border-radius: 3px;
    box-sizing: border-box;
}
.pro_num{
  
}
.van-stepper{
    margin-bottom: 100px;
}
</style>
