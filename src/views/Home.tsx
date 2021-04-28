import { defineComponent, onMounted, reactive, computed, onUnmounted, nextTick } from 'vue';
import FixNav from "@/components/FixNav"
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from "swiper";
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.scss";
import { useStoreHooks } from '@/hooks';
import OneBusiness from '@/components/OneBusiness';
import "@/assets/sass/home.scss";
import { RouterLink } from 'vue-router';
import pic1 from "../assets/images/slider-pic/slider-pic1.jpeg"
import pic2 from "../assets/images/slider-pic/slider-pic2.jpeg"
import pic3 from "../assets/images/slider-pic/slider-pic3.jpeg"
import pic4 from "../assets/images/slider-pic/slider-pic4.jpeg"
import pic5 from "../assets/images/slider-pic/slider-pic5.jpeg"
import pic6 from "../assets/images/slider-pic/slider-pic6.jpeg"
import pic7 from "../assets/images/slider-pic/slider-pic7.jpeg"
import pic8 from "../assets/images/slider-pic/slider-pic8.jpeg"
import pic9 from "../assets/images/slider-pic/slider-pic9.jpeg"
import pic10 from "../assets/images/slider-pic/slider-pic10.jpeg"
import pic11 from "../assets/images/slider-pic/slider-pic11.jpeg"
import pic12 from "../assets/images/slider-pic/slider-pic12.jpeg"
import pic13 from "../assets/images/slider-pic/slider-pic13.jpeg"
import pic14 from "../assets/images/slider-pic/slider-pic14.jpeg"
import pic15 from "../assets/images/slider-pic/slider-pic15.jpeg"
import pic16 from "../assets/images/slider-pic/slider-pic16.jpeg"
export default defineComponent({
  name: "Home",
  components: {
    FixNav, OneBusiness
  },
  setup () {
    const { getters, dispatch } = useStoreHooks();
    const state = reactive({
      isLoadingMore: false,
      search_word: ""
    })
    const getLogin = computed(() => getters['getLogin'])
    const routerLosk = () => {
      if (!getLogin.value) {
        return <RouterLink to="" >登录</RouterLink>
      } else {
        return <span></span>
      }
    }
    const getFalseHotWord = computed(() => getters['getFalseHotWord'])
    const hotKey = () => {
      if (getFalseHotWord.value.length) {
        return getFalseHotWord.value.map((item: { title: string; }) => {
          return <span >{item.title}</span>
        })
      } else {
        return <span></span>
      }
    }
    const getFalseBussinessbrief = computed(() => getters['getFalseBussinessbrief']);
    onMounted(() => {
      dispatch("setLogin", true)
      dispatch("setWhichpage", "homepage")
      nextTick(() => {
        new Swiper("#swiper1", {
          // pagination: {
          //   el: ".swiper-pagination",
          // },
          autoplay: {
            delay: 3000000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
        });
      })
      setTimeout(() => {
        window.addEventListener("scroll", dispatchLoad, false)
      }, 0);
    })
    onUnmounted(() => {
      window.removeEventListener("scroll", dispatchLoad, false);
    })
    const loadMore = (): void => {
      if (getFalseBussinessbrief.value.length > 15) return;
      dispatch("setLoading", true);
      if (state.isLoadingMore) return;
      state.isLoadingMore = true;
      setTimeout(() => {
        dispatch("setHomepageMore", [
          ...getFalseBussinessbrief.value,
          ...getFalseBussinessbrief.value.splice(0, 5)
        ])
        state.isLoadingMore = false;
      }, 1000);
    }
    const businessEl = () => {
      return getFalseBussinessbrief.value.map((item: any) => {
        return <OneBusiness item={item}></OneBusiness>
      })
    }
    const dispatchLoad = (): void => {
      const dscrollTop: number =
        document.body.scrollTop || document.documentElement.scrollTop;
      const offsetHei: number = document.documentElement.offsetHeight;
      const winHei = window.innerHeight;
      if (offsetHei <= dscrollTop + winHei + 1) loadMore();
    }
    return () => (
      <>
        <div class='index_main'>
          <fix-nav></fix-nav>
          <div class="index_header">
            <div class="index_location">
              <div class="location_left ell">
                <svg class="v-md">
                  <use xlinkHref="#location"></use>
                </svg>
                <span class="v-md">深圳市福田区这里是个假定位村淡定啦~这不重要</span>
              </div>
              <div class="index_login">
                {routerLosk()}
              </div>
            </div>
            <div class="search_box">
              <input type="text" v-model={state.search_word} placeholder="搜索商家、商品" />
            </div>
            <div class="hot_word">
              {hotKey()}
            </div>
          </div>
          <div class="index_banner">
            <div class="swiper-container swiper1" id="swiper1">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <RouterLink to="/search/美食">
                    <div class="common_slider">
                      <img src={pic1} alt="" />
                      <p>美食</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/甜品饮品">
                    <div class="common_slider">
                      <img src={pic2} alt="" />
                      <p>甜品饮品</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/商店超市">
                    <div class="common_slider">
                      <img src={pic3} alt="" />
                      <p>商店超市</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/预定早餐">
                    <div class="common_slider">
                      <img src={pic4} />
                      <p>预定早餐</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/果蔬生鲜">
                    <div class="common_slider">
                      <img src={pic5} />
                      <p>果蔬生鲜</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/新店特惠">
                    <div class="common_slider">
                      <img src={pic6} />
                      <p>新店特惠</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/准时达">
                    <div class="common_slider">
                      <img src={pic7} />
                      <p>准时达</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/夜宵">
                    <div class="common_slider">
                      <img src={pic8} />
                      <p>夜宵</p>
                    </div>
                  </RouterLink>
                </div>
                <div class="swiper-slide">
                  <RouterLink to="/search/土豪推荐">
                    <div class="common_slider">
                      <img src={pic9} alt="" />
                      <p>土豪推荐</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/鲜花蛋糕">
                    <div class="common_slider">
                      <img src={pic10} />
                      <p>鲜花蛋糕</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/汉堡">
                    <div class="common_slider">
                      <img src={pic11} />
                      <p>汉堡</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/日韩料理">
                    <div class="common_slider">
                      <img src={pic12} />
                      <p>日韩料理</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/麻辣烫">
                    <div class="common_slider">
                      <img src={pic13} />
                      <p>麻辣烫</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/披萨意面">
                    <div class="common_slider">
                      <img src={pic14} />
                      <p>披萨意面</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/川湘菜">
                    <div class="common_slider">
                      <img src={pic15} />
                      <p>川湘菜</p>
                    </div>
                  </RouterLink>
                  <RouterLink to="/search/包子粥店">
                    <div class="common_slider">
                      <img src={pic16} />
                      <p>包子粥店</p>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <h3 class="index_title">推荐商家</h3>
          {businessEl()}
          <div class="space"></div>
        </div>
      </>
    )
  }
})