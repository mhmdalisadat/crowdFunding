function loadWidget() {
  const i = 'AXVUju';
  const a = window;
  const d = document;

  function g() {
    // eslint-disable-next-line no-shadow
    const g = d.createElement('script');
    const s = `https://www.goftino.com/widget/${i}`;
    const l = localStorage.getItem(`goftino_${i}`);
    g.async = !0;
    g.src = l ? `${s}?o=${l}` : s;
    d.getElementsByTagName('head')[0].appendChild(g);
  }

  if (d.readyState === 'complete') {
    g();
  } else if (a.attachEvent) {
    a.attachEvent('onload', g);
  } else {
    a.addEventListener('load', g, !1);
  }
}

export default loadWidget;
