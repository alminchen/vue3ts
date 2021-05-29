import { defineComponent, nextTick, onMounted, reactive, ref, watch, computed } from 'vue';
import BScroll from "better-scroll"
import "@/assets/sass/listview.scss";
import { getData } from "@/common/dom"
const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;
export default defineComponent({
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: true
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
  setup: (ctx: any) => {
    const scrollWrap: any = ref<null | HTMLElement>(null);
    const fixDom: any = ref<null | HTMLElement>(null);
    const state: any = reactive({
      scroll: '',
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
        state.scroll.on("scroll", (pos: { y: number; }) => {
          state.scrollY = pos.y
        })
      }
      if (ctx.pullup) {
        state.scroll.on("scrollEnd", (pos: { y: number; }) => {
          console.log(pos.y);
        })
      }
    }
    const refresh = (): void => {
      state.scroll && state.scroll.refresh()
    }
    const scrollToElement = (el: HTMLElement, time: any): void => {
      state.scroll && state.scroll.scrollToElement(el, time)
    }
    watch(() => ctx.data, () => {
      setTimeout(() => {
        refresh()
        _initScroll()
      }, ctx.refreshDelay);
    })

    const slotEl = () => {
      const data = ctx.data;
      return data.map((group: { title: string; items: { avatar: string; name: string; }[]; }, index: number) => {
        return <li key={index} class="list-group" ref={listGroup}>
          <h2 class="list-group-title">{group.title}</h2>
          <ul>
            {childEl(group.items)}
          </ul>
        </li>
      })
    }
    const listGroup = (el: any): any => {
      state.listGroupNode.push(el);
    }
    const childEl = (data: { avatar: string; name: string; }[]) => {
      return data.map((item: { avatar: string; name: string; }, idx: number) => {
        return <li key={idx} class="list-group-item">
          <img class="avatar" v-lazy={item.avatar} onError={(e) => { errorImage(e) }} />
          <span class="name">{item.name}</span>
        </li>
      })
    }
    const shortcutList = computed(() => {
      return ctx.data.map((group: { title: string }) => {
        return group.title.substr(0, 1)
      })
    })
    const touchEl = () => {
      const data = shortcutList.value;
      return data.map((item: any, index: number) => {
        return <li key={index} data-index={index} class={["item", {
          'current': state.currentIndex === index
        }]}> {item}</li >
      })
    }
    const errorImage = (e: Event) => {
      (e.target as HTMLImageElement).src = 'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1603764281&t=bedd2d52d62e141cbb08c462183601c7'
    }

    const _calculateHeight = () => {
      state.listHeight = [];
      let height = 0;
      state.listHeight.push(height);
      const list = state.listGroupNode;
      list.forEach((item: { clientHeight: number; }) => {
        const hei = item.clientHeight || 0;
        height += hei;
        state.listHeight.push(height)
      })
    }
    watch(() => ctx.data, () => {
      nextTick(() => {
        _calculateHeight()
      })
    })
    watch(() => state.scrollY, (newY: number) => {
      const listHeight = state.listHeight;
      if (newY > 0) {
        state.currentIndex = 0; return;
      }
      for (let i = 0, len = listHeight.length - 1; i < len; i++) {
        const hei1: number = listHeight[i];
        const hei2: number = listHeight[i + 1];
        if (-newY >= hei1 && -newY < hei2) {
          state.currentIndex = i;
          state.diff = hei2 + newY;
          return;
        }
      }
      state.currentIndex = listHeight.length - 2;
    })
    const onShortcutTouchStart = (e: { target: any, touches: any }): void => {
      const anchorIndex = getData(e.target, "index");
      const firstTouch: any = e.touches[0];
      state.touch.y1 = firstTouch.pageY;
      state.touch.anchorIndex = anchorIndex;
      _scrollTo(anchorIndex)
    }
    const onShortcutTouchMove = (e: TouchEvent): void => {
      const firstTouch = e.touches[0];
      state.touch.y2 = firstTouch.pageY;
      const delta = ((state.touch.y2 - state.touch.y1) / ANCHOR_HEIGHT) || 0;
      const anchorIndex = parseInt(state.touch.anchorIndex + delta);
      _scrollTo(anchorIndex)
    }
    const _scrollTo = (index: number): void => {
      if (!index && index !== 0) return;
      if (index < 0) index = 0;
      if (index > state.listHeight.length - 2) index = state.listHeight.length - 2;
      state.scrollY = -state.listHeight[index];
      scrollToElement(state.listGroupNode[index], 0);
    }
    const fixedTitle = computed(() => {
      if (state.scrollY > 0) return "";
      return ctx.data[state.currentIndex] ? ctx.data[state.currentIndex].title : ""
    })
    const fixEl = () => {
      if (fixedTitle.value) {
        return <div class="list-fixed" ref={fixDom} >
          <div class="fixed-title">{fixedTitle.value}</div>
        </div>
      }
    }
    watch(() => state.diff, (newVal: number) => {
      const fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (state.fixedTop === fixedTop) return;
      state.fixedTop = fixedTop;
      fixDom.value.style.transform = `translate3d(0,${fixedTop}px,0)`;
    })
    return () => (
      <>
        <div class='scroll_wrap listview' ref={scrollWrap}>
          <ul>
            {slotEl()}
          </ul>
          <div class="list-shortcut" onTouchstart={(e) => { onShortcutTouchStart(e) }} onTouchmove={(e) => { onShortcutTouchMove(e) }}>
            <ul>
              {touchEl()}
            </ul>
          </div>
          {fixEl()}
        </div>
      </>
    )
  }
})