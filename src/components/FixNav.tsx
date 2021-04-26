import { defineComponent, computed } from "vue"
import "../assets/sass/fixnav.scss";
import { useStoreHooks } from '../hooks';
import { RouterLink } from 'vue-router';
export default defineComponent({
  setup () {
    const { getters } = useStoreHooks();
    const returnPageNow = computed(() => getters['getwhichpage'])
    const htmlElHome = () => {
      if (returnPageNow.value == 'homepage') {
        return <span class="one_fixed_nav">
          <svg >
            <use xlinkHref="#index.18edf5a"></use>
          </svg>
          <span>外卖</span>
        </span>
      } else {
        return <span class="one_fixed_nav">
          <svg >
            <use xlinkHref="#index-regular.b245d60"></use>
          </svg>
          <span>外卖</span>
        </span>
      }
    }
    const htmlElOrder = () => {
      if (returnPageNow.value == 'order') {
        return <span class="one_fixed_nav">
          <svg>
            <use xlinkHref="#order.070ae2a"></use>
          </svg>
          <span>订单</span>
        </span >
      } else {
        return <span class="one_fixed_nav" >
          <svg >
            <use xlinkHref="#order-regular.41c17f8"></use>
          </svg>
          <span>订单</span>
        </span>
      }
    }
    const htmlElMyzone = () => {
      if (returnPageNow.value == 'myzone') {
        return <span class="one_fixed_nav">
          <svg>
            <use xlinkHref="#profile.dbc5ebf"></use>
          </svg>
          <span>我的</span>
        </span>
      } else {
        return <span class="one_fixed_nav">
          <svg>
            <use xlinkHref="#profile-regular.c151d62"></use>
          </svg>
          <span>我的</span>
        </span>
      }
    }
    return () => (
      <>
        <div class='fixed_nav'>
          <RouterLink to="/">{htmlElHome()}</RouterLink>
          <RouterLink to="/myzone">{htmlElOrder()}</RouterLink>
          <RouterLink to="/myzone">{htmlElMyzone()}</RouterLink>
        </div>
      </>
    )
  }
})