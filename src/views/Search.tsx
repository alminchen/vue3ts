import { computed, defineComponent, onMounted, reactive, watch } from "vue"
import { useStoreHooks } from '@/hooks';
import { useRouter, useRoute } from "vue-router"
import "@/assets/sass/search.scss"
import OneBusiness from "@/components/OneBusiness.vue"
interface search {
  search_text: string,
  search_res: any[],
  keyword: string
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
      search_res: [],
      keyword: route?.params?.keyword.toString()
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
      sameMethod(state.keyword)
    })
    const sameMethod = (text: string) => {
      const data = getFalseBussinessbrief.value;
      for (const x in data) {
        if (data[x].shop_name.includes(text)) {
          state.search_res.push(data[x])
        }
      }
    }
    const htmlEl = () => {
      return state.search_res.map((item: any) => {
        return <OneBusiness item={item}></OneBusiness>
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
          {htmlEl()}
        </div>
      </>
    )
  }
})