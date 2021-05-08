import { defineComponent, } from 'vue';
import { useRouter } from "vue-router"
import "@/assets/sass/oneBusiness.scss"
import pic1 from "../assets/images/slider-pic/slider-pic1.jpeg"
export default defineComponent({
  name: 'OneBusiness',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup: (props: any) => {
    const router = useRouter();
    const goShopDetail = (path: string) => {
      router.push(`/business${path}`)
    }
    const shopName = () => {
      if (props.item.brand) {
        return <span>品牌</span>
      } else {
        return <span></span>
      }
    }
    const bzp = () => {
      if (props.item.bao) {
        return <i>保</i>
      } else {
        return <i></i>
      }
    }
    const piao = () => {
      if (props.item.piao) {
        return <i>票</i>
      } else {
        return <i></i>
      }
    }
    const zhun = () => {
      if (props.item.zhun) {
        return <i>准</i>
      } else {
        return <i></i>
      }
    }

    const onTime = () => {
      if (props.item.on_time) {
        return <div class="zsd" >准时达</div>
      } else {
        return <div></div>
      }
    }
    const fengniao = () => {
      if (props.item.fengniao) {
        return <div class="fnzs">蜂鸟专送</div>
      } else {
        return <div></div>
      }
    }
    return () => (
      <>
        <div class='tj_business' onClick={() => { goShopDetail(props.item.path) }}>
          <div class="one_business clear">
            <div class="business_img">
              <img src={pic1} alt="" />
            </div>
            <div class="business_info">
              <div class="business_name clear">
                <h3 class="fl ell">{shopName()}{props.item.shop_name}</h3>
                <div class="name_icon fr">
                  <div class="bzp">{bzp()}</div>
                  <div class="bzp">{piao()}</div>
                  <div class="bzp">{zhun()}</div>
                </div>
              </div>
              <div class="business_code clear">
                <div class="code_num fl">
                  <svg class="v-md">
                    <use xlinkHref="#rating-star"></use>
                  </svg>
                  <span class="v-md">{props.item.shop_rating}</span>
                </div>
                <div class="code_icon fr">
                  {onTime()}{fengniao()}
                </div>
              </div>
              <div class="business_other clear">
                <div class="other_price fl">
                  <span class="com_gray1">￥{props.item.start_send}起送</span>
                  <span>/</span>
                  <span class="com_gray1">配送费约￥{props.item.send_cost}</span>
                </div>
                <div class="other_dis fr">
                  <span class="com_gray2">{props.item.distance}m</span>
                  <span>/</span>
                  <span class="com_blue">{props.item.estimate_time}分钟</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
})