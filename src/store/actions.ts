import { Commit } from "vuex"
const actions = {
  setLogin (context: { commit: Commit }, plateform: boolean): void {
    context.commit("SET_LOGIN", plateform)
  },
  setLoading (context: { commit: Commit }, plateform: boolean): void {
    context.commit('SET_LOADING', plateform)
  },
  setWhichpage (context: { commit: Commit }, platform: string): void {
    context.commit('SET_WHICHPAGE', platform);
  },
  setHomepageMore (context: { commit: Commit }, platform: StoreStats.falseBussinessbrief[]): void {
    context.commit('SET_HOME_PAGE_MORE', platform);
  },
  setOrder (context: { commit: Commit }, platform: unknown): void {
    context.commit('SET_ORDER', platform);
  },
  setAllNums (context: { commit: Commit }, nums: number): void {
    context.commit('SET_ALLNUMS', nums)
  },
  setAllTotalPrice (context: { commit: Commit }, allprice: number): void {
    context.commit('SET_ALLTOTALPRICR', allprice)
  }
}
export default actions;