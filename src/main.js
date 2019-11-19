// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'

import project from '@/content/project.json'
import about from '@/functions/_about'
import analytics from '@/functions/google-analytics'
import content from '@/content'

import brightcove from '@/vue-directives/brightcove'
import imageLoaded from '@/vue-directives/imagesLoaded'
import markerLabels from '@/vue-directives/marker-labels'
import balanceText from '@/vue-directives/balance-text'
import scrollToTop from '@/vue-directives/scroll-to-top'
import scrollOutClose from '@/vue-directives/scroll-out-close'

// Vue.config.productionTip = false
const client = about()
// const version = '1.3'
console.log({ client })

if (content.analytics && content.analytics.id) {
  analytics.setup(content.analytics.id)
}

// ! Polyfill for Object.values and Object.entries
const reduce = Function.bind.call(Function.call, Array.prototype.reduce)
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable)
const concat = Function.bind.call(Function.call, Array.prototype.concat)
const keys = Reflect.ownKeys
if (!Object.values) {
  Object.values = function values (O) {
    return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), [])
  }
}
if (!Object.entries) {
  Object.entries = function entries (O) {
    return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), [])
  }
}

// // if (client.nca || client.longform || client.mhr || client.isPreview || client.isTestEnv) {}
// console.log('custom app starting', version)

// ! Adds global directive that will hide images while they are loading
Vue.directive('imageloaded', imageLoaded)
Vue.directive('markerlabels', markerLabels)
Vue.directive('balancetext', balanceText)
Vue.directive('scroll-to-top', scrollToTop)
Vue.directive('scrolloutclose', scrollOutClose)

// TODO programatically add custom directives from content/index.js file as needed
// ! Global directive for adding brightcove videos
Vue.directive('brightcove', brightcove)

const vm = new Vue({
  el: `#app_${project.name}`,
  components: { App },
  template: '<app/>',
  data: {
    client,
    mobile: client.mobile,
    custom: content.custom,
    content,
    // This value is used to determine if the brightcove video player can be used
    // Video playuers should only be called if this is true
    videoSupported: false,
  },
})

// Loop to detect if brightcove video player has loaded and can be used
// Video scripts should be used from the site header.
// TODO If after window.onload the scripts are still not loaded, add them to the doc head
let checkingLoop = 0
let checkForVideo = null

function detectVideo () {
  checkingLoop++
  if (window.videojs) {
    clearInterval(checkForVideo)
    vm.videoSupported = true
  }
  if (checkingLoop > 10) {
    clearInterval(checkingLoop)
  }
}

checkForVideo = setInterval(detectVideo, 1000)
