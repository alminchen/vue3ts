import { defineComponent, } from 'vue';
import "../assets/sass/yellowstar.scss"
export default defineComponent({
  name: "YellowStar",
  props: {
    code: {
      type: Number,
      default: () => 0
    }
  },
  setup (props: any) {
    const htmlEl = () => {
      return new Array(5).fill("").map((_item: any, index: number) => {
        return <svg key={index}>
          <use xlinkHref="#rating-star"></use>
        </svg>
      })
    }
    return () => (
      <>
        <div class='YellowStar_wrap'>
          <div class='yellow_star v-md'>
            <div class="back v-md">{htmlEl()}</div>
            <div class="front v-md" style={{ width: props.code * 100 / 5 + "%" }}>{htmlEl()}</div>
          </div>
        </div>
      </>
    )
  }
})