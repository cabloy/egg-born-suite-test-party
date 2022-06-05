/*! For license information please see front.js.LICENSE.txt */
(()=>{var t={885:(t,e,r)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new C(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=L(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=f(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var d={};function p(){}function h(){}function v(){}var y={};u(y,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(E([])));g&&g!==e&&r.call(g,a)&&(y=g);var w=v.prototype=p.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function o(i,a,s,c){var u=f(t[i],t,a);if("throw"!==u.type){var l=u.arg,d=l.value;return d&&"object"==n(d)&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(d).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(u.arg)}var i;this._invoke=function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,d;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function E(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:O}}function O(){return{value:void 0,done:!0}}return h.prototype=v,u(w,"constructor",v),u(v,"constructor",h),h.displayName=u(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),u(x.prototype,s,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new x(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},t}function i(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function s(t){i(a,n,o,s,c,"next",t)}function c(t){i(a,n,o,s,c,"throw",t)}s(void 0)}))}}r.d(e,{Z:()=>s});const s={appTestMenuLayoutBlockListItems:{installFactory:function(t){return{mixins:[t.prototype.$meta.module.get("a-app").options.mixins.ebAppMenuLayoutBlockListItemsBase],data:function(){return{wx:null,wxConfig:null,openid:null}},methods:{onInit:function(){var t=this;return a(o().mark((function e(){var r,n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={actionModule:"a-wechat",actionComponent:"jssdk",name:"config"},e.next=4,t.$meta.util.performAction({ctx:t,action:r});case 4:n=e.sent,t.wx=n&&n.wx,t.wxConfig=n&&n.config,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.$view.toast.show({text:e.t0.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},getMessageBar:function(){return this.$refs.messagebar.f7Messagebar},onPerformScanQRCode:function(){var t=this;if(!this.wx)return this.$text("Not In Wechat");this.wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(e){t.$view.toast.show({text:e.resultStr})},fail:function(e){t.$view.toast.show({text:e.errMsg})}})},onPerformOpenid:function(){var t=this;return a(o().mark((function e(){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.post("test/getOpenid");case 2:r=e.sent,t.openid=r.openid;case 4:case"end":return e.stop()}}),e)})))()},_renderCardTools:function(){var t=this.$createElement;return t("f7-card",[t("f7-card-header",[this.$text("Tools")]),t("f7-card-content",[t("eb-list",{attrs:{"no-hairlines-md":!0}},[t("eb-list-item",{attrs:{title:"微信扫一扫",link:"#"},props:{onPerform:this.onPerformScanQRCode}}),t("eb-list-item",{attrs:{title:"获取openid",link:"#"},props:{onPerform:this.onPerformOpenid}}),t("eb-list-item",{attrs:{title:"openid"}},[t("div",{slot:"after"},[this.openid])])])])])}},render:function(){var t=arguments[0];return this.ready?t("div",[this._renderCardTools()]):null}}}}}},167:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n={}},460:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n={Test:"测试","Not In Wechat":"不在微信内部"}},99:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n={"zh-cn":r(460).Z}},341:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n=[{path:"test/index",component:("test/index",r(142)("./".concat("test/index",".vue")).default)}]},72:(t,e,r)=>{"use strict";function n(t){return{state:{},getters:{},mutations:{},actions:{}}}r.d(e,{Z:()=>n})},227:(t,e,r)=>{var n=r(574),o=r(70)(n);o.push([t.id,"","",{version:3,sources:[],names:[],mappings:"",sourceRoot:""}]),t.exports=o},70:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=t(e);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);n&&o[c[0]]||(r&&(c[2]?c[2]="".concat(r," and ").concat(c[2]):c[2]=r),e.push(c))}},e}},574:t=>{"use strict";function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}t.exports=function(t){var r,n,o=(n=4,function(t){if(Array.isArray(t))return t}(r=t)||function(t,e){var r=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(r,n)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[1],a=o[3];if(!a)return i;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),u="/*# ".concat(c," */"),l=a.sources.map((function(t){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(t," */")}));return[i].concat(l).concat([u]).join("\n")}return[i].join("\n")}},845:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>n});const n=function(t,e,r,n,o,i,a,s){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=[],u._compiled=!0),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:u}}({data:function(){return{wx:null,openid:null}},created:function(){var t=this;this.$meta.util.performAction({ctx:this,action:{actionModule:"a-wechat",actionComponent:"jssdk",name:"config"}}).then((function(e){t.wx=e&&e.wx})).catch((function(e){t.$view.toast.show({text:e.message})}))},methods:{onPerformScanQRCode:function(){var t=this;this.wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(e){t.$view.toast.show({text:e.resultStr})}})},onPerformOpenid:function(){var t=this;return this.$api.post("test/getOpenid").then((function(e){t.openid=e.openid}))}}},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("eb-page",[r("eb-navbar",{attrs:{large:"",largeTransparent:"",title:t.$text("Test"),"eb-back-link":"Back"}}),t._v(" "),t.wx?r("eb-list",{attrs:{"no-hairlines-md":""}},[r("eb-list-item",{attrs:{title:"微信扫一扫",link:"#",onPerform:t.onPerformScanQRCode}}),t._v(" "),r("eb-list-item",{attrs:{title:"获取openid",link:"#",onPerform:t.onPerformOpenid}}),t._v(" "),r("eb-list-item",{attrs:{title:"openid"}},[r("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.openid))])])],1):t._e()],1)})).exports},750:(t,e,r)=>{var n=r(227);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals),(0,r(673).Z)("25c786f1",n,!0,{})},673:(t,e,r)=>{"use strict";function n(t,e){for(var r=[],n={},o=0;o<e.length;o++){var i=e[o],a=i[0],s={id:t+":"+o,css:i[1],media:i[2],sourceMap:i[3]};n[a]?n[a].parts.push(s):r.push(n[a]={id:a,parts:[s]})}return r}r.d(e,{Z:()=>h});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,u=!1,l=function(){},f=null,d="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(t,e,r,o){u=r,f=o||{};var a=n(t,e);return v(a),function(e){for(var r=[],o=0;o<a.length;o++){var s=a[o];(c=i[s.id]).refs--,r.push(c)}for(e?v(a=n(t,e)):a=[],o=0;o<r.length;o++){var c;if(0===(c=r[o]).refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete i[c.id]}}}}function v(t){for(var e=0;e<t.length;e++){var r=t[e],n=i[r.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](r.parts[o]);for(;o<r.parts.length;o++)n.parts.push(m(r.parts[o]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{var a=[];for(o=0;o<r.parts.length;o++)a.push(m(r.parts[o]));i[r.id]={id:r.id,refs:1,parts:a}}}}function y(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,r,n=document.querySelector("style["+d+'~="'+t.id+'"]');if(n){if(u)return l;n.parentNode.removeChild(n)}if(p){var o=c++;n=s||(s=y()),e=b.bind(null,n,o,!1),r=b.bind(null,n,o,!0)}else n=y(),e=x.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}var g,w=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function b(t,e,r,n){var o=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=w(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function x(t,e){var r=e.css,n=e.media,o=e.sourceMap;if(n&&t.setAttribute("media",n),f.ssrId&&t.setAttribute(d,e.id),o&&(r+="\n/*# sourceURL="+o.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}},142:(t,e,r)=>{var n={"./test/index.vue":845};function o(t){var e=i(t);return r(e)}function i(t){if(!r.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}o.keys=function(){return Object.keys(n)},o.resolve=i,t.exports=o,o.id=142}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";var t;r.r(n),r.d(n,{default:()=>e}),r(750);const e={install:function(e,n){return t?console.error("already installed."):(t=e,n({routes:r(341).Z,store:r(72).Z(t),config:r(167).Z,locales:r(99).Z,components:r(885).Z}))}}})(),window["test-wechat"]=n})();
//# sourceMappingURL=front.js.map