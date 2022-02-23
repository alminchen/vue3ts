export function setDPR (): void {
  const viewport = document.querySelector<HTMLElement>('meta[name=viewport]') as HTMLElement;
  if (window.devicePixelRatio === 1) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
  }
  if (window.devicePixelRatio === 2) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
  }
}
export function remChange (): void {
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const widthProportion = function (): number {
    const doc = (document.body || document.documentElement) as HTMLElement;
    const p = doc.clientWidth as number;
    return p / 10;
  };
  const changePage = function (): void {
    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + widthProportion() + 'px !important');
  };
  changePage();
  window.addEventListener(resizeEvt, changePage, false);
}