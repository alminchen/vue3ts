/**
* @module BusinessRating
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-23 15:35:20
*/

<template>
  <div class='business_rating' :style="{ height: height + 'px' }">
    <div class="total_evaluate clear">
      <div class="total_code">
        <h3>{{commodity.shop_rating}}</h3>
        <p class="p1">综合评价</p>
        <p class="p2"><span v-if="commodity.high_or_low">高</span><span v-else>低</span>于周边商家{{commodity.h_l_percent}}%</p>
      </div>
      <div class="detail_code">
        <p>
          <span class="small_tit v-md">服务态度</span>
          <YellowStar :code="commodity.shop_rating"></YellowStar>
          <span class="orange_code  v-md">{{commodity.service_code}}</span>
        </p>
        <p>
          <span class="small_tit v-md">菜品评价</span>
          <YellowStar :code="commodity.shop_rating"></YellowStar>
          <span class="orange_code  v-md">{{commodity.foods_code}}</span>
        </p>
        <p><span class="small_tit">送达时间</span><span style="margin-left:.1rem;">{{commodity.estimate_time}}分钟</span></p>
      </div>
    </div>
    <div class="evaluate" v-for="(item,index) in commodity.evaluate" :key="index">
      <div class="user_img">
        <img src="../assets/images/slider-pic/slider-pic2.jpeg" alt="">
      </div>
      <div class="evaluate_con">
        <div class="evaluate_con_t flex_align">
          <p class="user_name">{{item.username}}</p>
          <p class="user_time">{{item.time}}</p>
        </div>
        <div class="evaluate_star">
          <YellowStar :code="item.evaluate_code"></YellowStar>
          <span class="v-md">{{item.send_time}}分钟送达</span>
        </div>
        <p class="evaluate_con_b">{{item.evaluate_details}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, } from 'vue';
import YellowStar from "@/components/YellowStar.vue"
export default defineComponent({
  name: 'BusinessRating',
  props: {
    height: {
      type: Number,
      default: () => 0
    },
    commodity: {
      type: Object,
      default: () => ({})
    }
  },
  components: { YellowStar },
  setup: () => {
    return {}
  }
})
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.business_rating {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  /* 总体评分 */
  .total_evaluate {
    background: #fff;
    margin-bottom: 0.25rem;
    .total_code {
      text-align: center;
      border-right: 1px solid #ccc;
      width: 2.6rem;
      padding: 0.2rem;
      float: left;

      h3 {
        font-size: 0.8rem;
        line-height: 1;
        font-weight: 400;
        color: #f60;
      }
      > .p1 {
        font-size: 0.3rem;
        color: #666;
      }
      > .p2 {
        font-size: 0.25rem;
        color: #aaa;
      }
    }
    .detail_code {
      margin-left: 3rem;
      padding: 0.2rem 0.4rem;
      p {
        font-size: 0.3rem;
        color: #666;
        .orange_code {
          color: #f60;
          padding-left: 0.2rem;
          font-size: 0.4rem;
        }
        .small_tit {
          margin-right: 0.2rem;
        }
      }
    }
  }
  /* 内容 */
  .evaluate {
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding: 0.2rem;
    .user_img {
      width: 1rem;
      height: 1rem;
      padding: 0.2rem;
      float: left;
      img {
        width: 100%;
      }
    }
    .evaluate_con {
      margin-left: 1.4rem;
      padding-right: 0.2rem;
      .evaluate_con_t {
        line-height: 0.7rem;
        .user_name {
          font-size: 0.4rem;
        }
        .user_time {
          color: #999;
          font-size: 0.35rem;
        }
      }
      .evaluate_star {
        font-size: 0.3rem;
      }
      .evaluate_con_b {
        padding: 0.1rem 0;
        font-size: 0.35rem;
      }
    }
  }
}
</style>