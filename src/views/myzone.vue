/**
* @module myzone
* @author: ArMChAn
* @description: 什么都不用说,我其实是一个假前端!
* @since: 创建时间  2021-04-24 11:18:46
*/

<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list"></list-view>
  </div>
</template>
<script lang="ts">
import ListView from '@/components/scroll/ListView.vue';
import { getSingerList } from "@/api/singer"
import Singer from "@/common/singer"
import { defineComponent, reactive, toRefs, ref, onMounted, watch, nextTick, } from 'vue';
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default defineComponent({
  components: { ListView },
  name: 'myzone',
  props: {},
  setup: () => {
    const state: any = reactive({
      singers: [],
      show: false
    })

    onMounted(() => {
      getSingerList_()
      handlePlaylist();
    })
    const singer: any = ref(null);
    const list: any = ref(null);
    const handlePlaylist = () => {
      singer.value.style.bottom = 0;
    }
    const getSingerList_ = async () => {
      await getSingerList().then(async (res: any) => {
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
    const normalizeSinger = (list: any) => {
      let map: any = {
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
      let hot = [], ret = [];
      for (let key in map) {
        let val = map[key];
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
    return {
      ...toRefs(state),
      singer,
      list,
      handlePlaylist,
      getSingerList_,
      normalizeSinger
    }
  }
})
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>