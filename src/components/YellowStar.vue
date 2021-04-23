/**
* @module YellowStar
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-23 15:40:50
*/

<template>
  <div class='YellowStar_wrap'>
    <div class='yellow_star v-md'>
      <div class="back v-md">
        <svg v-for="n in 5" :key="n">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating-star"></use>
        </svg>
      </div>
      <div class="front v-md" :style="'width:'+code*100/5+'%;'">
        <svg v-for="n in 5" :key="n">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating-star"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, } from 'vue';
export default defineComponent({
  name: 'YellowStar',
  props: {
    code: {
      type: Number,
      default: () => 0
    }
  },
  setup: () => {
    return {}
  }
})
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.yellow_star {
  display: inline-block;
  position: relative;
  width: 1.5rem;
  height: 0.3rem;
  > div {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
    &.back {
      z-index: 2;
      svg {
        width: 0.3rem;
        height: 0.3rem;
        fill: #ccc;
      }
    }
    &.front {
      z-index: 3;
      svg {
        width: 0.3rem;
        height: 0.3rem;
        fill: #ffaa0c;
      }
    }
  }
}
</style>