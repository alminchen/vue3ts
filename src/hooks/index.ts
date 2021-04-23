import { useStore } from 'vuex';
// 这几个玩意的type
import { State } from "../store/interfac"
import { Getters, Dispatch, Commit } from './util';
interface UseStoreHooks {
  state: State;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}

const useStoreHooks = (): UseStoreHooks => {
  const store = useStore<State>();
  // return store;
  // 自定义的进行输出结果
  const { state, getters, dispatch, commit }: UseStoreHooks = store;
  return {
    state,
    getters,
    commit,
    dispatch,
  };
};

export { useStoreHooks };
export default useStoreHooks;
