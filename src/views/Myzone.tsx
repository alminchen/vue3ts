import ListView from "@/components/scroll-tsx/ListView"
import FixNav from "@/components/FixNav"
import { getSingerList } from "@/api/singer"
import Singer from "@/common/singer"
import { useStoreHooks } from '@/hooks';
import { defineComponent, reactive, ref, onMounted, watch, nextTick, } from 'vue';
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default defineComponent({
  components: { ListView, FixNav },
  name: 'myzone',
  props: {},
  setup: () => {
    const { dispatch } = useStoreHooks();
    const state: any = reactive({
      singers: [],
      show: false
    })

    onMounted(() => {
      getSingerList_()

      handlePlaylist();
      dispatch("setWhichpage", "myzone")
    })
    const singer: any = ref(null);
    const list: any = ref(null);
    const handlePlaylist = () => {
      singer.value.style.bottom = 0;
    }
    const getSingerList_ = async () => {
      await getSingerList().then(async (res: { data: { list: any[]; }; }) => {
        state.singers = normalizeSinger(res.data.list);
      }).catch((err: any) => {
        console.log(err);
      })
    }
    watch(() => state.singers, (val) => {
      if (val.length > 0) {
        state.show = true;
        nextTick(() => {
          // list.value.refresh()
        })
      }
    })
    const normalizeSinger = (list: any[]) => {
      const map: any = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      list.forEach((item: any, index: number) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_id
            })
          )
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
          })
        )
      });
      const hot = [], ret = [];
      for (const key in map) {
        const val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
    return () => (
      <>
        <div class="singer" ref={singer} style={{ position: "fixed", top: "0", right: "0", bottom: "0", left: "0" }}>
          <list-view data={state.singers} ref={list}></list-view>
          <fix-nav></fix-nav>
        </div>
      </>
    )
  }
})