export interface State {
  isLoading?: boolean,
  username?: string,
  password?: string,
  isLogin?: boolean,
  whichPage?: string,
  falseHotWord?: StoreStats.falseHotWord[],
  falseOrder?: StoreStats.falseOrder[],
  falseBussinessbrief?: StoreStats.falseBussinessbrief[],
  falseBussinessInfo?: StoreStats.falseBussinessInfo,
  allNums?: number,
  allTotalPrice?: number
}