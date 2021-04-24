/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class Singer {
  [x: string]: any
  constructor({ id, name }: any) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}