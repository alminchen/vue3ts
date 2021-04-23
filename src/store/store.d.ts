declare namespace StoreStats {
  export interface falseHotWord {
    search_word?: string,
    title?: string
  }
  export interface falseOrder {
    restaurant_id: string,
    img_src: string,
    store_name: string,
    order_birth_time: string,
    order_state: string,
    order_content: ojc,
    order_brief_info: string,
    order_price: number
  }
  interface ojc {
    [propName: string]: any
  }
  export interface falseBussinessbrief {
    shop_name: string,
    id: string,
    path: string,
    shop_rating: number,
    brand: boolean,
    on_time: boolean,
    fengniao: boolean,
    bao: boolean,
    piao: boolean,
    zhun: boolean,
    start_send: number,
    send_cost: number,
    distance: number,
    estimate_time: number,
    notice: string,
    discount: string
  }
  export interface falseBussinessInfo {
    // discountS?: String
    's10001': nameString,
    "s10002": nameString,
    "s10003": nameString,
    "s10004": nameString,
    "s10005": nameString,
  }
  interface nameString {
    shop_name: string;
    id: string;
    shop_rating: number;
    service_code: number;
    foods_code: number;
    high_or_low: boolean;
    h_l_percent: number;
    brand: boolean;
    on_time: boolean;
    fengniao: boolean;
    bao: boolean;
    piao: boolean,
    zhun: boolean,
    start_send: number,
    send_cost: number,
    distance: number,
    estimate_time: number,
    notice: string,
    discount: string,
    evaluate: evaluateState[],
    commodity: commodityState[]
  }
  interface evaluateState {
    username: string;
    userid: number;
    user_img: string;
    time: string;
    evaluate_code: number;
    send_time: number;
    evaluate_details: string;
  }
  interface commodityState {
    description: string,
    is_selected: boolean,
    name: string,
    type_accumulation: string,
    foods: foodsState[]
  }
  interface foodsState {
    name: string;
    rating: number;
    unit_price: number;
    restaurant_id: string;
    description: string;
    month_sales: number;
    rating_count: number;
    tips: string;
    satisfy_count: number;
    satisfy_rate: number;
    one_food_id: number;
    image_path: string;
  }
}