import { computed, defineComponent, onMounted, reactive, watch, nextTick } from "vue"
import { useStoreHooks } from '@/hooks';
import { useRouter, useRoute } from "vue-router"
import "@/assets/sass/search.scss"
import OneBusiness from "@/components/OneBusiness"
import BScroll from "better-scroll"
import { falseBussinessbrief } from "@/falsedata/falsedata"
interface search {
  search_text: string,
  search_res: any[],
  keyword: string,
  [x: string]: any
}
export default defineComponent({
  name: "Search",
  props: {},
  components: { OneBusiness },
  setup () {
    const { getters } = useStoreHooks();
    const router = useRouter();
    const route = useRoute();
    const state: search = reactive({
      search_text: "",
      search_res: falseBussinessbrief,
      keyword: route?.params?.keyword.toString(),
      scroll: "",
      pageNum: 1,
      pageSize: 20,
      isMore: true
    })
    const back = () => {
      router.go(-1)
    }
    watch(() => state.search_text, (text: string) => {
      state.search_res = [];
      sameMethod(text)
    })
    const getFalseBussinessbrief = computed(() => getters['getFalseBussinessbrief'])
    onMounted(() => {
      sameMethod(state.keyword);
      nextTick(() => {
        _initScroll();
        getList()
      })
    })
    const sameMethod = (text: string) => {
      const data = getFalseBussinessbrief.value;
      for (const x in data) {
        if (data[x].shop_name.includes(text)) {
          state.search_res.push(data[x])
        }
      }
    }
    const _initScroll = () => {
      state.scroll = new BScroll("#searchContent", {
        scrollY: true,
        click: true,
        pullUpLoad: true,
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        }
      })
      state.scroll.on("scroll", scrollHandler);
      state.scroll.on("pullingDown", pullingDownHandler);
      state.scroll.on("pullingUp", pullingUpHandler)
    }
    const scrollHandler = (pos: { y: number; }) => {
      if (pos.y > 50) console.log("松开手加载")
      else console.log("下拉刷新")
    }
    const pullingDownHandler = () => {
      state.search_res = [];
      state.pageNum = 1;
      state.isMore = true;
      getList();
      state.scroll.finishPullDown();
      state.scroll.refresh();
    }
    const pullingUpHandler = () => {
      if (!state.isMore) {
        state.scroll.finishPullUp();
        return;
      }
      state.pageNum++;
      getList();
      state.scroll.finishPullUp();
      state.scroll.refresh();
    }
    const getList = () => {
      state.search_res = [...state.search_res, ...getFalseBussinessbrief.value];
    }
    const htmlEl = () => {
      return state.search_res.map((item: any, index: number) => {
        return <OneBusiness item={item} key={index}></OneBusiness>
      })
    }

    return () => (
      <>
        <div class='search_wrap'>
          <div class="re_search">
            <svg onClick={back}>
              <use xlinkHref="#arrow-left.6f6409e"></use>
            </svg>
            <input type="search" v-model={state.search_text} class="v-md" placeholder="请输入商品名称" />
          </div>
          <div class="search-content" id="searchContent">
            <div class="search_scroll">
              {htmlEl()}
            </div>
          </div>
        </div>
      </>
    )
  }
})