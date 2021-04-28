import "@/assets/sass/shoppingCar.scss"
import { computed, defineComponent, ref } from 'vue';
import { useStoreHooks } from '@/hooks';
export default defineComponent({
  name: 'ShoppingCar',
  props: {
    changeShowType: {
      type: String,
      default: () => 'food'
    },
    sendConst: {
      type: Number,
      default: () => 0
    },
  },
  emits: ["ballFly", "show", "goPay"],
  setup (props: any, { emit }) {
    const { getters, } = useStoreHooks();
    const carIcon: HTMLElement | any = ref(null);
    const allNums = computed(() => getters['allNums']);
    const allTotalPrice = computed(() => getters['allTotalPrice'])

    const ball_fly = (e: { target: { getBoundingClientRect: any } }): any => {
      const bound: any = e.target.getBoundingClientRect();
      const boundTop: number = bound.top;
      const boundLeft: number = bound.left;
      const target: any = carIcon.value;
      const targetData: any = target.getBoundingClientRect();
      const targetTop: number = targetData.top;
      const targetLeft: number = targetData.left;
      const father: any = document.createElement("div");
      father.className = "father flyball";
      const child: any = document.createElement("div");
      child.className = "child inner";
      father.appendChild(child);
      father.style.top = `${boundTop}px`;
      father.style.left = `${boundLeft}px`;
      document.body.appendChild(father);
      setTimeout(() => {
        const leftTrans: number = targetLeft - boundLeft + targetData.width / 2;
        const topTrans: number = targetTop - boundTop + targetData.width / 2;
        father.style.transform = `translate3d(${leftTrans}px,0,0)`;
        child.style.cssText = `transform: translate3d(0px,${topTrans}px,0)`;
        target.classList.add("tantantan");
        setTimeout(() => {
          father.parentNode.removeChild(father);
          target.classList.remove("tantantan");
        }, 500);
      }, 10);
    }
    const carEl = () => {
      if (props.changeShowType == 'food') {
        return <div class="shopping_car">
          <div class={['car_icon', { nothing: !allNums.value }]} ref={carIcon} onClick={showCarList}>
            {carNum(allNums.value)}
          </div>
          <div class="car_words">
            <h4>￥{allTotalPrice.value}</h4>
            <p>配送费:￥{props.sendConst}</p>
          </div>
          <a href="javascript:;" class={['cartview', { cantpay: allTotalPrice.value < props.sendConst }]} onClick={goToPay}> 去结算</a >
        </div >
      }
    }
    const carNum = (num: number) => {
      if (num !== 0) {
        return <span class="tips_after" >{allNums.value}</span>
      } else {
        return <span></span>
      }
    }
    const showCarList = (): any => {
      emit("show")
    }

    const goToPay = (): any => { console.log(2) }
    emit("goPay", goToPay)
    emit("ballFly", ball_fly);
    return () => (
      <>{carEl()}</>
    )
  }
})