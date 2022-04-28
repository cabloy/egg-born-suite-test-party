!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if ((n.r(o), Object.defineProperty(o, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 43));
})({
  0: function (module, exports, __webpack_require__) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: !0 });
    var originalBridgeCall = self.AlipayJSBridge && self.AlipayJSBridge.call,
      originalFetch = self.fetch,
      originImportScripts = self.importScripts,
      originEval = 'function' == typeof self.__eval ? self.__eval : self.eval;
    (exports.getUserAgent = function () {
      return navigator.swuserAgent || navigator.userAgent || '';
    }),
      (exports.debug = console.log.bind(console)),
      (exports.checkIOS = function () {
        return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(exports.getUserAgent());
      }),
      (exports.isLyra = function () {
        return Boolean(self.__LyraWSWorkerOrigin);
      }),
      (exports.callInternalAPI = function (e, t) {
        var n = { data: { method: e, param: t }, action: 'internalAPI' },
          o = encodeURIComponent(JSON.stringify(n));
        originalFetch
          ? originalFetch('https://alipay.kylinBridge/?data=' + o, { mode: 'no-cors' })
              .then(function () {})
              .catch(function () {})
          : originalBridgeCall && originalBridgeCall('internalAPI', { method: e, param: t });
      }),
      (exports.getStartupParams = function () {
        return self.__appxStartupParams && self.__appxStartupParams.appId
          ? self.__appxStartupParams
          : (self.AFAppX &&
              self.AFAppX.bridge &&
              self.AFAppX.bridge.callSync &&
              self.AFAppX.bridge.callSync('getStartupParams')) ||
              {};
      }),
      (exports.getBridge = function () {
        return self.AFAppX.bridge;
      });
    var appxImported = !1,
      appxImportListener = [];
    (exports.runAfterAppx = function (e) {
      if (self.AFAppX) return (appxImported = !0), void e();
      (self.importScripts = function (e) {
        originImportScripts(e),
          appxImported ||
            'https://appx/af-appx.worker.min.js' !== e ||
            ((appxImported = !0),
            appxImportListener.forEach(function (e) {
              return e();
            }),
            (appxImportListener = []));
      }),
        appxImportListener.push(e);
    }),
      (exports.evaluateScript = function (expression) {
        return 'function' == typeof eval
          ? eval(expression)
          : 'function' == typeof originEval
          ? ((self.eval = originEval), eval(expression))
          : void 0;
      });
  },
  10: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var o = n(11),
      r = n(0),
      s = n(2),
      a = n(5),
      i = function () {
        r.getBridge().call('showRemoteDebugPanel', {
          status: 'connecting',
          text: '远程调试准备中',
          buttonTitle: '退出',
        });
      },
      c = function () {
        r.getBridge().call('showRemoteDebugPanel', {
          status: 'connected',
          text: '远程调试已连接',
          buttonTitle: '退出',
        });
      },
      u = function () {
        r.getBridge().call('showRemoteDebugPanel', {
          status: 'disconnected',
          text: '远程调试已断开',
          buttonTitle: '退出',
        });
      };
    t.SocketConn = {
      messageQueue: [],
      socketTask: null,
      send: function (e) {
        var t = this,
          n = 'string' == typeof e ? e : JSON.stringify(e);
        n.length > 5242880
          ? r.debug('[bugme] socket send failed, size: ', n.length)
          : this.socketTask
          ? (this.messageQueue.length &&
              (this.messageQueue.forEach(function (e) {
                t.socketTask.send({ data: e });
              }),
              (this.messageQueue = [])),
            this.socketTask.send({ data: n }))
          : this.messageQueue.push(n);
      },
      close: function () {
        this.socketTask
          ? this.socketTask.close()
          : r.getBridge().showToast({ content: '请点击右上角关闭按钮退出', duration: 1e3 });
      },
      connect: function (e) {
        var t = this,
          n = r.getBridge(),
          o = n.connectSocket({ url: e, multiple: !0 });
        o.onOpen(function () {
          (t.socketTask = o), t.onopen(), r.debug('[bugme] websocket connected');
        }),
          o.onMessage(function (e) {
            t.onmessage(e);
          }),
          o.onClose(function () {
            t.onclose();
          }),
          o.onError(function () {
            t.socketTask || (u(), n.showToast({ content: '本次真机调试已结束，请重新生成调试版本', duration: 2e3 }));
          });
      },
      open: function () {
        var e = this,
          t = r.getStartupParams(),
          n = t.channelId,
          o = t.channelAuthPair,
          s = t.remoteCh,
          c = self.__LyraWSWorkerOrigin;
        if (n || c) {
          i();
          var u = a.wssConfig.default.openchannel;
          s && a.wssConfig[s] && a.wssConfig[s].openchannel && (u = a.wssConfig[s].openchannel);
          var l = r.getBridge(),
            p = c
              ? c + '/worker'
              : 'wss://' + u + '/group/connect/' + n + '?scene=tinyAppDebug&roleType=TINYAPP&roleId=0';
          if ((o && (p += '?' + o.key + '=' + o.value), r.checkIOS() && !r.isLyra())) {
            this.connect(p);
            var f = l.connectSocket;
            (l.connectSocket = function (e) {
              if (e && e.multiple) return f(e);
              l.showToast({ content: 'iOS 真机调试暂不支持 connectSocket JSAPI', duration: 1e3 });
            }),
              (l.onSocketOpen =
                l.offSocketOpen =
                l.onSocketMessage =
                l.offSocketMessage =
                l.closeSocket =
                  function () {});
          } else
            setTimeout(function () {
              e.connect(p);
            }, 1200);
        } else r.debug('[bugme] missing channelId in startup params');
      },
      onopen: function () {
        var e = r.getBridge(),
          t = e.getSystemInfoSync();
        this.send({
          method: s.RemoteXMethods.Connect,
          params: {
            userAgent: r.getUserAgent(),
            sdkVersion: e.SDKVersion,
            alipayVersion: t.version,
            model: t.model,
            system: t.system,
          },
        }),
          c();
      },
      onmessage: function (e) {
        try {
          var t = JSON.parse(e.data.data),
            n = t.method,
            a = t.id,
            i = t.params;
          if (n === s.RemoteXMethods.Disconnect) this.close();
          else if (n === s.RemoteXMethods.EvaluteScript) {
            if (i && i.code)
              try {
                var c = r.evaluateScript(i.code);
                this.send({ returnId: a, payload: o.stringify(c) });
              } catch (e) {
                r.debug('[remoteX worker evaluateScript] ', e);
              }
          } else n === s.RemoteXMethods.Ping && this.send({ method: s.RemoteXMethods.Pong, params: { returnId: a } });
        } catch (t) {
          r.debug('RemoteX onSocketMessage error', t, e);
        }
      },
      onclose: function () {
        (this.socketTask = null),
          (this.messageQueue = []),
          u(),
          [1, 2].forEach(function (e) {
            r.getBridge().call('closeSocket', { socketTaskId: e });
          });
      },
    };
  },
  11: function (e, t) {
    var n = '\\x' + ('0' + '~'.charCodeAt(0).toString(16)).slice(-2),
      o = '\\' + n,
      r = new RegExp(n, 'g'),
      s = new RegExp(o, 'g'),
      a = new RegExp('(?:^|([^\\\\]))' + o),
      i =
        [].indexOf ||
        function (e) {
          for (var t = this.length; t-- && this[t] !== e; );
          return t;
        },
      c = String;
    function u(e, t, n) {
      return t instanceof Array
        ? (function (e, t, n) {
            for (var o = 0, r = t.length; o < r; o++) t[o] = u(e, t[o], n);
            return t;
          })(e, t, n)
        : t instanceof c
        ? t.length
          ? n.hasOwnProperty(t)
            ? n[t]
            : (n[t] = (function (e, t) {
                for (var n = 0, o = t.length; n < o; e = e[t[n++].replace(s, '~')]);
                return e;
              })(e, t.split('~')))
          : e
        : t instanceof Object
        ? (function (e, t, n) {
            for (var o in t) t.hasOwnProperty(o) && (t[o] = u(e, t[o], n));
            return t;
          })(e, t, n)
        : t;
    }
    var l = {
      stringify: function (e, t, s, a) {
        return l.parser.stringify(
          e,
          (function (e, t, s) {
            var a,
              c,
              u = !1,
              l = !!t,
              p = [],
              f = [e],
              d = [e],
              g = [s ? '~' : '[Circular]'],
              m = e,
              h = 1;
            return (
              l &&
                (c =
                  'object' == typeof t
                    ? function (e, n) {
                        return '' !== e && t.indexOf(e) < 0 ? void 0 : n;
                      }
                    : t),
              function (e, t) {
                return (
                  l && (t = c.call(this, e, t)),
                  u
                    ? (m !== this &&
                        ((a = h - i.call(f, this) - 1),
                        (h -= a),
                        f.splice(h, f.length),
                        p.splice(h - 1, p.length),
                        (m = this)),
                      'object' == typeof t && t
                        ? (i.call(f, t) < 0 && f.push((m = t)),
                          (h = f.length),
                          (a = i.call(d, t)) < 0
                            ? ((a = d.push(t) - 1),
                              s ? (p.push(('' + e).replace(r, n)), (g[a] = '~' + p.join('~'))) : (g[a] = g[0]))
                            : (t = g[a]))
                        : 'string' == typeof t && s && (t = t.replace(n, o).replace('~', n)))
                    : (u = !0),
                  t
                );
              }
            );
          })(e, t, !a),
          s
        );
      },
      parse: function (e, t) {
        return l.parser.parse(
          e,
          (function (e) {
            return function (t, r) {
              var s = 'string' == typeof r;
              return s && '~' === r.charAt(0)
                ? new c(r.slice(1))
                : ('' === t && (r = u(r, r, {})),
                  s && (r = r.replace(a, '$1~').replace(o, n)),
                  e ? e.call(this, t, r) : r);
            };
          })(t)
        );
      },
      parser: JSON,
    };
    e.exports = l;
  },
  2: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (function (e) {
        (e.Connect = 'RemoteX.connect'),
          (e.Disconnect = 'RemoteX.disconnect'),
          (e.PageChanged = 'RemoteX.pageChanged'),
          (e.DataChanged = 'RemoteX.dataChanged'),
          (e.EvaluteScript = 'RemoteX.evaluteScript'),
          (e.syncStorage = 'RemoteX.syncStorage'),
          (e.requestWillBeSent = 'RemoteX.requestWillBeSent'),
          (e.requestFinished = 'RemoteX.requestFinished'),
          (e.Ping = 'RemoteX.ping'),
          (e.Pong = 'RemoteX.pong');
      })(t.RemoteXMethods || (t.RemoteXMethods = {}));
  },
  43: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var o = n(44),
      r = n(47),
      s = n(0);
    s.runAfterAppx(function () {
      setTimeout(function () {
        s.debug('[bugme] run after appx'),
          s.getStartupParams().isRemoteX || s.isLyra()
            ? (s.debug('[bugme] remotex mode'), o.registerRemoteX())
            : (s.debug('[bugme] preview mode'), r.registerPreview());
      }, 1e3);
    });
  },
  44: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var o = n(10),
      r = n(0),
      s = n(45);
    t.registerRemoteX = function () {
      if (self.navigator) {
        r.debug('[bugme] start to register remotex'),
          s.listenEvents(),
          o.SocketConn.open(),
          (self.bugmeAPI = {
            send: function (e) {
              o.SocketConn.send(e);
            },
          });
        if (self.document && self.document.dispatchEvent)
          try {
            self.document.dispatchEvent('bugmeInjected');
          } catch (e) {
            self.document.dispatchEvent(new CustomEvent('bugmeInjected'));
          }
        else self.dispatchEvent && self.dispatchEvent(new CustomEvent('bugmeInjected'));
      }
    };
  },
  45: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var o = n(2),
      r = n(0),
      s = n(10),
      a = n(46);
    function i(e) {
      if (!e || 'object' != typeof e) return {};
      var t = {};
      return (
        Object.keys(e).forEach(function (n) {
          t[n] = '' + e[n];
        }),
        t
      );
    }
    var c = /^https?:\/\/hpmweb\.alipay\.com/,
      u = function (e) {
        c.test(e.url) ||
          s.SocketConn.send({
            method: o.RemoteXMethods.requestWillBeSent,
            params: {
              reqId: e.requestId,
              url: e.url,
              method: (e.method || 'GET').toUpperCase(),
              body: e.postBody,
              headers: i(e.headers),
            },
          });
      },
      l = function (e) {
        c.test(e.url) ||
          s.SocketConn.send({
            method: o.RemoteXMethods.requestFinished,
            params: { reqId: e.requestId, url: e.url, status: e.status, body: e.body, headers: i(e.headers) },
          });
      },
      p = function (e) {
        c.test(e.url) ||
          s.SocketConn.send({
            method: o.RemoteXMethods.requestFinished,
            params: { reqId: e.requestId, url: e.url, status: null },
          });
      },
      f = function (e) {
        var t = {};
        Object.keys(e.data).forEach(function (n) {
          try {
            t[n] = JSON.parse(e.data[n]).APDataStorage;
          } catch (e) {}
        }),
          s.SocketConn.send({ method: o.RemoteXMethods.syncStorage, params: { data: t } });
      };
    t.listenEvents = function () {
      var e = r.getBridge();
      e.on(a.ERiverWorkerEvent.PageResume, function () {
        s.SocketConn.send({ method: o.RemoteXMethods.PageChanged });
      }),
        e.on(a.ERiverWorkerEvent.DebugPanelClick, function () {
          s.SocketConn.close();
        }),
        r.checkIOS() && !r.isLyra()
          ? (e.on(a.ERiverDebugEvent.networkRequest, function (e) {
              var t = e.data;
              u(t);
            }),
            e.on(a.ERiverDebugEvent.networkResponse, function (e) {
              var t = e.data;
              l(t);
            }),
            e.on(a.ERiverDebugEvent.networkError, function (e) {
              var t = e.data;
              p(t);
            }),
            e.on(a.ERiverDebugEvent.storageChanged, function (e) {
              var t = e.data;
              f(t);
            }))
          : e.on(a.ERiverDebugEvent.debugConsole, function (e) {
              var t,
                n = e.data,
                o = n.type,
                r = n.content;
              try {
                t = JSON.parse(r);
              } catch (e) {
                return;
              }
              switch (o) {
                case a.ERiverDebugEvent.networkRequest:
                  u(t);
                  break;
                case a.ERiverDebugEvent.networkResponse:
                  l(t);
                  break;
                case a.ERiverDebugEvent.networkError:
                  p(t);
                  break;
                case a.ERiverDebugEvent.storageChanged:
                  f(t);
              }
            });
    };
  },
  46: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (function (e) {
        (e.networkRequest = 'tinyAppRemoteDebug_network_request'),
          (e.networkResponse = 'tinyAppRemoteDebug_network_response'),
          (e.networkError = 'tinyAppRemoteDebug_network_error'),
          (e.storageChanged = 'tinyAppRemoteDebug_storage'),
          (e.debugConsole = 'onTinyDebugConsole'),
          (e.vconsoleMessage = 'onMessageFromVConsole');
      })(t.ERiverDebugEvent || (t.ERiverDebugEvent = {})),
      (function (e) {
        (e.PageResume = 'pageResume'), (e.DebugPanelClick = 'tinyRemoteDebugPanelButtonClick');
      })(t.ERiverWorkerEvent || (t.ERiverWorkerEvent = {}));
  },
  47: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var o = n(11),
      r = n(0),
      s = function (e, t) {
        return void 0 === t
          ? '©undefined'
          : null === t
          ? '©null'
          : t === -1 / 0
          ? '©- Infinity'
          : t === 1 / 0
          ? '©Infinity'
          : 'number' == typeof t && isNaN(t)
          ? '©NaN'
          : 'function' == typeof t
          ? '©function'
          : t;
      },
      a = Function,
      i = function (e) {
        try {
          if (e.fromVConsoleToWorker) {
            var t = e.requestId;
            if ('exec' === e.method) {
              try {
                new a('requestId', 'sendBack', 'var res = ' + e.script + ';console.log(res);')(t, function (e) {
                  return r.callInternalAPI('tinyDebugConsole', {
                    type: 'msgFromWorkerToVConsole',
                    content: o.stringify({ requestId: t, returnValue: e }, s),
                  });
                });
              } catch (e) {
                console.error(e.name + ':' + e.message);
              }
            }
          }
        } catch (e) {}
      };
    t.registerPreview = function () {
      setTimeout(function () {
        self.document
          ? self.document.addEventListener('push', function (e) {
              try {
                var t = e.data.param;
                i(JSON.parse(t.content || t.data.content));
              } catch (e) {}
            })
          : self.addEventListener &&
            self.addEventListener('push', function (e) {
              try {
                var t = JSON.parse(JSON.parse(e.data.text()).param.data.content);
                i(t);
              } catch (e) {}
            });
      }, 10),
        ['log', 'info', 'error', 'debug', 'warn'].forEach(function (e) {
          var t = 'o' + e;
          console[t] ||
            ((console[t] = console[e]),
            (console[e] = function () {
              for (var n, a = [], i = 0; i < arguments.length; i++) a[i] = arguments[i];
              console[t].apply(console, a);
              try {
                n = o.stringify(
                  a.map(function (e) {
                    return e instanceof Error ? e.name + ': ' + e.message : e;
                  }),
                  s
                );
              } catch (e) {
                return void console.error(e.name + ': ' + e.message);
              }
              r.callInternalAPI('tinyDebugConsole', { content: n, type: 'console_' + e });
            }));
        });
    };
  },
  5: function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.wssConfig = {
        default: { openchannel: 'openchannel.alipay.com', hpmweb: 'hpmweb.alipay.com' },
        1: { openchannel: 'miniprogram.alipay.com', hpmweb: 'hpmweb.alipay.com' },
      });
  },
});
if (!self.__appxInited) {
  self.__appxInited = 1;

  require('./config$');
  require('./importScripts$');

  var AFAppX = self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function () {};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;

  if (AFAppX.registerApp) {
    AFAppX.registerApp({
      appJSON: appXAppJson,
    });
  }

  function success() {
    require('../../app');
    require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
  }
  self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}
