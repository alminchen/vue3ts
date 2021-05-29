
import { State } from "./interfac"
const getters = {
  getLogin: (state: State): boolean | undefined => state.isLogin,
  getuname: (state: State): string | undefined => state.username,
  getpwd: (state: State): string | undefined => state.password,
  getloading: (state: State): boolean | undefined => state.isLoading,
  getwhichpage: (state: State): string | undefined => state.whichPage,
  getFalseHotWord: (state: State): StoreStats.falseHotWord[] | undefined => state.falseHotWord,
  getFalseOrder: (state: State): StoreStats.falseOrder[] | undefined => state.falseOrder,
  getFalseBussinessbrief: (state: State): StoreStats.falseBussinessbrief[] | undefined => state.falseBussinessbrief,
  getFalseBussinessInfo: (state: State): StoreStats.falseBussinessInfo | undefined => state.falseBussinessInfo,
  allNums: (state: State): number | undefined => state.allNums,
  allTotalPrice: (state: State): number | undefined => state.allTotalPrice
}
export default getters;