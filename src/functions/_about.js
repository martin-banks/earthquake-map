
export default function () {
  return {
    nca: !!document.querySelector('.newscomau'),
    whimn: window.location.host === 'www.whimn.com.au' || !!document.querySelector('[property="og:site_name"][content="whimn"]'),
    mhr: !!document.querySelector('.content .story'),
    longform: !!document.querySelector('[data-color-scheme]'),
    theme: document.querySelector('[data-color-scheme="dark"]') ? 'dark' : 'light',
    mobile: /iPad|Android|webOS|iPhone|iPod|Blackberry/.test(navigator.userAgent) && !window.MSStream,
    isTestEnv: ['localhost', '127.0.0.1'].indexOf(window.location.hostname) !== -1,
    isPreview: ['media.news.com.au'].indexOf(window.location.hostname) !== -1,
    h3o: false,
  }
}
