import { defineComponent, onMounted, ref, } from 'vue';
export default defineComponent({
  name: "test",
  props: {
    changeShowType: {
      type: String,
      default: () => 'food'
    },
    sendConst: {
      type: Number,
      default: () => 0
    },
  },
  emits: ["method", "ms"],
  setup (_props, { emit }) {
    const method = () => {
      console.log("object");
    }
    const methodSe = () => {
      emit("ms")
    }
    const methodAdd = (el: unknown) => {
      console.log(el);
    }
    const text = ref(null)

    const ele = () => {
      let i = 1;
      return new Array(10).fill("").map(() => {
        i++;
        return <span ref={methodAdd}>{i}</span>
      })
    }
    onMounted(() => {
      console.log(text.value);
    })
    emit("method", method)
    return () => (
      <>
        <div ref={text}>{ele()}</div>
        <div onClick={methodSe}>触发</div>
      </>
    )
  }
})