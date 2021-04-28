import { computed, defineComponent, reactive, } from 'vue';
import { useStoreHooks } from '@/hooks';
import { useRoute } from "vue-router"
import "@/assets/sass/business.scss"
import topImg from "../assets/images/shop-logo.png"
import test from "@/components/test"
import BusinessContent from "@/components/BusinessContent";
import BusinessRating from "@/components/BusinessRating"
export default defineComponent({
  name: "Business",
  components: { test, BusinessContent, BusinessRating },
  setup () {
    const { getters } = useStoreHooks();
    const route = useRoute();
    const state = reactive({
      id!: route?.params?.id.toString(),
      changeShowType: "food",
      computedContentHeight!: Math.ceil(window.innerHeight - (window.innerWidth / 10) * 4.2),
      addFun: () => ({})
    })
    const getFalseBussinessInfo = computed(() => getters['getFalseBussinessInfo'])
    const commodity = computed(() => {
      return getFalseBussinessInfo?.value[state?.id]
    })
    const fengniao = () => {
      if (commodity.value.fengniao) {
        return <span >蜂鸟配送</span>
      } else {
        return <span>商家配送</span>
      }
    }
    const changeEl = () => {
      if (state.changeShowType == 'food') {
        return <business-content height={state.computedContentHeight} commodity={commodity.value}></business-content>
      } else {
        return <business-rating height={state.computedContentHeight} commodity={commodity.value}></business-rating>
      }
    }
    return () => (
      <>
        <div class="business_box">
          <div class="business_top">
            <div class="blur_bg"></div>
            <div class="font_words">
              <div class="fw_top">
                <div class="fw_top_img">
                  <img src={topImg} alt="" />
                </div>
                <div class="fw_top_word clear">
                  <h3 class="ell">{commodity.value.shop_name}</h3>
                  <p class="ell">{fengniao()}/{commodity.value.estimate_time}分钟送达／配送费¥{commodity.value.send_cost}</p>
                  <p class="ell">公告：{commodity.value.notice}</p>
                </div>
                <p class="shop_activity ell">
                  <i class="new_user">减</i><span>{commodity.value.discount}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="change_show_type">
            <div>
              <span class={{ activity_show: state.changeShowType == 'food' }} onClick={() => { state.changeShowType = 'food' }}>商品</span>
            </div>
            <div>
              <span class={{ activity_show: state.changeShowType == 'rating' }} onClick={() => { state.changeShowType = 'rating' }}>评价</span>
            </div>
          </div>
          {changeEl()}
        </div>
      </>
    )
  }
})