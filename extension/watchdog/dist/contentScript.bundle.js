(()=>{var e={636:e=>{e.exports={apiKey:"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",triggers:["War and gore","Race-based hate","Gender-based hate","Body image hate","Sexual violence","Suicide and self harm"]}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,o),a.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=o(636);function t(e){return!!e.includes("Cuban")}function n(e){!function e(t){("img"===t.tagName.toLowerCase()&&""!==t.alt||"video"===t.tagName.toLowerCase())&&(console.log(t),t.style.filter="blur(20px)",t.parentNode.style.filter="blur(20px)");for(var o=0;o<t.children.length;o++)e(t.children[o])}(e)}function r(e){var t=[];return function e(o){"span"===o.tagName.toLowerCase()&&t.push(o);for(var n=0;n<o.childNodes.length;n++){var r=o.childNodes[n];r.nodeType===Node.ELEMENT_NODE&&e(r)}}(e),t}o.n(e)().triggers.join(", "),setInterval((function(){chrome.storage.local.get("settings",(function(e){console.log(e.settings)})),new RegExp("^".concat("https://twitter.com")).test(window.location.href)&&(console.log("Checking tweets"),document.querySelectorAll("article").forEach((function(e){if(t(e.textContent)){var o=r(e)[0].innerText.split(" ");"Retweeted"===o[o.length-1]?r(e)[8].innerHTML=innerHTML="<i>This tweet contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>":r(e)[5].innerHTML="<i>This tweet contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>",n(e)}}))),new RegExp("^".concat("https://www.facebook.com")).test(window.location.href)&&(console.log("Matches fb!"),console.log("Checking posts"),document.querySelectorAll('div[data-ad-preview="message"]').forEach((function(e){t(e.textContent)&&(e.innerHTML="<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog.</b></small>"),n(e.parentNode.parentNode)})))}),2e3)})()})();