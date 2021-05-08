import { defineComponent, } from 'vue';
import "@/assets/sass/shoppingCarList.scss"
export default defineComponent({
  name: 'ShoppingCarList',
  props: {
    shoppingCarShow: {
      type: Boolean,
      default: () => false
    },
    carList: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['reduceCarFood', "clearShopping", "addCarFood"],
  setup: (_props: any, ctx: any) => {
    const clearShop = (): void => {
      ctx.emit("clearShopping")
    }
    const reduceFood = (foodid: number): void => {
      ctx.emit("reduceCarFood", foodid)
    }
    const addFood = (
      type_accumulation: string,
      type_name: string,
      name: string,
      one_food_id: number,
      unit_price: number): void => {
      ctx.emit("addCarFood", {
        type_accumulation: type_accumulation,
        type_name: type_name,
        name: name,
        one_food_id: one_food_id,
        unit_price: unit_price
      })
    }
    const carListEl = () => {
      if (_props.shoppingCarShow) {
        return <div class="sp_lists" >
          <header>
            <span class="sp_words">购物车</span>
            <div class="clear" onClick={clearShop}>
              <svg>
                <use xlinkHref="#cart-remove" />
              </svg>
              <span>清空</span>
            </div>
          </header>
          <ul class="sp_content">
            {liList()}
          </ul>
        </div>
      } else {
        return <span></span>
      }
    }
    const liList = () => {
      const data = Object.values(_props.carList);
      return data.map((item: any, index: number) => {
        return <li key={index}>
          <div class="food_name ell">{item.name}</div>
          <div class="food_unit_price">￥{(item.count * item.unit_price).toFixed(2)}</div>
          <div class="food_nub">
            <svg onClick={() => { reduceFood(item.one_food_id) }} >
              <use xlinkHref="#cart-add" />
            </svg>
            <span class="commodity_count">{item.count}</span>
            <svg onClick={() => { addFood(item.type_accumulation, item.type_name, item.name, item.one_food_id, item.unit_price) }}>
              <use xlinkHref="#cart-minus" />
            </svg>
          </div>
        </li>
      })
    }

    return () => (
      <>
        {carListEl()}
      </>
    )
  }
})