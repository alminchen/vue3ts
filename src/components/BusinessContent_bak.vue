/**
* @module BusinessContentl
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-22 16:33:12
*/

<template>
  <section>
    <div class="business_content" :style="{ height: height + 'px' }">
      <ul class="business_left" ref="businessLeft">
        <li v-for="(item, index) in commodity.commodity" :key="index" :class="{ active_ia: index == 0 }" :ref="setLleftNode" @click="leftControlRightScroll(index)">
          {{item.name}}
          <span class="left_red" v-if="reNub[item.type_accumulation]">{{reNub[item.type_accumulation]}}</span>
        </li>
      </ul>
      <ul class="business_right" ref="ullist">
        <li v-for="(n, index) in commodity.commodity" :key="index" ref="rightLi">
          <header class="type_title ell" :ref="setRightNode">
            <strong class="ell">{{ n.name }}</strong>
            <span>{{ n.description }}</span>
          </header>
          <div class="single_commodity" v-for="(x, idx) in n.foods" :key="idx">
            <div class="single_l">
              <img src="../assets/images/slider-pic/slider-pic1.jpeg" alt />
            </div>
            <div class="single_r">
              <h4>{{x.name}}</h4>
              <p>{{x.tips}}</p>
              <p class="xiaolq">
                月售{{ x.month_sales }}份，好评率{{ x.satisfy_rate }}%
              </p>
              <div class="add_remove">
                <span>￥{{ x.unit_price }}</span>
                <div class="add_remove_btn">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add" v-if="shoppingCarList[x.one_food_id]" @click.stop="reduce_food(x.one_food_id)" />
                  </svg>
                  <span class="commodity_count" v-if="shoppingCarList[x.one_food_id]">{{ shoppingCarList[x.one_food_id].count }}</span>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus" @click.stop="add_food(n, x, $event)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shopping-car :change-show-type="contentShow" :send-const="sendConst" ref="shopping_car" @showList="shoppingCarShowIn" @goPay="goPayStatus"></shopping-car>
    <shopping-car-list :shopping-car-show="shoppingCarShow" @clearShopping="cleanShopCar" :shopping-car-list="shoppingCarList" @reduceCarFood="reduce_food" @addCarFood="add_mask_food"></shopping-car-list>
    <div class="mask" v-if="shoppingCarShow || alertMaskShow" @click="shoppingCarShow = false;alertMaskShow = false"></div>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, } from 'vue';
import { useStoreHooks } from '@/hooks';
import ShoppingCar from './ShoppingCar.vue';
import ShoppingCarList from './ShoppingCarList.vue';
import BScroll from "better-scroll"
export default defineComponent({
  components: { ShoppingCar, ShoppingCarList },
  name: 'BusinessContentl',
  props: {
    height: {
      type: Number,
      default: () => 0
    },
    commodity: {
      type: Object,
      default: () => ({})
    },
    contentShow: {
      type: String,
      default: () => 'food'
    }
  },
  setup: (ctx) => {
    const { dispatch } = useStoreHooks();
    let state: any = reactive({
      leftNode: [],
      rightNode: [],
      indexss: 0,
      shoppingCarList: {},
      reNub: {},
      allNub: 0,
      totalPrice: 0,
      allTotalPrice: 0,
      alertBoxShow: false,
      shoppingCarShow: false,
      sendConst: 0,
      righgtControl: null,
      leftScrollTimer: null,
      alertMaskShow: false
    })
    let businessLeft = ref<null | HTMLElement>(null);
    let leftLi = ref<null | HTMLElement>(null);
    let ullist = ref<null | HTMLElement>(null);
    let rightLi = ref<null | HTMLElement>(null);
    let typeTitle = ref<null | HTMLElement>(null);
    let shopping_car: any = ref<null | HTMLElement>(null)
    onMounted(() => {
      state.sendConst = ctx.commodity.send_cost;
      init();
      console.log(BScroll);
    })
    onUnmounted(() => {
      clearInterval(state.leftScrollTimer);
      state.leftScrollTimer = null;
      let rightDOM: HTMLElement | any = ullist.value
      rightDOM.removeEventListener("scroll", () => { console.log('object'); }, false)
    })
    const init = (): void => {
      rightControlLeftClass()
    }
    const setLleftNode = (el: HTMLElement) => {
      state.leftNode.push(el)
    }
    const setRightNode = (el: HTMLElement) => {
      state.rightNode.push(el)
    }
    const rightControlLeftClass = (): void => {
      let rightDOM: HTMLElement | any = ullist.value
      let leftLiO: HTMLElement | any = state.leftNode;
      let ti: HTMLElement | any = state.rightNode;
      let asIndex = 0;
      state.righgtControl = rightDOM.addEventListener("scroll", (e: { target: { scrollTop: number; }; }) => {
        let thisST: number = e.target.scrollTop;
        for (let i in ti) {
          if (thisST >= ti[i].offsetTop) {
            asIndex = Number(i)
          }
        }
        leftLiO.forEach((item: HTMLElement) => {
          item.classList.remove("active_ia")
        })
        leftLiO[asIndex].classList.add("active_ia");
      }, false)
    }
    const leftControlRightScroll = (index: number): void => {
      state.indexss = index;
      let rightUl_: HTMLElement | any = ullist.value;
      let rightTi: HTMLElement | any = state.rightNode;
      let top_: number = rightTi[index].offsetTop;
      scrollMove(rightUl_, top_)
    }
    const scrollMove = (ele: HTMLElement, top: number) => {
      let vector = Math.round(top - ele.scrollTop) / 10;
      state.leftScrollTimer = setInterval(() => {
        ele.scrollTop += vector;
        if (
          (ele.scrollTop >= top && vector > 0) ||
          (ele.scrollTop <= top && vector < 0) ||
          ele.scrollTop + ele.clientHeight + 1 >= ele.scrollHeight
        ) {
          ele.scrollTop = top + 1;
          clearInterval(state.leftScrollTimer);
          state.leftScrollTimer = null;
        }
      }, 100 / 10)
    }
    const add_mask_food = (data: any) => {
      add_shopping_car(data.type_accumulation, data.type_name, data.name, data.one_food_id, data.unit_price)
    }
    let add_food = (n: any, x: any, e: any): void => {
      add_shopping_car(n.type_accumulation, n.name, x.name, x.one_food_id, x.unit_price)
      shopping_car.value.ball_fly(e);
    }
    let add_shopping_car = (type: string, typename: string, foodname: string, foodid: number, foodprice: number): void => {
      if (!state.shoppingCarList[foodid]) {
        state.shoppingCarList[foodid] = {
          type_accumulation: type,
          type_name: typename,
          name: foodname,
          one_food_id: foodid,
          unit_price: foodprice,
          count: 1
        }
      } else {
        state.shoppingCarList[foodid].count++
      }
      shopComputedAll()
    }
    const reduce_food = (foodid: number): void => {
      if (state.shoppingCarList && state.shoppingCarList[foodid].count > 0) {
        state.shoppingCarList[foodid].count--;
        state.shoppingCarList[foodid].count <= 0 && delete state.shoppingCarList[foodid]
      }
      shopComputedAll();
      if (JSON.stringify(state.shoppingCarList) === "{}") {
        state.shoppingCarShow = false
      }
    }
    const shopComputedAll = (): void => {
      state.reNub = {};
      for (let u in state.shoppingCarList) {
        if (!state.reNub[state.shoppingCarList[u].type_accumulation]) {
          state.reNub[state.shoppingCarList[u].type_accumulation] = state.shoppingCarList[u].count
        } else {
          state.reNub[state.shoppingCarList[u].type_accumulation] += state.shoppingCarList[u].count
        }
      }
      let key = 0;
      for (let i in state.reNub) {
        key += state.reNub[i]
      }
      state.allNub = key;
      dispatch("setAllNums", key);
      let allPrice = 0;
      for (let x in state.shoppingCarList) {
        allPrice += state.shoppingCarList[x].count * state.shoppingCarList[x].unit_price
      }
      state.allPrice = allPrice;
      dispatch("setAllTotalPrice", allPrice)
    }
    const shoppingCarShowIn = (): void => {
      if (state.allNub) {
        state.shoppingCarShow = !state.shoppingCarShow
      }
    }
    const goPayStatus = (): void => {
      if (!state.allNub) {
        state.alertMaskShow = !state.alertMaskShow;
      }
    }
    const cancelInPay = (): void => {
      state.alertMaskShow = false;
    }
    const cleanShopCar = (): void => {
      state.shoppingCarList = {};
      shopComputedAll();
      state.shoppingCarShow = false;
    }
    return {
      ...toRefs(state),
      businessLeft,
      leftLi,
      ullist,
      rightLi,
      typeTitle,
      init,
      rightControlLeftClass,
      setLleftNode,
      setRightNode,
      leftControlRightScroll,
      scrollMove,
      add_food,
      add_shopping_car,
      reduce_food,
      shopComputedAll,
      shoppingCarShowIn,
      goPayStatus,
      cancelInPay,
      cleanShopCar,
      shopping_car,
      add_mask_food
    }
  }
})
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.business_content {
  padding-bottom: 1.2rem;
  box-sizing: border-box;
  position: relative;
  ul {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    height: 100%;
    &.business_left {
      width: 2.5rem;
      float: left;
      li {
        padding: 0.45rem 0.3rem;
        font-size: 0.4rem;
        position: relative;
        border-bottom: 1px solid #ccc;
        position: relative;
        .left_red {
          background: #ff461d;
          color: #fff;
          position: absolute;
          right: 0.08rem;
          top: 0.08rem;
          font-size: 0.3rem;
          min-width: 0.4rem;
          text-align: center;
          border-radius: 0.2rem;
          padding: 0.02rem 0.05rem;
        }
      }
      li.active_ia {
        background: #fff;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0.1rem;
          height: 100%;
          background: #3190e8;
        }
      }
    }
    &.business_right {
      margin-left: 2.5rem;
      background: #fff;
      li {
        .type_title {
          padding: 0.2rem;
          box-sizing: border-box;
          width: 100%;
          background: #f1f1f1;
          line-height: 0.6rem;
          strong {
            font-size: 0.45rem;
            color: #666;
          }
          span {
            font-size: 0.3rem;
            color: #999;
          }
        }
        .single_commodity {
          background: #fff;
          padding: 0.3rem;
          border-bottom: 1px solid #ccc;
          .single_l {
            width: 1.5rem;
            height: 1.5rem;
            img {
              width: 100%;
            }
            float: left;
          }
          .single_r {
            margin-left: 1.7rem;
            h4 {
              font-size: 0.5rem;
            }
            p {
              font-size: 0.3rem;
              color: #999;
              text-align: justify;
            }
            .xiaolq {
              font-size: 0.4rem;
              color: #666;
            }
            .add_remove {
              margin-top: 0.2rem;
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.4rem;
              span {
                font-size: 0.45rem;
                font-weight: 600;
                color: #f60;
                vertical-align: middle;
              }
              .add_remove_btn {
                float: right;
                z-index: 12121212;
                .commodity_count {
                  color: #666;
                  margin: 0 0.15rem;
                }
                svg {
                  fill: #3190e8;
                  width: 0.5rem;
                  height: 0.5rem;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>