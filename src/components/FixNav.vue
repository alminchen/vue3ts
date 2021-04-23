/**
* @module FixNav
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2019-11-19 16:24:48
*/

<template>
  <div class='fixed_nav'>
    <router-link to="/">
      <span class="one_fixed_nav">
        <svg v-if="returnPageNow == 'homepage'">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#index.18edf5a"></use>
        </svg>
        <svg v-if="returnPageNow !== 'homepage'">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#index-regular.b245d60"></use>
        </svg>
        <span>外卖</span>
      </span>
    </router-link>

    <router-link to="/order">
      <span class="one_fixed_nav">
        <svg v-if="returnPageNow == 'order'">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order.070ae2a"></use>
        </svg>
        <svg v-if="returnPageNow !== 'order'">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order-regular.41c17f8"></use>
        </svg>
        <span>订单</span>
      </span>
    </router-link>

    <router-link to="/myzone">
      <span class="one_fixed_nav">
        <svg v-if="returnPageNow == 'myzone'">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile.dbc5ebf"></use>
        </svg>
        <svg v-if="returnPageNow !== 'myzone'">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-regular.c151d62"></use>
        </svg>
        <span>我的</span>
      </span>
    </router-link>
  </div>
</template>

<script lang='ts'>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, computed } from 'vue';
import { useStoreHooks } from '../hooks';
export default defineComponent({
  setup () {
    const { getters } = useStoreHooks();
    let returnPageNow = computed(() => getters['getwhichpage'])
    return {
      returnPageNow
    }
  }

})
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.fixed_nav {
  width: 10rem;
  height: 1.2rem;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0.28rem;
  z-index: 999;
  svg {
    width: 0.45rem;
    height: 0.45rem;
    display: block;
    margin: 0.2rem auto 0.1rem;
  }
  .one_fixed_nav {
    width: 32.6%;
    display: inline-block;
    height: 1.2rem;
    text-align: center;
  }
}
</style>