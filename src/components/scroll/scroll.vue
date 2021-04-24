/**
* @module scroll
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-24 10:08:46
*/

<template>
  <div class='scroll_wrap' ref="scrollWrap">
    <slot />
  </div>
</template>
<script lang="ts" type="text/ecmascript-6">
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue';
import BScroll from "better-scroll"
export default defineComponent({
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  setup: (ctx: any, context: any) => {
    const scrollWrap: any = ref(null);
    const state: any = reactive({
      scroll: ''
    })
    onMounted(() => {
      nextTick(() => {
        _initScroll();
      })
    })
    const _initScroll = (): void => {
      if (!scrollWrap.value) return;
      state.scroll = new BScroll(scrollWrap.value, {
        probeType: ctx.probeType,
        click: ctx.click
      })
      if (ctx.listenScroll) {
        state.scroll.on("scroll", (pos: any) => {
          context.emit("scroll", pos)
        })
      }
      if (ctx.pullup) {
        state.scroll.on("scrollEnd", (pos: any) => {
          context.emit("scrollEnd", pos)
        })
      }
    }
    const disable = (): void => {
      state.scroll && state.scroll.disable();
    }
    const enable = (): void => {
      state.scroll && state.scroll.enable();
    }
    const refresh = (): void => {
      state.scroll && state.scroll.refresh()
    }
    const scrollToElement = (el: any, time: any): void => {
      state.scroll && state.scroll.scrollToElement(el, time)
    }
    watch(() => ctx.data, () => {
      setTimeout(() => {
        refresh()
        _initScroll()
      }, ctx.refreshDelay);
    })
    return {
      ...toRefs(state),
      scrollWrap,
      _initScroll,
      disable,
      enable,
      refresh,
      scrollToElement
    }
  }
})
</script>
<style lang="scss" scoped>
.scroll_wrap {
  height: 100%;
  overflow: hidden;
}
</style>