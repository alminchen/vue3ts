import { State } from "./interfac"
const mutations = {
  SET_LOGIN (state: State, plateform: boolean): void {
    state.isLogin = plateform
  },
  SET_LOADING (state: State, plateform: boolean): void {
    state.isLogin = plateform
  },
  SET_WHICHPAGE (state: State, plateform: string): void {
    state.whichPage = plateform;
  },
  SET_HOME_PAGE_MORE (state: State, plateform: StoreStats.falseBussinessbrief[]): void {
    state.falseBussinessbrief = plateform
  },
  SET_ORDER (state: State, plateform: StoreStats.falseOrder[]): void {
    state.falseOrder = state.falseOrder?.concat(plateform)
  },
  SET_ALLNUMS (state: State, nums: number): void {
    state.allNums = nums
  },
  SET_ALLTOTALPRICR (state: State, allprice: number): void {
    state.allTotalPrice = allprice
  }
}
export default mutations