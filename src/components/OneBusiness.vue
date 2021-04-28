/**
* @module OneBusiness
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-22 16:04:14
*/

<template>
  <div class='tj_business' @click.stop="goShopDetail(item.path)">
    <div class="one_business clear">
      <div class="business_img">
        <img src="../assets/images/slider-pic/slider-pic1.jpeg" alt="">
      </div>
      <div class="business_info">
        <div class="business_name clear">
          <h3 class="fl ell"><span v-if="item.brand">品牌</span>{{item.shop_name}}</h3>
          <div class="name_icon fr">
            <div class="bzp" v-if="item.bao">
              <i>保</i>
            </div>
            <div class="bzp" v-if="item.piao">
              <i>票</i>
            </div>
            <div class="bzp" v-if="item.zhun">
              <i>准</i>
            </div>
          </div>
        </div>
        <div class="business_code clear">
          <div class="code_num fl">
            <svg class="v-md">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating-star"></use>
            </svg>
            <span class="v-md">{{item.shop_rating}}</span>
          </div>
          <div class="code_icon fr">
            <div class="zsd" v-if="item.on_time">准时达</div>
            <div class="fnzs" v-if="item.fengniao">蜂鸟专送</div>
          </div>
        </div>
        <div class="business_other clear">
          <div class="other_price fl">
            <span class="com_gray1">￥{{item.start_send}}起送</span>
            <span>/</span>
            <span class="com_gray1">配送费约￥{{item.send_cost}}</span>
          </div>
          <div class="other_dis fr">
            <span class="com_gray2">{{item.distance}}m</span>
            <span>/</span>
            <span class="com_blue">{{item.estimate_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, } from 'vue';
import { useRouter } from "vue-router"
export default defineComponent({
  name: 'OneBusiness',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup: () => {
    const router = useRouter();
    let goShopDetail = (path: string): void => {
      router.push(`/business${path}`)
    }
    return { goShopDetail }
  }
})
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.com_gray1 {
  color: #666;
}
.com_gray2 {
  color: #999;
}
.com_blue {
  color: #0096ff;
}
/* 单个商家 */
.one_business {
  background: #fff;

  .business_img {
    width: 1.6rem;
    height: 1.6rem;
    padding: 0.4rem;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .business_info {
    float: right;
    width: 7.4rem;
    height: 1.6rem;
    padding: 0.4rem 0.2rem 0.4rem 0;
    .business_name {
      font-size: 0.35rem;
      line-height: 0.45rem;
      vertical-align: top;
      h3 {
        width: 5rem;
        display: inline-block;
        span {
          color: #52250a;
          background: #ffd930;
          font-size: 0.2rem;
          padding: 0.02rem;
          border-radius: 2px;
          vertical-align: top;
          margin-right: 0.04rem;
        }
      }
      .bzp {
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.3rem;
        display: inline-block;
        color: #999;
        border: 0.01rem solid #ddd;
        padding: 0.01rem;
        border-radius: 3px;
        i {
          font-style: normal;
        }
      }
    }
    .business_code,
    .business_other {
      font-size: 0.25rem;
      margin-top: 0.3rem;
      line-height: 0.25rem;
    }
  }
  .code_num {
    svg {
      width: 0.3rem;
      height: 0.3rem;
      fill: #ffaa0c;
    }
  }
  .zsd {
    font-size: 0.25rem;
    height: 0.35rem;
    line-height: 0.3rem;
    padding: 0 0.05rem;
    display: inline-block;
    color: #0096ff;
    background: #fff;
    border: 0.01rem solid #0096ff;
    box-sizing: border-box;
    border-radius: 3px;
  }
  .fnzs {
    font-size: 0.25rem;
    height: 0.35rem;
    padding: 0 0.05rem;
    line-height: 0.3rem;
    display: inline-block;
    background: #0096ff;
    color: #fff;
    border: 0.01rem solid #0096ff;
    box-sizing: border-box;
    border-radius: 3px;
  }
}
</style>