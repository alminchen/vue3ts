import { defineComponent, } from 'vue';
import YellowStar from "@/components/YellowStar";
import "@/assets/sass/businessRating.scss";
import img from "../assets/images/slider-pic/slider-pic2.jpeg"
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
  setup: (props: any) => {
    const diffEl = () => {
      if (props.commodity.high_or_low) {
        return <span>高</span>
      } else {
        return <span>低</span>
      }
    }
    const evaluate = () => {
      const data = props.commodity.evaluate;
      return data.map((item: { username: string; time: Date; evaluate_code: number | undefined; send_time: Date; evaluate_details: string; }) => {
        return <div class="evaluate" >
          <div class="user_img">
            <img src={img} />
          </div>
          <div class="evaluate_con">
            <div class="evaluate_con_t flex_align">
              <p class="user_name">{item.username}</p>
              <p class="user_time">{item.time}</p>
            </div>
            <div class="evaluate_star">
              <YellowStar code={item.evaluate_code}></YellowStar>
              <span class="v-md">{item.send_time}分钟送达</span>
            </div>
            <p class="evaluate_con_b">{item.evaluate_details}</p>
          </div>
        </div >
      })
    }
    return () => (
      <>
        <div class='business_rating' style={{ height: props.height + 'px' }}>
          <div class="total_evaluate clear">
            <div class="total_code">
              <h3>{props.commodity.shop_rating}</h3>
              <p class="p1">综合评价</p>
              <p class="p2">{diffEl()}于周边商家{props.commodity.h_l_percent}%</p>
            </div>
            <div class="detail_code">
              <p>
                <span class="small_tit v-md">服务态度</span>
                <div class="small-flex">
                  <YellowStar code={props.commodity.shop_rating}></YellowStar>
                  <span class="orange_code  v-md">{props.commodity.service_code}</span>
                </div>

              </p>
              <p>
                <span class="small_tit v-md">菜品评价</span>
                <div class="small-flex">
                  <YellowStar code={props.commodity.shop_rating}></YellowStar>
                  <span class="orange_code  v-md">{props.commodity.foods_code}</span>
                </div>
              </p>
              <p><span class="small_tit">送达时间</span><span style="margin-left:.1rem;">{props.commodity.estimate_time}分钟</span></p>
            </div>
          </div>
          {evaluate()}
        </div>
      </>
    )
  }
})