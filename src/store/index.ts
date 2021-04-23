
import Vuex from 'vuex'
import Action from "./actions"
import Getters from "./getters"
import Mutations from "./mutations"
import { State } from "./interfac"
import { falseHotWord, falseOrder, falseBussinessbrief, falseBussinessInfo } from '@/falsedata/falsedata';

const state: State = {
  isLoading: false,
  username: "admin",
  password: "admin",
  isLogin: false,
  whichPage: "homepage",
  falseHotWord: falseHotWord,
  falseOrder: falseOrder,
  falseBussinessbrief: falseBussinessbrief,
  falseBussinessInfo: falseBussinessInfo,
  allNums: 0,
  allTotalPrice: 0
}
export default new Vuex.Store({
  state: state,
  mutations: Mutations,
  actions: Action,
  getters: Getters
})
