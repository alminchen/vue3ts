declare namespace StoreStats {
  export type falseHotWord = {
    search_word?: string,
    title?: string
  }
  export type falseOrder = {
    restaurant_id: string,
    img_src: string,
    store_name: string,
    order_birth_time: string,
    order_state: string,
    order_content: other<string | number | unknown>,
    order_brief_info: string,
    order_price: number
  }
  type other<T> = {
    [x: string]: T
  }
  export type falseBussinessbrief = {
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
  export type falseBussinessInfo = {
    [x: string]: nameString
  }
  type nameString = {
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
  type evaluateState = {
    username: string;
    userid: number;
    user_img: string;
    time: string;
    evaluate_code: number;
    send_time: number;
    evaluate_details: string;
  }
  type commodityState = {
    description: string,
    is_selected: boolean,
    name: string,
    type_accumulation: string,
    foods: foodsState[]
  }
  type foodsState = {
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