import { defineComponent, onMounted,computed } from 'vue';
import "../assets/sass/order.scss"
import { useStoreHooks } from '@/hooks';
import fixNav from "@/components/FixNav.vue"
import orderImg from "../assets/images/shop-logo.png"
export default defineComponent({
  name:"Order",
  components:{fixNav},
  setup(){
    const {getters,dispatch} = useStoreHooks();
    const _getFalseOrder = computed(()=>getters["getFalseOrder"]);
    onMounted(()=>{
      dispatch("setWhichpage","order")
    })
    const htmlEl  = ():any=>{
      return _getFalseOrder.value.map((item: { store_name: string; order_state: string; order_birth_time: Date; order_brief_info: string; order_price: number; })=>{
        return <div class="order_one">
          <div class="order_img">
            <img src={orderImg} alt=""/>
            </div>
          <div class="order_info">
            <header class="order_info_t">
              <div class="order_title flex_align">
                <p class="b_name">{item.store_name}</p>
                <p class="b_status">{item.order_state}</p>
                </div>
                <p class="order_time">{item.order_birth_time}</p>
              </header>
              <footer class="order_info_b flex_align">
                <p class="order_brief_info">{item.order_brief_info}</p>
                <p class="order_price">￥{item.order_price}</p>
              </footer>
              <div style="display:none;"></div>
          </div>
        </div>
      })
    }
    return() =>(
      <>
      <div class='order_wrap'>
        <div class="order_box">
        {htmlEl()} 
        </div>
      </div>
      <fix-nav></fix-nav>
      </>
    )
  }
})