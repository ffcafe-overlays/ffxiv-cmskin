export function openExternalLink(url) {
  if (window.OverlayPluginApi && window.OverlayPluginApi.openUrlInBrowser) {
    window.OverlayPluginApi.openUrlInBrowser(url);
  } else {
    window.open(url);
  }
}

export function hookAllExternal() {
  document.addEventListener('click', e => {
    const el = e.target;
    if (el.tagName === 'A') {
      if (el.target === '_blank') {
        openExternalLink(el.href);
        e.preventDefault();
      }
    }
  });
}
