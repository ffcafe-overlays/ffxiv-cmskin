const LS_PREFIX = 'ffxivCmskin-';

const setCookie = (name, value) => {
  window.localStorage[LS_PREFIX + name] = JSON.stringify(value);
};

const getCookie = name => {
  const res = window.localStorage[LS_PREFIX + name];
  if (!res) {
    return null;
  }
  try {
    return JSON.parse(res);
  } catch (e) {
    return null;
  }
};

export { setCookie, getCookie };
