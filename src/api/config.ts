interface comm {
  g_tk: number;
  inCharset: string;
  outCharset: string;
  notice: number;
  format: string;
}
interface ops { param: string }
export const commonParams: comm = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options: ops = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0