import { computed, defineComponent, nextTick, onMounted, reactive, ref, } from 'vue';
import { useStoreHooks } from '@/hooks';
import imgSrc from "../assets/images/slider-pic/slider-pic1.jpeg"
import "@/assets/sass/businessContent.scss"
import BScroll from '@better-scroll/core';
import ShoppingCar from "@/components/ShoppingCar"
import ShoppingCarList from "@/components/ShoppingCarList"
import test from "@/components/test"
interface dataObj {
  type_accumulation: string,
  type_name: string,
  name: string,
  one_food_id: number,
  unit_price: number
}
export default defineComponent({
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
  components: { ShoppingCar, test, ShoppingCarList },
  setup (props) {
    const businessLeft: any = ref<null | HTMLElement>(null);
    const ullist: any = ref<null | HTMLElement>(null);
    const { dispatch } = useStoreHooks();
    const state: any = reactive({
      leftNode: [],
      rightNode: [],
      rightNodeLi: [],
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
      alertMaskShow: false,
      rightBscroll: "",
      leftBscroll: "",
      scrollY: 0,
      heightList: [],
      ballFlyFun: () => ({})
      // currentIndex: 0
    })
    const leftLiEl = () => {
      const commodity = props.commodity.commodity;
      return commodity.map((item: { name: string; type_accumulation: string; }, index: number) => {
        return <li key={index} ref={setLleftNode} class={{ active_ia: index == currentIndex.value }} onClick={() => { selectLeft(index) }}>{item.name}{leftFloatEl(item.type_accumulation)}</li>
      })
    }
    const currentIndex = computed(() => {
      const indexFind = state.heightList.findIndex((_item: any, index: number) => {
        leftScrollContent(index);
        return state.scrollY >= state.heightList[index] && state.scrollY < state.heightList[index + 1]
      })
      return indexFind > 0 ? indexFind : 0
    })
    const leftFloatEl = (text: string) => {
      if (state.reNub[text]) {
        return <span class="left_red">{state.reNub[text]}</span>
      } else {
        return <span></span>
      }
    }
    const setLleftNode = (el: any) => {
      state.leftNode.push(el)
    }
    const setRightNode = (el: any) => {
      state.rightNode.push(el)
    }
    // 右侧 Li 的节点集合
    const setRightNodeLi = (el: any) => {
      state.rightNodeLi.push(el)
    }

    const rightLiEl = () => {
      const commodity = props.commodity.commodity;
      return commodity.map((n: { name: string; description: string; foods: any[]; }, index: number) => {
        return <li ref={setRightNodeLi} key={index}>
          <header class="type_title ell" ref={setRightNode} >
            <strong class="ell">{n.name}</strong>
            <span>{n.description}</span>
          </header>
          {rightDivEl(n, n.foods)}
        </li>
      })
    }
    const rightDivEl = (n: { name: string; description: string; foods: any[]; }, data: { name: string; tips: string; month_sales: string; satisfy_rate: number; unit_price: number; one_food_id: number; }[]) => {
      return data.map((x, idx) => {
        return <div class="single_commodity" key={idx} >
          <div class="single_l">
            <img src={imgSrc} />
          </div>
          <div class="single_r">
            <h4>{x.name}</h4>
            <p>{x.tips}</p>
            <p class="xiaolq">
              月售{x.month_sales}份，好评率{x.satisfy_rate}%
                </p>
            <div class="add_remove">
              <span>￥{x.unit_price}</span>
              <div class="add_remove_btn">
                {reduceAddEl(n, x, x.one_food_id)}
                {countCheck(x.one_food_id)}
                <svg onClick={(e) => { add_food(n, x, e) }} >
                  <use xlinkHref="#cart-minus" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      })
    }
    const reduceAddEl = (n: { name: string; description: string; foods: any[]; }, x: { name?: string; tips?: string; month_sales?: string; satisfy_rate?: number; unit_price?: number; one_food_id: number; }, one_food_id: number) => {
      if (state.shoppingCarList[one_food_id]) {
        return <svg onClick={() => { reduce_food(x.one_food_id) }}>
          <use xlinkHref="#cart-add" />
        </svg>
      } else {
        return <span></span>
      }
    }
    const countCheck = (one_food_id: string | number) => {
      if (state.shoppingCarList[one_food_id]) {
        return <span class="commodity_count" >{state.shoppingCarList[one_food_id].count}</span>
      } else {
        return <span></span>
      }
    }
    const mask = () => {
      if (state.shoppingCarShow || state.alertMaskShow) {
        return <div class="mask" onClick={hide}></div>
      }
    }
    const hide = () => {
      state.shoppingCarShow = false;
      state.alertMaskShow = false;
    }
    onMounted(() => {
      state.sendConst = props.commodity.send_cost;
      nextTick(() => {
        _initScroll();
        getHeight();
      })
    })
    const getHeight = (): void => {
      const lis = state.rightNodeLi;
      let height = 0;
      state.heightList.push(height);
      lis.forEach((item: any) => {
        height += item.clientHeight;
        state.heightList.push(height)
      });
    }
    const _initScroll = () => {
      state.leftBscroll = new BScroll(businessLeft.value, { click: true });
      state.rightBscroll = new BScroll(ullist.value, {
        probeType: 3,
        click: true
      })
      state.rightBscroll.on("scroll", (pos: { y: number; }) => {
        state.scrollY = Math.abs(pos.y);
      })
      state.rightBscroll.on("scrollEnd", (pos: { y: number; }) => {
        state.scrollY = Math.abs(pos.y);
      })
    }
    const leftScrollContent = (index: number) => {
      const lIetm = state.leftNode;
      const el = lIetm[index];
      state.leftBscroll.scrollToElement(el, 1000)
    }
    const selectLeft = (index: number) => {
      state.scrollY = state.heightList[index];
      const rItem = state.rightNodeLi;
      const el = rItem[index];
      leftScrollContent(index);
      state.rightBscroll.scrollToElement(el, 1000)
    }
    const add_food = (n: { name: any; description?: string; foods?: any[]; type_accumulation?: any; }, x: { name: any; tips?: string; month_sales?: string; satisfy_rate?: number; unit_price: any; one_food_id: any; }, e: MouseEvent) => {
      add_shopping_car(n.type_accumulation, n.name, x.name, x.one_food_id, x.unit_price);
      state.ballFlyFun(e)
    }
    const add_shopping_car = (type: string, typename: string, foodname: string, foodid: number, foodprice: number) => {
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
      shopComputedAll();
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
      for (const u in state.shoppingCarList) {
        if (!state.reNub[state.shoppingCarList[u].type_accumulation]) {
          state.reNub[state.shoppingCarList[u].type_accumulation] = state.shoppingCarList[u].count
        } else {
          state.reNub[state.shoppingCarList[u].type_accumulation] += state.shoppingCarList[u].count
        }
      }
      let key = 0;
      for (const i in state.reNub) {
        key += state.reNub[i]
      }
      state.allNub = key;
      dispatch("setAllNums", key);
      let allPrice = 0;
      for (const x in state.shoppingCarList) {
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
      if (state.allNub) {
        state.alertMaskShow = !state.alertMaskShow;
      }
    }
    const ballFly = (func: any) => {
      state.ballFlyFun = func
    }
    const cleanShopCar = (): void => {
      state.shoppingCarList = {};
      shopComputedAll();
      state.shoppingCarShow = false;
    }
    const add_mask_food = ({ type_accumulation, type_name, name, one_food_id, unit_price }: dataObj) => {
      add_shopping_car(type_accumulation, type_name, name, one_food_id, unit_price)
    }
    return () => (
      <>
        <section>
          <div class="business_content" style={{ height: props.height + 'px' }}>
            <div ref={businessLeft} class="business_div-left same_business">
              <ul class="business_left">{leftLiEl()}</ul>
            </div>
            <div ref={ullist} class="business_div-right same_business">
              <ul class="business_right">{rightLiEl()}</ul>
            </div>
          </div>
          <shopping-car change-show-type={props.contentShow} send-const={state.sendConst} onShow={shoppingCarShowIn} onGoPay={goPayStatus} onBallFly={ballFly}></shopping-car>
          <shopping-car-list car-list={state.shoppingCarList} shopping-car-show={state.shoppingCarShow} onClearShopping={cleanShopCar} onReduceCarFood={reduce_food} onAddCarFood={add_mask_food}></shopping-car-list>
          {mask()}
        </section>
      </>
    )
  }
})