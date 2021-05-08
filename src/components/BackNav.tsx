import { defineComponent } from "vue";
import "../assets/sass/backnav.scss";
import { useRouter } from "vue-router"
export default defineComponent({
  props: {
    title: {
      type: String,
      default: () => ''
    }
  },
  setup (porops) {
    const router = useRouter();
    const back_once = () => {
      router.go(-1)
    }
    return () => (
      <>
        <div class='back_box'>
          <div class="back_arrow" onClick={back_once}>
            <svg>
              <use xlinkHref="#arrow-left.6f6409e"></use>
            </svg>
          </div>
          <h3>{porops.title}</h3>
        </div>
      </>
    )
  }
})