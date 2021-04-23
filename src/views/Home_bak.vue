<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <div class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          1
        </div>
        <div class="swiper-slide">
          2
        </div>
        <div class="swiper-slide">
          3
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination"></div> -->

      <!-- <div class="swiper-button-prev"></div> -->
      <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <!-- <div class="swiper-button-next"></div> -->
      <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Swiper, {
  Autoplay,
  EffectCoverflow,
  EffectCube,
  Pagination,
  Navigation,
} from "swiper";
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);
import "swiper/swiper-bundle.min.css";
// swiper.less/sass/css 决定了基础的样式
import "swiper/swiper.scss";
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    new Swiper(".swiper1", {
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        hideOnClick: true,
      },
      autoplay: {
        delay: 3000000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      on: {
        navigationShow: function () {
          console.log("按钮显示了");
        },
      },
    });
  }
}
</script>
<style scoped>
.swiper-slide {
  height: 200px;
}
</style>
