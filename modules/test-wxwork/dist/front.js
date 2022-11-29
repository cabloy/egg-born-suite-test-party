/*! For license information please see front.js.LICENSE.txt */
(()=>{var t={138:(t,e,r)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},s=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,a=Object.create(o.prototype),s=new k(n||[]);return i(a,"_invoke",{value:L(t,r,s)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var d={};function p(){}function v(){}function m(){}var y={};l(y,s,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(I([])));b&&b!==e&&r.call(b,s)&&(y=b);var w=m.prototype=p.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function o(i,a,s,c){var u=h(t[i],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==n(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(u.arg)}var a;i(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function L(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=M(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function M(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,M(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var n=h(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,d;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function I(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return v.prototype=m,i(w,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:v,configurable:!0}),v.displayName=l(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(S.prototype),l(S.prototype,c,(function(){return this})),t.AsyncIterator=S,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new S(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),l(w,u,"Generator"),l(w,s,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=I,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:I(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},t}function i(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function s(t){i(a,n,o,s,c,"next",t)}function c(t){i(a,n,o,s,c,"throw",t)}s(void 0)}))}}r.d(e,{Z:()=>s});const s={appTestMenuLayoutBlockListItems:{installFactory:function(t){return{mixins:[t.prototype.$meta.module.get("a-app").options.mixins.ebAppMenuLayoutBlockListItemsBase],data:function(){return{wx:null,wxConfig:null,memberId:null}},methods:{onInit:function(){var t=this;return a(o().mark((function e(){var r,n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={actionModule:"a-wxwork",actionComponent:"jssdk",name:"config"},e.next=4,t.$meta.util.performAction({ctx:t,action:r});case 4:n=e.sent,t.wx=n&&n.wx,t.wxConfig=n&&n.config,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.$view.toast.show({text:e.t0.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},getMessageBar:function(){return this.$refs.messagebar.f7Messagebar},onSubmitSendMessage:function(t,e){var r=this;return a(o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e(),t&&r.getMessageBar().focus(),n.next=5,r.$api.post("test/sendAppMessage",{message:{text:t}});case 5:n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),r.$view.toast.show({text:n.t0.message});case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},onPerformScanQRCode:function(){var t=this;if(!this.wx)return this.$text("Not In Wechat Work");this.wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(e){t.$view.toast.show({text:e.resultStr})},fail:function(e){t.$view.toast.show({text:e.errMsg})}})},onPerformMemberId:function(){var t=this;return a(o().mark((function e(){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.post("test/getMemberId");case 2:r=e.sent,t.memberId=r.memberId;case 4:case"end":return e.stop()}}),e)})))()},_renderCardSendAppMessage:function(){var t=this.$createElement;return t("f7-card",[t("f7-card-header",[this.$text("Send App Message")]),t("f7-card-content",[t("f7-messagebar",{ref:"messagebar",class:"test-messagebar-app-menu",attrs:{placeholder:"Message"},on:{submit:this.onSubmitSendMessage}},[t("f7-icon",{attrs:{f7:"::send"},slot:"send-link"})])])])},_renderCardTools:function(){var t=this.$createElement;return t("f7-card",[t("f7-card-header",[this.$text("Tools")]),t("f7-card-content",[t("eb-list",{attrs:{"no-hairlines-md":!0}},[t("eb-list-item",{attrs:{title:"微信扫一扫",link:"#"},props:{onPerform:this.onPerformScanQRCode}}),t("eb-list-item",{attrs:{title:"获取MemberId",link:"#"},props:{onPerform:this.onPerformMemberId}}),t("eb-list-item",{attrs:{title:"MemberId"}},[t("div",{slot:"after"},[this.memberId])])])])])}},render:function(){var t=arguments[0];return this.ready?t("div",[this._renderCardSendAppMessage(),this._renderCardTools()]):null}}}}}},238:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n={}},252:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n={Test:"测试","Not In Wechat Work":"不在企业微信内部","Send App Message":"发送应用消息"}},46:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n={"zh-cn":r(252).Z}},364:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n=[{path:"test/index",component:("test/index",r(142)("./".concat("test/index",".vue")).default)}]},166:(t,e,r)=>{"use strict";function n(t){return{state:{},getters:{},mutations:{},actions:{}}}r.d(e,{Z:()=>n})},250:(t,e,r)=>{var n=r(574),o=r(70)(n);o.push([t.id,"\n.test-messagebar[data-v-056e60e1] {\n  margin-bottom: 56px;\n}\n","",{version:3,sources:["webpack://./front/src/pages/test/index.vue"],names:[],mappings:";AAiFA;EACA,mBAAA;AACA",sourcesContent:['<template>\n  <eb-page>\n    <eb-navbar large largeTransparent :title="$text(\'Test\')" eb-back-link="Back"></eb-navbar>\n    <f7-messagebar ref="messagebar" class="test-messagebar" placeholder="Message" @submit="onSubmitSendMessage">\n      <f7-icon f7="::send" slot="send-link"></f7-icon>\n    </f7-messagebar>\n    <eb-list v-if="wx" no-hairlines-md>\n      <eb-list-item title="微信扫一扫" link="#" :onPerform="onPerformScanQRCode"></eb-list-item>\n      <eb-list-item title="获取MemberId" link="#" :onPerform="onPerformMemberId"></eb-list-item>\n      <eb-list-item title="MemberId">\n        <div slot="after">{{ memberId }}</div>\n      </eb-list-item>\n    </eb-list>\n  </eb-page>\n</template>\n<script>\nexport default {\n  data() {\n    return {\n      wx: null,\n      memberId: null,\n    };\n  },\n  created() {\n    const action = {\n      actionModule: \'a-wxwork\',\n      actionComponent: \'jssdk\',\n      name: \'config\',\n    };\n    this.$meta.util\n      .performAction({ ctx: this, action })\n      .then(res => {\n        this.wx = res && res.wx;\n      })\n      .catch(e => {\n        this.$view.toast.show({ text: e.message });\n      });\n  },\n  mounted() {\n    this.messagebar = this.$refs.messagebar.f7Messagebar;\n  },\n  methods: {\n    onPerformScanQRCode() {\n      this.wx.scanQRCode({\n        needResult: 1,\n        scanType: [\'qrCode\', \'barCode\'],\n        success: res => {\n          this.$view.toast.show({ text: res.resultStr });\n        },\n        fail: res => {\n          this.$view.toast.show({ text: res.errMsg });\n        },\n      });\n    },\n    onPerformMemberId() {\n      return this.$api.post(\'test/getMemberId\').then(data => {\n        this.memberId = data.memberId;\n      });\n    },\n    async onSubmitSendMessage(value, clear) {\n      try {\n        // clear\n        clear();\n        // focus\n        if (value) {\n          this.messagebar.focus();\n        }\n        // send\n        await this.$api.post(\'test/sendAppMessage\', {\n          message: {\n            text: value,\n          },\n        });\n      } catch (err) {\n        this.$view.toast.show({ text: err.message });\n      }\n    },\n  },\n};\n<\/script>\n<style scoped>\n.test-messagebar {\n  margin-bottom: 56px;\n}\n</style>\n'],sourceRoot:""}]),t.exports=o},575:(t,e,r)=>{var n=r(574),o=r(70)(n);o.push([t.id,"","",{version:3,sources:[],names:[],mappings:"",sourceRoot:""}]),t.exports=o},70:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=t(e);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);n&&o[c[0]]||(r&&(c[2]?c[2]="".concat(r," and ").concat(c[2]):c[2]=r),e.push(c))}},e}},574:t=>{"use strict";function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}t.exports=function(t){var r,n,o=(n=4,function(t){if(Array.isArray(t))return t}(r=t)||function(t,e){var r=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(r,n)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[1],a=o[3];if(!a)return i;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),u="/*# ".concat(c," */"),l=a.sources.map((function(t){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(t," */")}));return[i].concat(l).concat([u]).join("\n")}return[i].join("\n")}},13:(t,e,r)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},s=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,a=Object.create(o.prototype),s=new k(n||[]);return i(a,"_invoke",{value:L(t,r,s)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var d={};function p(){}function v(){}function m(){}var y={};l(y,s,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(I([])));b&&b!==e&&r.call(b,s)&&(y=b);var w=m.prototype=p.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function o(i,a,s,c){var u=h(t[i],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==n(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(u.arg)}var a;i(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function L(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=M(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function M(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,M(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var n=h(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,d;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function I(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return v.prototype=m,i(w,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:v,configurable:!0}),v.displayName=l(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(S.prototype),l(S.prototype,c,(function(){return this})),t.AsyncIterator=S,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new S(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),l(w,u,"Generator"),l(w,s,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=I,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:I(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},t}function i(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}r.r(e),r.d(e,{default:()=>s});const a={data:function(){return{wx:null,memberId:null}},created:function(){var t=this;this.$meta.util.performAction({ctx:this,action:{actionModule:"a-wxwork",actionComponent:"jssdk",name:"config"}}).then((function(e){t.wx=e&&e.wx})).catch((function(e){t.$view.toast.show({text:e.message})}))},mounted:function(){this.messagebar=this.$refs.messagebar.f7Messagebar},methods:{onPerformScanQRCode:function(){var t=this;this.wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(e){t.$view.toast.show({text:e.resultStr})},fail:function(e){t.$view.toast.show({text:e.errMsg})}})},onPerformMemberId:function(){var t=this;return this.$api.post("test/getMemberId").then((function(e){t.memberId=e.memberId}))},onSubmitSendMessage:function(t,e){var r,n=this;return(r=o().mark((function r(){return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,e(),t&&n.messagebar.focus(),r.next=5,n.$api.post("test/sendAppMessage",{message:{text:t}});case 5:r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),n.$view.toast.show({text:r.t0.message});case 10:case"end":return r.stop()}}),r,null,[[0,7]])})),function(){var t=this,e=arguments;return new Promise((function(n,o){var a=r.apply(t,e);function s(t){i(a,n,o,s,c,"next",t)}function c(t){i(a,n,o,s,c,"throw",t)}s(void 0)}))})()}}};r(413);const s=function(t,e,r,n,o,i,a,s){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=[],u._compiled=!0),u._scopeId="data-v-056e60e1",c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:u}}(a,(function(){var t=this,e=t._self._c;return e("eb-page",[e("eb-navbar",{attrs:{large:"",largeTransparent:"",title:t.$text("Test"),"eb-back-link":"Back"}}),t._v(" "),e("f7-messagebar",{ref:"messagebar",staticClass:"test-messagebar",attrs:{placeholder:"Message"},on:{submit:t.onSubmitSendMessage}},[e("f7-icon",{attrs:{slot:"send-link",f7:"::send"},slot:"send-link"})],1),t._v(" "),t.wx?e("eb-list",{attrs:{"no-hairlines-md":""}},[e("eb-list-item",{attrs:{title:"微信扫一扫",link:"#",onPerform:t.onPerformScanQRCode}}),t._v(" "),e("eb-list-item",{attrs:{title:"获取MemberId",link:"#",onPerform:t.onPerformMemberId}}),t._v(" "),e("eb-list-item",{attrs:{title:"MemberId"}},[e("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.memberId))])])],1):t._e()],1)})).exports},413:(t,e,r)=>{var n=r(250);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals),(0,r(673).Z)("94d37454",n,!0,{})},386:(t,e,r)=>{var n=r(575);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals),(0,r(673).Z)("f1d8daf6",n,!0,{})},673:(t,e,r)=>{"use strict";function n(t,e){for(var r=[],n={},o=0;o<e.length;o++){var i=e[o],a=i[0],s={id:t+":"+o,css:i[1],media:i[2],sourceMap:i[3]};n[a]?n[a].parts.push(s):r.push(n[a]={id:a,parts:[s]})}return r}r.d(e,{Z:()=>p});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,u=!1,l=function(){},f=null,h="data-vue-ssr-id",d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,r,o){u=r,f=o||{};var a=n(t,e);return v(a),function(e){for(var r=[],o=0;o<a.length;o++){var s=a[o];(c=i[s.id]).refs--,r.push(c)}for(e?v(a=n(t,e)):a=[],o=0;o<r.length;o++){var c;if(0===(c=r[o]).refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete i[c.id]}}}}function v(t){for(var e=0;e<t.length;e++){var r=t[e],n=i[r.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](r.parts[o]);for(;o<r.parts.length;o++)n.parts.push(y(r.parts[o]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{var a=[];for(o=0;o<r.parts.length;o++)a.push(y(r.parts[o]));i[r.id]={id:r.id,refs:1,parts:a}}}}function m(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function y(t){var e,r,n=document.querySelector("style["+h+'~="'+t.id+'"]');if(n){if(u)return l;n.parentNode.removeChild(n)}if(d){var o=c++;n=s||(s=m()),e=w.bind(null,n,o,!1),r=w.bind(null,n,o,!0)}else n=m(),e=x.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}var g,b=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function w(t,e,r,n){var o=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function x(t,e){var r=e.css,n=e.media,o=e.sourceMap;if(n&&t.setAttribute("media",n),f.ssrId&&t.setAttribute(h,e.id),o&&(r+="\n/*# sourceURL="+o.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}},142:(t,e,r)=>{var n={"./test/index.vue":13};function o(t){var e=i(t);return r(e)}function i(t){if(!r.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}o.keys=function(){return Object.keys(n)},o.resolve=i,t.exports=o,o.id=142}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";var t;r.r(n),r.d(n,{default:()=>e}),r(386);const e={install:function(e,n){return t?console.error("already installed."):(t=e,n({routes:r(364).Z,store:r(166).Z(t),config:r(238).Z,locales:r(46).Z,components:r(138).Z}))}}})(),window["test-wxwork"]=n})();
//# sourceMappingURL=front.js.map