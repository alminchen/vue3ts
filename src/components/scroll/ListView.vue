/**
* @module ListView
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-24 14:41:20
*/

<template>
  <scroll @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" :data="data" class="listview" ref="listview">
    <ul>
      <li v-for="(group,index) in data" class="list-group" :key="index" :ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="(item, index) in group.items" class="list-group-item" :key="index">
            <img class="avatar" v-lazy="item.avatar" @error="errorImage" />
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex === index}" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </scroll>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref, watch, nextTick } from 'vue';
import scroll from './scroll.vue';
import { getData } from "@/common/dom"
const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;
export default defineComponent({
  components: { scroll },
  name: 'ListView',
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup: (props: any, ctx: any) => {
    const state: any = reactive({
      probeType: 3,
      listenScroll: true,
      listData: [],
      touch: {
        y1: 0,
        anchorIndex: "",
        y2: 0
      },
      listHeight: [],
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
      listGroupNode: [],
      fixedTop: 0
    })
    const listview: any = ref(null);
    const fixed: any = ref(null)
    const listGroup = (el: HTMLElement) => {
      state.listGroupNode.push(el);
    }
    const errorImage = (e: any) => {
      e.target.src = 'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1603764281&t=bedd2d52d62e141cbb08c462183601c7'
    }
    const shortcutList = computed(() => {
      return props.data.map((group: { title: string }) => {
        return group.title.substr(0, 1)
      })
    })
    const refresh = () => {
      listview.value.refresh()
    }
    const fixedTitle = computed(() => {
      if (state.scrollY > 0) return "";
      return props.data[state.currentIndex] ? props.data[state.currentIndex].title : ""
    })
    const selectItem = (item: any): void => {
      ctx.emit("select", item)
    }
    const onShortcutTouchStart = (e: { target: any; touches: any[]; }): void => {
      let anchorIndex = getData(e.target, "index");
      let firstTouch: any = e.touches[0];
      state.touch.y1 = firstTouch.pageY;
      state.touch.anchorIndex = anchorIndex;
      _scrollTo(anchorIndex)
    }
    const onShortcutTouchMove = (e: { touches: any[]; }): void => {
      let firstTouch = e.touches[0];
      state.touch.y2 = firstTouch.pageY;
      let delta = ((state.touch.y2 - state.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(state.touch.anchorIndex + delta);
      _scrollTo(anchorIndex)
    }
    const _scrollTo = (index: number): void => {
      if (!index && index !== 0) return;
      if (index < 0) index = 0;
      if (index > state.listHeight.length - 2) index = state.listHeight.length - 2;
      state.scrollY = -state.listHeight[index];
      listview.value.scrollToElement(state.listGroupNode[index], 0)
    }
    const scroll = (pos: { y: number; }) => {
      state.scrollY = pos.y
    }
    const _calculateHeight = () => {
      state.listHeight = [];
      const list = state.listGroupNode;
      let height = 0;
      state.listHeight.push(height);
      list.forEach((item: { clientHeight: number; }) => {
        height += item.clientHeight;
        state.listHeight.push(height);
      })
    }
    watch(() => props.data, () => {
      nextTick(() => {
        _calculateHeight()
      })
    })
    watch(() => state.scrollY, (newY: number) => {
      const listHeight = state.listHeight;
      if (newY > 0) {
        state.currentIndex = 0;
        return;
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let hei1 = listHeight[i];
        let hei2 = listHeight[i + 1];
        if (-newY >= hei1 && -newY < hei2) {
          state.currentIndex = i;
          state.diff = hei2 + newY;
          return;
        }
      }
      state.currentIndex = listHeight.length - 2;
    })
    watch(() => state.diff, (newVal: number) => {
      let fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (state.fixedTop === fixedTop) return;
      state.fixedTop = fixedTop;
      fixed.value.style.transform = `translate3d(0,${fixedTop}px,0)`;
    })
    return {
      ...toRefs(state),
      listview,
      shortcutList,
      fixedTitle,
      selectItem,
      onShortcutTouchStart,
      onShortcutTouchMove,
      _scrollTo,
      listGroup,
      refresh,
      scroll,
      _calculateHeight,
      fixed,
      errorImage
    }
  }
})
</script>
<style lang="scss" scoped>
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #333;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30000;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;

      &.current {
        color: #ffcd32;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #333;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>