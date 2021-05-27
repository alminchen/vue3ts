export function setDPR (): any {
  const viewport: any = document.querySelector('meta[name=viewport]');
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
    const doc: HTMLElement = document.body || document.documentElement;
    const p: number = doc.clientWidth;
    return p / 10;
  };
  const changePage = function () {
    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + widthProportion() + 'px !important');
  };
  changePage();
  window.addEventListener(resizeEvt, changePage, false);
}