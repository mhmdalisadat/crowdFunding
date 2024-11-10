export function setCookie(cname, cvalue, exdays, isHostPrefix = false) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  let cookieName = cname;
  if (isHostPrefix) {
    cookieName = `__Host-${cname}`;
  } else if (window.location.protocol === 'https:') {
    cookieName = `__Secure-${cname}`;
  }

  const secureFlag = window.location.protocol === 'https:' ? ';Secure' : '';
  const sameSiteFlag = ';SameSite=Strict';
  const pathFlag = ';Path=/';

  document.cookie = `${cookieName}=${cvalue};${expires}${pathFlag}${secureFlag}${sameSiteFlag}`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
