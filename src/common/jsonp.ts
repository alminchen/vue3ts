import originJsonp from 'jsonp'

export default function jsonp (url: string | string[], data: { [x: string]: any }, option: { [x: string]: any }): any {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err: any, data: unknown) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data: { [x: string]: any }): any {
  let url = ''
  for (const k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
