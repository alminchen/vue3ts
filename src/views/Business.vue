/**
* @module Business
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-22 16:47:28
*/

<template>
  <div class="business_box">
    <div class="business_top">
      <div class="blur_bg"></div>
      <div class="font_words">
        <div class="fw_top">
          <div class="fw_top_img">
            <img src="../assets/images/shop-logo.png" alt="" />
          </div>
          <div class="fw_top_word clear">
            <h3 class="ell">{{ commodity.shop_name }}</h3>
            <p class="ell">
              <span v-if="commodity.fengniao">蜂鸟配送</span><span v-else>商家配送</span>／{{
                commodity.estimate_time
              }}分钟送达／配送费¥{{ commodity.send_cost }}
            </p>
            <p class="ell">公告：{{ commodity.notice }}</p>
          </div>
          <p class="shop_activity ell">
            <i class="new_user">减</i><span>{{ commodity.discount }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="change_show_type">
      <div>
        <span :class="{ activity_show: changeShowType == 'food' }" @click="changeShowType = 'food'">商品</span>
      </div>
      <div>
        <span :class="{ activity_show: changeShowType == 'rating' }" @click="changeShowType = 'rating'">评价</span>
      </div>
    </div>
    <business-content v-show="changeShowType == 'food'" :height="computedContentHeight" :commodity="commodity" :content-show="changeShowType"></business-content>
    <business-rating :height="computedContentHeight" :commodity="commodity"></business-rating>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, } from 'vue';
import { useStoreHooks } from '@/hooks';
import { useRoute } from "vue-router"
import BusinessContent from '@/components/BusinessContent.vue';
import BusinessRating from "@/components/BusinessRating.vue"
export default defineComponent({
  components: { BusinessContent, BusinessRating },
  name: 'Business',
  props: {},
  setup: () => {
    const { getters } = useStoreHooks();
    const route = useRoute();
    const state = reactive({
      id!: route?.params?.id.toString(),
      changeShowType: "food",
      computedContentHeight!: window.innerHeight - (window.innerWidth / 10) * 4.2
    })
    let getFalseBussinessInfo = computed(() => getters['getFalseBussinessInfo'])
    let commodity = computed(() => {
      return getFalseBussinessInfo?.value[state?.id]
    })
    return {
      ...toRefs(state),
      getFalseBussinessInfo,
      commodity
    }
  }
})
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.business_box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* 头部 */
  .business_top {
    height: 3rem;
    position: relative;
    .blur_bg {
      width: 100%;
      height: 100%;
      position: absolute;
      background: url(../assets/images/shop-logo.png) no-repeat center;
      background-size: cover;
      -webkit-filter: blur(0.08rem);
      filter: blur(0.08rem);
      z-index: 1;
    }
    .font_words {
      width: 100%;
      height: 100%;
      position: absolute;
      padding: 0.3rem;
      box-sizing: border-box;
      z-index: 2;
      .fw_top {
        .fw_top_img {
          img {
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 0.1rem;
            float: left;
          }
        }
        .fw_top_word {
          margin-left: 2rem;
          color: #fff;
          h3 {
            font-size: 0.7rem;
          }
          p {
            font-size: 0.37rem;
          }
        }
        .shop_activity {
          font-size: 0.3rem;
          color: #fff;
          line-height: 0.8rem;
          .new_user {
            display: inline-block;
            width: 0.35rem;
            height: 0.35rem;
            background: rgb(240, 115, 115);
            line-height: 0.35rem;
            text-align: center;
            vertical-align: middle;
            font-style: normal;
            font-size: 0.25rem;
            margin-right: 0.1rem;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
  }
  /* 切换按钮 */
  .change_show_type {
    height: 1.2rem;
    div {
      width: 50%;
      height: 1.2rem;
      float: left;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.45rem;
      background: #fff;
      span {
        &.activity_show {
          color: #3190e8;
          border-bottom: 0.05rem solid #3190e8;
          padding: 0.1rem 0.05rem;
        }
      }
    }
  }
}

@-webkit-keyframes mymove {
  0% {
    -webkit-transform: scale(1);
  }
  25% {
    -webkit-transform: scale(0.8);
  }
  50% {
    -webkit-transform: scale(1.1);
  }
  75% {
    -webkit-transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
/* 购物车弹弹弹 */
.tantantan {
  -webkit-animation: mymove 1s;
  animation: mymove 1s;
}
</style>