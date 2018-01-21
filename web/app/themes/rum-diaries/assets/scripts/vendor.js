'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+php */
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
	var e = /\blang(?:uage)?-(\w+)\b/i,
	    t = 0,
	    n = _self.Prism = {
		util: {
			encode: function encode(e) {
				return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : 'Array' === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			},
			type: function type(e) {
				return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
			},
			objId: function objId(e) {
				return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id;
			},
			clone: function clone(e) {
				var t = n.util.type(e);
				switch (t) {
					case 'Object':
						var a = {};
						for (var r in e) {
							e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
						}return a;
					case 'Array':
						return e.map && e.map(function (e) {
							return n.util.clone(e);
						});
				}
				return e;
			}
		},
		languages: {
			extend: function extend(e, t) {
				var a = n.util.clone(n.languages[e]);
				for (var r in t) {
					a[r] = t[r];
				}return a;
			},
			insertBefore: function insertBefore(e, t, a, r) {
				r = r || n.languages;
				var l = r[e];
				if (2 == arguments.length) {
					a = arguments[1];
					for (var i in a) {
						a.hasOwnProperty(i) && (l[i] = a[i]);
					}return l;
				}
				var o = {};
				for (var s in l) {
					if (l.hasOwnProperty(s)) {
						if (s == t) for (var i in a) {
							a.hasOwnProperty(i) && (o[i] = a[i]);
						}o[s] = l[s];
					}
				}return n.languages.DFS(n.languages, function (t, n) {
					n === r[e] && t != e && (this[t] = o);
				}), r[e] = o;
			},
			DFS: function DFS(e, t, a, r) {
				r = r || {};
				for (var l in e) {
					e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), 'Object' !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? 'Array' !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)));
				}
			}
		},
		plugins: {},
		highlightAll: function highlightAll(e, t) {
			var a = {
				callback: t,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};
			n.hooks.run('before-highlightall', a);
			for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) {
				n.highlightElement(r, e === !0, a.callback);
			}
		},
		highlightElement: function highlightElement(t, a, r) {
			for (var l, i, o = t; o && !e.test(o.className);) {
				o = o.parentNode;
			}o && (l = (o.className.match(e) || [, ''])[1], i = n.languages[l]), t.className = t.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l);
			var s = t.textContent,
			    u = { element: t, language: l, grammar: i, code: s };
			if (!s || !i) return n.hooks.run('complete', u), void 0;
			if (n.hooks.run('before-highlight', u), a && _self.Worker) {
				var c = new Worker(n.filename);
				c.onmessage = function (e) {
					u.highlightedCode = e.data, n.hooks.run('before-insert', u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run('after-highlight', u), n.hooks.run('complete', u);
				}, c.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
			} else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run('before-insert', u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run('after-highlight', u), n.hooks.run('complete', u);
		},
		highlight: function highlight(e, t, r) {
			var l = n.tokenize(e, t);
			return a.stringify(n.util.encode(l), r);
		},
		tokenize: function tokenize(e, t) {
			var a = n.Token,
			    r = [e],
			    l = t.rest;
			if (l) {
				for (var i in l) {
					t[i] = l[i];
				}delete t.rest;
			}
			e: for (var i in t) {
				if (t.hasOwnProperty(i) && t[i]) {
					var o = t[i];
					o = 'Array' === n.util.type(o) ? o : [o];
					for (var s = 0; s < o.length; ++s) {
						var u = o[s],
						    c = u.inside,
						    g = !!u.lookbehind,
						    h = !!u.greedy,
						    f = 0,
						    d = u.alias;
						u = u.pattern || u;
						for (var p = 0; p < r.length; p++) {
							var m = r[p];
							if (r.length > e.length) break e;
							if (!(m instanceof a)) {
								u.lastIndex = 0;
								var y = u.exec(m),
								    v = 1;
								if (!y && h && p != r.length - 1) {
									var b = r[p + 1].matchedStr || r[p + 1],
									    k = m + b;
									if (p < r.length - 2 && (k += r[p + 2].matchedStr || r[p + 2]), u.lastIndex = 0, y = u.exec(k), !y) continue;
									var w = y.index + (g ? y[1].length : 0);
									if (w >= m.length) continue;
									var _ = y.index + y[0].length,
									    P = m.length + b.length;
									if (v = 3, P >= _) {
										if (r[p + 1].greedy) continue;
										v = 2, k = k.slice(0, P);
									}
									m = k;
								}
								if (y) {
									g && (f = y[1].length);
									var w = y.index + f,
									    y = y[0].slice(f),
									    _ = w + y.length,
									    S = m.slice(0, w),
									    O = m.slice(_),
									    j = [p, v];
									S && j.push(S);
									var A = new a(i, c ? n.tokenize(y, c) : y, d, y, h);
									j.push(A), O && j.push(O), Array.prototype.splice.apply(r, j);
								}
							}
						}
					}
				}
			}return r;
		},
		hooks: {
			all: {},
			add: function add(e, t) {
				var a = n.hooks.all;
				a[e] = a[e] || [], a[e].push(t);
			},
			run: function run(e, t) {
				var a = n.hooks.all[e];
				if (a && a.length) for (var r, l = 0; r = a[l++];) {
					r(t);
				}
			}
		}
	},
	    a = n.Token = function (e, t, n, a, r) {
		this.type = e, this.content = t, this.alias = n, this.matchedStr = a || null, this.greedy = !!r;
	};
	if (a.stringify = function (e, t, r) {
		if ('string' == typeof e) return e;
		if ('Array' === n.util.type(e)) return e.map(function (n) {
			return a.stringify(n, t, e);
		}).join('');
		var l = {
			type: e.type,
			content: a.stringify(e.content, t, r),
			tag: 'span',
			classes: ['token', e.type],
			attributes: {},
			language: t,
			parent: r
		};
		if ('comment' == l.type && (l.attributes.spellcheck = 'true'), e.alias) {
			var i = 'Array' === n.util.type(e.alias) ? e.alias : [e.alias];
			Array.prototype.push.apply(l.classes, i);
		}
		n.hooks.run('wrap', l);
		var o = '';
		for (var s in l.attributes) {
			o += (o ? ' ' : '') + s + '="' + (l.attributes[s] || '') + '"';
		}return '<' + l.tag + ' class="' + l.classes.join(' ') + '" ' + o + '>' + l.content + '</' + l.tag + '>';
	}, !_self.document) return _self.addEventListener ? (_self.addEventListener('message', function (e) {
		var t = JSON.parse(e.data),
		    a = t.language,
		    r = t.code,
		    l = t.immediateClose;
		_self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close();
	}, !1), _self.Prism) : _self.Prism;
	var r = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
	return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute('data-manual') && document.addEventListener('DOMContentLoaded', n.highlightAll)), _self.Prism;
}();
'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
	comment: /<!--[\w\W]*?-->/,
	prolog: /<\?[\w\W]+?\?>/,
	doctype: /<!DOCTYPE[\w\W]+?>/,
	cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
			'attr-value': { pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i, inside: { punctuation: /[=>"']/ } },
			punctuation: /\/?>/,
			'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } }
		}
	},
	entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add('wrap', function (a) {
	'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
	comment: /\/\*[\w\W]*?\*\//,
	atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
	url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
	property: /(\b|\B)[\w-]+(?=\s*:)/i,
	important: /\B!important\b/i,
	function: /[-a-z0-9]+(?=\()/i,
	punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore('markup', 'tag', {
	style: {
		pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
		lookbehind: !0,
		inside: Prism.languages.css,
		alias: 'language-css'
	}
}), Prism.languages.insertBefore('inside', 'attr-value', {
	'style-attr': {
		pattern: /\s*style=("|').*?\1/i,
		inside: {
			'attr-name': { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside },
			punctuation: /^\s*=\s*['"]|['"]\s*$/,
			'attr-value': { pattern: /.+/i, inside: Prism.languages.css }
		},
		alias: 'language-css'
	}
}, Prism.languages.markup.tag));
Prism.languages.clike = {
	comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }],
	string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /(\.|\\)/ }
	},
	keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	boolean: /\b(true|false)\b/,
	function: /[a-z0-9_]+(?=\()/i,
	number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend('clike', {
	keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	function: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
}), Prism.languages.insertBefore('javascript', 'keyword', {
	regex: {
		pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: !0,
		greedy: !0
	}
}), Prism.languages.insertBefore('javascript', 'class-name', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: !0,
		inside: {
			interpolation: {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' },
					rest: Prism.languages.javascript
				}
			},
			string: /[\s\S]+/
		}
	}
}), Prism.languages.markup && Prism.languages.insertBefore('markup', 'tag', {
	script: {
		pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
		lookbehind: !0,
		inside: Prism.languages.javascript,
		alias: 'language-javascript'
	}
}), Prism.languages.js = Prism.languages.javascript;
Prism.languages.php = Prism.languages.extend('clike', {
	keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
	constant: /\b[A-Z0-9_]{2,}\b/,
	comment: { pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/, lookbehind: !0 }
}), Prism.languages.insertBefore('php', 'class-name', {
	'shell-comment': { pattern: /(^|[^\\])#.*/, lookbehind: !0, alias: 'comment' }
}), Prism.languages.insertBefore('php', 'keyword', {
	delimiter: /\?>|<\?(?:php)?/i,
	variable: /\$\w+\b/i,
	package: { pattern: /(\\|namespace\s+|use\s+)[\w\\]+/, lookbehind: !0, inside: { punctuation: /\\/ } }
}), Prism.languages.insertBefore('php', 'operator', { property: { pattern: /(->)[\w]+/, lookbehind: !0 } }), Prism.languages.markup && (Prism.hooks.add('before-highlight', function (e) {
	'php' === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function (a) {
		return e.tokenStack.push(a), '{{{PHP' + e.tokenStack.length + '}}}';
	}));
}), Prism.hooks.add('before-insert', function (e) {
	'php' === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add('after-highlight', function (e) {
	if ('php' === e.language) {
		for (var a, n = 0; a = e.tokenStack[n]; n++) {
			e.highlightedCode = e.highlightedCode.replace('{{{PHP' + (n + 1) + '}}}', Prism.highlight(a, e.grammar, 'php').replace(/\$/g, '$$$$'));
		}e.element.innerHTML = e.highlightedCode;
	}
}), Prism.hooks.add('wrap', function (e) {
	'php' === e.language && 'markup' === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore('php', 'comment', {
	markup: { pattern: /<[^?]\/?(.*?)>/, inside: Prism.languages.markup },
	php: /\{\{\{PHP[0-9]+\}\}\}/
}));

!function (e) {
	if ('object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) && 'undefined' != typeof module) module.exports = e();else if ('function' == typeof define && define.amd) define([], e);else {
		var t;
		t = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this, t.qwest = e();
	}
}(function () {
	var e;
	return function t(e, n, r) {
		function o(s, a) {
			if (!n[s]) {
				if (!e[s]) {
					var u = 'function' == typeof require && require;
					if (!a && u) return u(s, !0);
					if (i) return i(s, !0);
					var p = new Error("Cannot find module '" + s + "'");
					throw p.code = 'MODULE_NOT_FOUND', p;
				}
				var f = n[s] = { exports: {} };
				e[s][0].call(f.exports, function (t) {
					var n = e[s][1][t];
					return o(n ? n : t);
				}, f, f.exports, t, e, n, r);
			}
			return n[s].exports;
		}
		for (var i = 'function' == typeof require && require, s = 0; s < r.length; s++) {
			o(r[s]);
		}return o;
	}({
		1: [function (t, n, r) {
			!function (t) {
				'use strict';

				var r = function r(e) {
					var t = function t(e, _t, n) {
						n = 'function' == typeof n ? n() : null === n ? '' : void 0 === n ? '' : n, e[e.length] = encodeURIComponent(_t) + '=' + encodeURIComponent(n);
					},
					    n = function n(e, r, o) {
						var i, s, a;
						if ('[object Array]' === Object.prototype.toString.call(r)) for (i = 0, s = r.length; s > i; i++) {
							n(e + '[' + ('object' == _typeof(r[i]) ? i : '') + ']', r[i], o);
						} else if (r && '[object Object]' === r.toString()) for (a in r) {
							r.hasOwnProperty(a) && (e ? n(e + '[' + a + ']', r[a], o, t) : n(a, r[a], o, t));
						} else if (e) t(o, e, r);else for (a in r) {
							t(o, a, r[a]);
						}return o;
					};
					return n('', e, []).join('&').replace(/%20/g, '+');
				};
				'object' == (typeof n === 'undefined' ? 'undefined' : _typeof(n)) && 'object' == _typeof(n.exports) ? n.exports = r : 'function' == typeof e && e.amd ? e([], function () {
					return r;
				}) : t.param = r;
			}(this);
		}, {}],
		2: [function (e, t, n) {
			!function (e) {
				function t(e) {
					return 'function' == typeof e;
				}
				function n(e) {
					return 'object' == (typeof e === 'undefined' ? 'undefined' : _typeof(e));
				}
				function r(e) {
					'undefined' != typeof setImmediate ? setImmediate(e) : 'undefined' != typeof process && process.nextTick ? process.nextTick(e) : setTimeout(e, 0);
				}
				var o;
				e[0][e[1]] = function i(e) {
					var s,
					    a = [],
					    u = [],
					    p = function p(e, t) {
						return null == s && null != e && (s = e, a = t, u.length && r(function () {
							for (var e = 0; e < u.length; e++) {
								u[e]();
							}
						})), s;
					};
					return p.then = function (p, f) {
						var c = i(e),
						    l = function l() {
							function e(r) {
								var i,
								    s = 0;
								try {
									if (r && (n(r) || t(r)) && t(i = r.then)) {
										if (r === c) throw new TypeError();
										i.call(r, function () {
											s++ || e.apply(o, arguments);
										}, function (e) {
											s++ || c(!1, [e]);
										});
									} else c(!0, arguments);
								} catch (a) {
									s++ || c(!1, [a]);
								}
							}
							try {
								var r = s ? p : f;
								t(r) ? e(r.apply(o, a || [])) : c(s, a);
							} catch (i) {
								c(!1, [i]);
							}
						};
						return null != s ? r(l) : u.push(l), c;
					}, e && (p = e(p)), p;
				};
			}('undefined' == typeof t ? [window, 'pinkySwear'] : [t, 'exports']);
		}, {}],
		qwest: [function (e, t, n) {
			t.exports = function () {
				var t = this,
				    n = e('pinkyswear'),
				    r = e('jquery-param'),
				    o = {},
				    i = 'json',
				    s = 'post',
				    a = null,
				    u = 0,
				    p = [],
				    f = t.XMLHttpRequest ? function () {
					return new t.XMLHttpRequest();
				} : function () {
					return new ActiveXObject('Microsoft.XMLHTTP');
				},
				    c = '' === f().responseType,
				    l = function l(e, _l, d, y, m) {
					e = e.toUpperCase(), d = d || null, y = y || {};
					for (var h in o) {
						if (!(h in y)) if ('object' == _typeof(o[h]) && 'object' == _typeof(y[h])) for (var T in o[h]) {
							y[h][T] = o[h][T];
						} else y[h] = o[h];
					}var w,
					    g,
					    v,
					    x,
					    b,
					    j = !1,
					    q = !1,
					    C = !1,
					    O = 0,
					    D = {},
					    E = {
						text: '*/*',
						xml: 'text/xml',
						json: 'application/json',
						post: 'application/x-www-form-urlencoded',
						document: 'text/html'
					},
					    M = {
						text: '*/*',
						xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
						json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
					},
					    X = !1,
					    L = n(function (n) {
						return n.abort = function () {
							C || (g && 4 != g.readyState && g.abort(), X && (--u, X = !1), C = !0);
						}, n.send = function () {
							if (!X) {
								if (u == a) return void p.push(n);
								if (C) return void (p.length && p.shift().send());
								if (++u, X = !0, g = f(), w && ('withCredentials' in g || !t.XDomainRequest || (g = new XDomainRequest(), q = !0, 'GET' != e && 'POST' != e && (e = 'POST'))), q ? g.open(e, _l) : (g.open(e, _l, y.async, y.user, y.password), c && y.async && (g.withCredentials = y.withCredentials)), !q) for (var r in D) {
									D[r] && g.setRequestHeader(r, D[r]);
								}if (c && 'auto' != y.responseType) try {
									g.responseType = y.responseType, j = g.responseType == y.responseType;
								} catch (o) {}
								c || q ? (g.onload = R, g.onerror = S, q && (g.onprogress = function () {})) : g.onreadystatechange = function () {
									4 == g.readyState && R();
								}, y.async ? 'timeout' in g ? (g.timeout = y.timeout, g.ontimeout = k) : v = setTimeout(k, y.timeout) : q && (g.ontimeout = function () {}), 'auto' != y.responseType && 'overrideMimeType' in g && g.overrideMimeType(E[y.responseType]), m && m(g), q ? setTimeout(function () {
									g.send('GET' != e ? d : null);
								}, 0) : g.send('GET' != e ? d : null);
							}
						}, n;
					}),
					    R = function R() {
						var e;
						if (X = !1, clearTimeout(v), p.length && p.shift().send(), !C) {
							--u;
							try {
								if (j && 'response' in g && null !== g.response) b = g.response;else {
									if (e = y.responseType, 'auto' == e) if (q) e = i;else {
										var n = g.getResponseHeader('Content-Type') || '';
										e = n.indexOf(E.json) > -1 ? 'json' : n.indexOf(E.xml) > -1 ? 'xml' : 'text';
									}
									switch (e) {
										case 'json':
											if (g.responseText.length) try {
												b = 'JSON' in t ? JSON.parse(g.responseText) : new Function('return (' + g.responseText + ')')();
											} catch (r) {
												throw 'Error while parsing JSON body : ' + r;
											}
											break;
										case 'xml':
											try {
												t.DOMParser ? b = new DOMParser().parseFromString(g.responseText, 'text/xml') : (b = new ActiveXObject('Microsoft.XMLDOM'), b.async = 'false', b.loadXML(g.responseText));
											} catch (r) {
												b = void 0;
											}
											if (!b || !b.documentElement || b.getElementsByTagName('parsererror').length) throw 'Invalid XML';
											break;
										default:
											b = g.responseText;
									}
								}
								if ('status' in g && !/^2|1223/.test(g.status)) throw g.status + ' (' + g.statusText + ')';
								L(!0, [g, b]);
							} catch (r) {
								L(!1, [r, g, b]);
							}
						}
					},
					    S = function S(e) {
						C || (e = 'string' == typeof e ? e : 'Connection aborted', L.abort(), L(!1, [new Error(e), g, null]));
					},
					    k = function k() {
						C || (y.attempts && ++O == y.attempts ? S('Timeout (' + _l + ')') : (g.abort(), X = !1, L.send()));
					};
					if (y.async = 'async' in y ? !!y.async : !0, y.cache = 'cache' in y ? !!y.cache : !1, y.dataType = 'dataType' in y ? y.dataType.toLowerCase() : s, y.responseType = 'responseType' in y ? y.responseType.toLowerCase() : 'auto', y.user = y.user || '', y.password = y.password || '', y.withCredentials = !!y.withCredentials, y.timeout = 'timeout' in y ? parseInt(y.timeout, 10) : 3e4, y.attempts = 'attempts' in y ? parseInt(y.attempts, 10) : 1, x = _l.match(/\/\/(.+?)\//), w = x && (x[1] ? x[1] != location.host : !1), 'ArrayBuffer' in t && d instanceof ArrayBuffer ? y.dataType = 'arraybuffer' : 'Blob' in t && d instanceof Blob ? y.dataType = 'blob' : 'Document' in t && d instanceof Document ? y.dataType = 'document' : 'FormData' in t && d instanceof FormData && (y.dataType = 'formdata'), null !== d) switch (y.dataType) {
						case 'json':
							d = JSON.stringify(d);
							break;
						case 'post':
							d = r(d);
					}
					if (y.headers) {
						var P = function P(e, t, n) {
							return t + n.toUpperCase();
						};
						for (x in y.headers) {
							D[x.replace(/(^|-)([^-])/g, P)] = y.headers[x];
						}
					}
					return 'Content-Type' in D || 'GET' == e || y.dataType in E && E[y.dataType] && (D['Content-Type'] = E[y.dataType]), D.Accept || (D.Accept = y.responseType in M ? M[y.responseType] : '*/*'), w || 'X-Requested-With' in D || (D['X-Requested-With'] = 'XMLHttpRequest'), y.cache || 'Cache-Control' in D || (D['Cache-Control'] = 'no-cache'), 'GET' == e && d && 'string' == typeof d && (_l += (/\?/.test(_l) ? '&' : '?') + d), y.async && L.send(), L;
				},
				    d = function d(e) {
					var t = [],
					    r = 0,
					    o = [];
					return n(function (n) {
						var i = -1,
						    s = function s(e) {
							return function (s, a, u, p) {
								var f = ++i;
								return ++r, t.push(l(e, n.base + s, a, u, p).then(function (e, t) {
									o[f] = arguments, --r || n(!0, 1 == o.length ? o[0] : [o]);
								}, function () {
									n(!1, arguments);
								})), n;
							};
						};
						n.get = s('GET'), n.post = s('POST'), n.put = s('PUT'), n['delete'] = s('DELETE'), n['catch'] = function (e) {
							return n.then(null, e);
						}, n.complete = function (e) {
							var t = function t() {
								e();
							};
							return n.then(t, t);
						}, n.map = function (e, t, n, r, o) {
							return s(e.toUpperCase()).call(this, t, n, r, o);
						};
						for (var a in e) {
							a in n || (n[a] = e[a]);
						}return n.send = function () {
							for (var e = 0, r = t.length; r > e; ++e) {
								t[e].send();
							}return n;
						}, n.abort = function () {
							for (var e = 0, r = t.length; r > e; ++e) {
								t[e].abort();
							}return n;
						}, n;
					});
				},
				    y = {
					base: '',
					get: function get() {
						return d(y).get.apply(this, arguments);
					},
					post: function post() {
						return d(y).post.apply(this, arguments);
					},
					put: function put() {
						return d(y).put.apply(this, arguments);
					},
					delete: function _delete() {
						return d(y)['delete'].apply(this, arguments);
					},
					map: function map() {
						return d(y).map.apply(this, arguments);
					},
					xhr2: c,
					limit: function limit(e) {
						return a = e, y;
					},
					setDefaultOptions: function setDefaultOptions(e) {
						return o = e, y;
					},
					setDefaultXdrResponseType: function setDefaultXdrResponseType(e) {
						return i = e.toLowerCase(), y;
					},
					setDefaultDataType: function setDefaultDataType(e) {
						return s = e.toLowerCase(), y;
					},
					getOpenRequests: function getOpenRequests() {
						return u;
					}
				};
				return y;
			}();
		}, { 'jquery-param': 1, pinkyswear: 2 }]
	}, {}, [1, 2])('qwest');
});
/*! FEATURE.JS 1.0.0, http://featurejs.com */
!function (e, t, n) {
	'use strict';

	var r = t.documentElement,
	    i = {
		create: function create(e) {
			return t.createElement(e);
		},
		old: !!/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent),
		pfx: function () {
			var e = t.createElement('dummy').style,
			    r = ['Webkit', 'Moz', 'O', 'ms'],
			    i = {};
			return function (t) {
				if ('undefined' == typeof i[t]) {
					var c = t.charAt(0).toUpperCase() + t.substr(1),
					    a = (t + ' ' + r.join(c + ' ') + c).split(' ');
					i[t] = null;
					for (var o in a) {
						if (e[a[o]] !== n) {
							i[t] = a[o];
							break;
						}
					}
				}
				return i[t];
			};
		}()
	},
	    c = {
		css3Dtransform: function () {
			var e = !i.old && null !== i.pfx('perspective');
			return !!e;
		}(),
		cssTransform: function () {
			var e = !i.old && null !== i.pfx('transformOrigin');
			return !!e;
		}(),
		cssTransition: function () {
			var e = null !== i.pfx('transition');
			return !!e;
		}(),
		addEventListener: !!e.addEventListener,
		querySelectorAll: !!t.querySelectorAll,
		matchMedia: !!e.matchMedia,
		deviceMotion: 'DeviceMotionEvent' in e,
		deviceOrientation: 'DeviceOrientationEvent' in e,
		contextMenu: 'contextMenu' in r && 'HTMLMenuItemElement' in e,
		classList: 'classList' in r,
		placeholder: 'placeholder' in i.create('input'),
		localStorage: function () {
			var e = 'x';
			try {
				return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
			} catch (t) {
				return !1;
			}
		}(),
		historyAPI: e.history && 'pushState' in e.history,
		serviceWorker: 'serviceWorker' in navigator,
		viewportUnit: function (e) {
			try {
				e.style.width = '1vw';
				var t = '' !== e.style.width;
				return !!t;
			} catch (n) {
				return !1;
			}
		}(i.create('dummy')),
		remUnit: function (e) {
			try {
				e.style.width = '1rem';
				var t = '' !== e.style.width;
				return !!t;
			} catch (n) {
				return !1;
			}
		}(i.create('dummy')),
		canvas: function (e) {
			return !(!e.getContext || !e.getContext('2d'));
		}(i.create('canvas')),
		svg: !!t.createElementNS && !!t.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
		webGL: function (t) {
			try {
				return !(!e.WebGLRenderingContext || !t.getContext('webgl') && !t.getContext('experimental-webgl'));
			} catch (n) {
				return !1;
			}
		}(i.create('canvas')),
		cors: 'XMLHttpRequest' in e && 'withCredentials' in new XMLHttpRequest(),
		touch: !!('ontouchstart' in e || e.navigator && e.navigator.msPointerEnabled && e.MSGesture || e.DocumentTouch && t instanceof DocumentTouch),
		async: 'async' in i.create('script'),
		defer: 'defer' in i.create('script'),
		geolocation: 'geolocation' in navigator,
		srcset: 'srcset' in i.create('img'),
		sizes: 'sizes' in i.create('img'),
		pictureElement: 'HTMLPictureElement' in e,
		testAll: function testAll() {
			var e = ' js';
			for (var t in this) {
				'testAll' !== t && 'constructor' !== t && this[t] && (e += ' ' + t);
			}r.className += e.toLowerCase();
		}
	};
	e.feature = c;
}(window, document);
/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function (a) {
	function b(a) {
		var b = a.length,
		    d = c.type(a);
		return 'function' === d || c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : 'array' === d || 0 === b || 'number' == typeof b && b > 0 && b - 1 in a;
	}
	if (!a.jQuery) {
		var c = function c(a, b) {
			return new c.fn.init(a, b);
		};
		c.isWindow = function (a) {
			return null != a && a == a.window;
		}, c.type = function (a) {
			return null == a ? a + '' : 'object' == (typeof a === 'undefined' ? 'undefined' : _typeof(a)) || 'function' == typeof a ? e[g.call(a)] || 'object' : typeof a === 'undefined' ? 'undefined' : _typeof(a);
		}, c.isArray = Array.isArray || function (a) {
			return 'array' === c.type(a);
		}, c.isPlainObject = function (a) {
			var b;
			if (!a || 'object' !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
			try {
				if (a.constructor && !f.call(a, 'constructor') && !f.call(a.constructor.prototype, 'isPrototypeOf')) return !1;
			} catch (d) {
				return !1;
			}
			for (b in a) {}
			return void 0 === b || f.call(a, b);
		}, c.each = function (a, c, d) {
			var e,
			    f = 0,
			    g = a.length,
			    h = b(a);
			if (d) {
				if (h) for (; g > f && (e = c.apply(a[f], d), e !== !1); f++) {} else for (f in a) {
					if (e = c.apply(a[f], d), e === !1) break;
				}
			} else if (h) for (; g > f && (e = c.call(a[f], f, a[f]), e !== !1); f++) {} else for (f in a) {
				if (e = c.call(a[f], f, a[f]), e === !1) break;
			}return a;
		}, c.data = function (a, b, e) {
			if (void 0 === e) {
				var f = a[c.expando],
				    g = f && d[f];
				if (void 0 === b) return g;
				if (g && b in g) return g[b];
			} else if (void 0 !== b) {
				var f = a[c.expando] || (a[c.expando] = ++c.uuid);
				return d[f] = d[f] || {}, d[f][b] = e, e;
			}
		}, c.removeData = function (a, b) {
			var e = a[c.expando],
			    f = e && d[e];
			f && c.each(b, function (a, b) {
				delete f[b];
			});
		}, c.extend = function () {
			var a,
			    b,
			    d,
			    e,
			    f,
			    g,
			    h = arguments[0] || {},
			    i = 1,
			    j = arguments.length,
			    k = !1;
			for ('boolean' == typeof h && (k = h, h = arguments[i] || {}, i++), 'object' != (typeof h === 'undefined' ? 'undefined' : _typeof(h)) && 'function' !== c.type(h) && (h = {}), i === j && (h = this, i--); j > i; i++) {
				if (null != (f = arguments[i])) for (e in f) {
					a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : void 0 !== d && (h[e] = d));
				}
			}return h;
		}, c.queue = function (a, d, e) {
			function f(a, c) {
				var d = c || [];
				return null != a && (b(Object(a)) ? !function (a, b) {
					for (var c = +b.length, d = 0, e = a.length; c > d;) {
						a[e++] = b[d++];
					}if (c !== c) for (; void 0 !== b[d];) {
						a[e++] = b[d++];
					}return a.length = e, a;
				}(d, 'string' == typeof a ? [a] : a) : [].push.call(d, a)), d;
			}
			if (a) {
				d = (d || 'fx') + 'queue';
				var g = c.data(a, d);
				return e ? (!g || c.isArray(e) ? g = c.data(a, d, f(e)) : g.push(e), g) : g || [];
			}
		}, c.dequeue = function (a, b) {
			c.each(a.nodeType ? [a] : a, function (a, d) {
				b = b || 'fx';
				var e = c.queue(d, b),
				    f = e.shift();
				'inprogress' === f && (f = e.shift()), f && ('fx' === b && e.unshift('inprogress'), f.call(d, function () {
					c.dequeue(d, b);
				}));
			});
		}, c.fn = c.prototype = {
			init: function init(a) {
				if (a.nodeType) return this[0] = a, this;
				throw new Error('Not a DOM node.');
			},
			offset: function offset() {
				var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };
				return {
					top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
					left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
				};
			},
			position: function position() {
				function a() {
					for (var a = this.offsetParent || document; a && 'html' === !a.nodeType.toLowerCase && 'static' === a.style.position;) {
						a = a.offsetParent;
					}return a || document;
				}
				var b = this[0],
				    a = a.apply(b),
				    d = this.offset(),
				    e = /^(?:body|html)$/i.test(a.nodeName) ? { top: 0, left: 0 } : c(a).offset();
				return d.top -= parseFloat(b.style.marginTop) || 0, d.left -= parseFloat(b.style.marginLeft) || 0, a.style && (e.top += parseFloat(a.style.borderTopWidth) || 0, e.left += parseFloat(a.style.borderLeftWidth) || 0), { top: d.top - e.top, left: d.left - e.left };
			}
		};
		var d = {};
		c.expando = 'velocity' + new Date().getTime(), c.uuid = 0;
		for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = 'Boolean Number String Function Array Date RegExp Object Error'.split(' '), i = 0; i < h.length; i++) {
			e['[object ' + h[i] + ']'] = h[i].toLowerCase();
		}c.fn.init.prototype = c.fn, a.Velocity = { Utilities: c };
	}
}(window), function (a) {
	'object' == (typeof module === 'undefined' ? 'undefined' : _typeof(module)) && 'object' == _typeof(module.exports) ? module.exports = a() : 'function' == typeof define && define.amd ? define(a) : a();
}(function () {
	return function (a, b, c, d) {
		function e(a) {
			for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
				var e = a[b];
				e && d.push(e);
			}
			return d;
		}
		function f(a) {
			return p.isWrapped(a) ? a = [].slice.call(a) : p.isNode(a) && (a = [a]), a;
		}
		function g(a) {
			var b = m.data(a, 'velocity');
			return null === b ? d : b;
		}
		function h(a) {
			return function (b) {
				return Math.round(b * a) * (1 / a);
			};
		}
		function i(a, c, d, e) {
			function f(a, b) {
				return 1 - 3 * b + 3 * a;
			}
			function g(a, b) {
				return 3 * b - 6 * a;
			}
			function h(a) {
				return 3 * a;
			}
			function i(a, b, c) {
				return ((f(b, c) * a + g(b, c)) * a + h(b)) * a;
			}
			function j(a, b, c) {
				return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b);
			}
			function k(b, c) {
				for (var e = 0; p > e; ++e) {
					var f = j(c, a, d);
					if (0 === f) return c;
					var g = i(c, a, d) - b;
					c -= g / f;
				}
				return c;
			}
			function l() {
				for (var b = 0; t > b; ++b) {
					x[b] = i(b * u, a, d);
				}
			}
			function m(b, c, e) {
				var f,
				    g,
				    h = 0;
				do {
					g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g;
				} while (Math.abs(f) > r && ++h < s);
				return g;
			}
			function n(b) {
				for (var c = 0, e = 1, f = t - 1; e != f && x[e] <= b; ++e) {
					c += u;
				}--e;
				var g = (b - x[e]) / (x[e + 1] - x[e]),
				    h = c + g * u,
				    i = j(h, a, d);
				return i >= q ? k(b, h) : 0 == i ? h : m(b, c, c + u);
			}
			function o() {
				y = !0, (a != c || d != e) && l();
			}
			var p = 4,
			    q = 0.001,
			    r = 1e-7,
			    s = 10,
			    t = 11,
			    u = 1 / (t - 1),
			    v = 'Float32Array' in b;
			if (4 !== arguments.length) return !1;
			for (var w = 0; 4 > w; ++w) {
				if ('number' != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
			}a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);
			var x = v ? new Float32Array(t) : new Array(t),
			    y = !1,
			    z = function z(b) {
				return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e);
			};
			z.getControlPoints = function () {
				return [{ x: a, y: c }, { x: d, y: e }];
			};
			var A = 'generateBezier(' + [a, c, d, e] + ')';
			return z.toString = function () {
				return A;
			}, z;
		}
		function j(a, b) {
			var c = a;
			return p.isString(a) ? t.Easings[a] || (c = !1) : c = p.isArray(a) && 1 === a.length ? h.apply(null, a) : p.isArray(a) && 2 === a.length ? u.apply(null, a.concat([b])) : p.isArray(a) && 4 === a.length ? i.apply(null, a) : !1, c === !1 && (c = t.Easings[t.defaults.easing] ? t.defaults.easing : s), c;
		}
		function k(a) {
			if (a) {
				var b = new Date().getTime(),
				    c = t.State.calls.length;
				c > 1e4 && (t.State.calls = e(t.State.calls));
				for (var f = 0; c > f; f++) {
					if (t.State.calls[f]) {
						var h = t.State.calls[f],
						    i = h[0],
						    j = h[2],
						    n = h[3],
						    o = !!n,
						    q = null;
						n || (n = t.State.calls[f][3] = b - 16);
						for (var r = Math.min((b - n) / j.duration, 1), s = 0, u = i.length; u > s; s++) {
							var w = i[s],
							    y = w.element;
							if (g(y)) {
								var z = !1;
								if (j.display !== d && null !== j.display && 'none' !== j.display) {
									if ('flex' === j.display) {
										var A = ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex'];
										m.each(A, function (a, b) {
											v.setPropertyValue(y, 'display', b);
										});
									}
									v.setPropertyValue(y, 'display', j.display);
								}
								j.visibility !== d && 'hidden' !== j.visibility && v.setPropertyValue(y, 'visibility', j.visibility);
								for (var B in w) {
									if ('element' !== B) {
										var C,
										    D = w[B],
										    E = p.isString(D.easing) ? t.Easings[D.easing] : D.easing;
										if (1 === r) C = D.endValue;else {
											var F = D.endValue - D.startValue;
											if (C = D.startValue + F * E(r, j, F), !o && C === D.currentValue) continue;
										}
										if (D.currentValue = C, 'tween' === B) q = C;else {
											if (v.Hooks.registered[B]) {
												var G = v.Hooks.getRoot(B),
												    H = g(y).rootPropertyValueCache[G];
												H && (D.rootPropertyValue = H);
											}
											var I = v.setPropertyValue(y, B, D.currentValue + (0 === parseFloat(C) ? '' : D.unitType), D.rootPropertyValue, D.scrollData);
											v.Hooks.registered[B] && (g(y).rootPropertyValueCache[G] = v.Normalizations.registered[G] ? v.Normalizations.registered[G]('extract', null, I[1]) : I[1]), 'transform' === I[0] && (z = !0);
										}
									}
								}j.mobileHA && g(y).transformCache.translate3d === d && (g(y).transformCache.translate3d = '(0px, 0px, 0px)', z = !0), z && v.flushTransformCache(y);
							}
						}
						j.display !== d && 'none' !== j.display && (t.State.calls[f][2].display = !1), j.visibility !== d && 'hidden' !== j.visibility && (t.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], r, Math.max(0, n + j.duration - b), n, q), 1 === r && l(f);
					}
				}
			}
			t.State.isTicking && x(k);
		}
		function l(a, b) {
			if (!t.State.calls[a]) return !1;
			for (var c = t.State.calls[a][0], e = t.State.calls[a][1], f = t.State.calls[a][2], h = t.State.calls[a][4], i = !1, j = 0, k = c.length; k > j; j++) {
				var l = c[j].element;
				if (b || f.loop || ('none' === f.display && v.setPropertyValue(l, 'display', f.display), 'hidden' === f.visibility && v.setPropertyValue(l, 'visibility', f.visibility)), f.loop !== !0 && (m.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(m.queue(l)[1])) && g(l)) {
					g(l).isAnimating = !1, g(l).rootPropertyValueCache = {};
					var n = !1;
					m.each(v.Lists.transforms3D, function (a, b) {
						var c = /^scale/.test(b) ? 1 : 0,
						    e = g(l).transformCache[b];
						g(l).transformCache[b] !== d && new RegExp('^\\(' + c + '[^.]').test(e) && (n = !0, delete g(l).transformCache[b]);
					}), f.mobileHA && (n = !0, delete g(l).transformCache.translate3d), n && v.flushTransformCache(l), v.Values.removeClass(l, 'velocity-animating');
				}
				if (!b && f.complete && !f.loop && j === k - 1) try {
					f.complete.call(e, e);
				} catch (o) {
					setTimeout(function () {
						throw o;
					}, 1);
				}
				h && f.loop !== !0 && h(e), g(l) && f.loop === !0 && !b && (m.each(g(l).tweensContainer, function (a, b) {
					/^rotate/.test(a) && 360 === parseFloat(b.endValue) && (b.endValue = 0, b.startValue = 360), /^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && '%' === b.unitType && (b.endValue = 0, b.startValue = 100);
				}), t(l, 'reverse', { loop: !0, delay: f.delay })), f.queue !== !1 && m.dequeue(l, f.queue);
			}
			t.State.calls[a] = !1;
			for (var p = 0, q = t.State.calls.length; q > p; p++) {
				if (t.State.calls[p] !== !1) {
					i = !0;
					break;
				}
			}i === !1 && (t.State.isTicking = !1, delete t.State.calls, t.State.calls = []);
		}
		var m,
		    n = function () {
			if (c.documentMode) return c.documentMode;
			for (var a = 7; a > 4; a--) {
				var b = c.createElement('div');
				if (b.innerHTML = '<!--[if IE ' + a + ']><span></span><![endif]-->', b.getElementsByTagName('span').length) return b = null, a;
			}
			return d;
		}(),
		    o = function () {
			var a = 0;
			return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function (b) {
				var c,
				    d = new Date().getTime();
				return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function () {
					b(d + c);
				}, c);
			};
		}(),
		    p = {
			isString: function isString(a) {
				return 'string' == typeof a;
			},
			isArray: Array.isArray || function (a) {
				return '[object Array]' === Object.prototype.toString.call(a);
			},
			isFunction: function isFunction(a) {
				return '[object Function]' === Object.prototype.toString.call(a);
			},
			isNode: function isNode(a) {
				return a && a.nodeType;
			},
			isNodeList: function isNodeList(a) {
				return 'object' == (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== d && (0 === a.length || 'object' == _typeof(a[0]) && a[0].nodeType > 0);
			},
			isWrapped: function isWrapped(a) {
				return a && (a.jquery || b.Zepto && b.Zepto.zepto.isZ(a));
			},
			isSVG: function isSVG(a) {
				return b.SVGElement && a instanceof b.SVGElement;
			},
			isEmptyObject: function isEmptyObject(a) {
				for (var b in a) {
					return !1;
				}return !0;
			}
		},
		    q = !1;
		if (a.fn && a.fn.jquery ? (m = a, q = !0) : m = b.Velocity.Utilities, 8 >= n && !q) throw new Error('Velocity: IE8 and below require jQuery to be loaded before Velocity.');
		if (7 >= n) return void (jQuery.fn.velocity = jQuery.fn.animate);
		var r = 400,
		    s = 'swing',
		    t = {
			State: {
				isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
				isAndroid: /Android/i.test(navigator.userAgent),
				isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
				isChrome: b.chrome,
				isFirefox: /Firefox/i.test(navigator.userAgent),
				prefixElement: c.createElement('div'),
				prefixMatches: {},
				scrollAnchor: null,
				scrollPropertyLeft: null,
				scrollPropertyTop: null,
				isTicking: !1,
				calls: []
			},
			CSS: {},
			Utilities: m,
			Redirects: {},
			Easings: {},
			Promise: b.Promise,
			defaults: {
				queue: '',
				duration: r,
				easing: s,
				begin: d,
				complete: d,
				progress: d,
				display: d,
				visibility: d,
				loop: !1,
				delay: !1,
				mobileHA: !0,
				_cacheValues: !0
			},
			init: function init(a) {
				m.data(a, 'velocity', {
					isSVG: p.isSVG(a),
					isAnimating: !1,
					computedStyle: null,
					tweensContainer: null,
					rootPropertyValueCache: {},
					transformCache: {}
				});
			},
			hook: null,
			mock: !1,
			version: { major: 1, minor: 2, patch: 2 },
			debug: !1
		};
		b.pageYOffset !== d ? (t.State.scrollAnchor = b, t.State.scrollPropertyLeft = 'pageXOffset', t.State.scrollPropertyTop = 'pageYOffset') : (t.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, t.State.scrollPropertyLeft = 'scrollLeft', t.State.scrollPropertyTop = 'scrollTop');
		var u = function () {
			function a(a) {
				return -a.tension * a.x - a.friction * a.v;
			}
			function b(b, c, d) {
				var e = { x: b.x + d.dx * c, v: b.v + d.dv * c, tension: b.tension, friction: b.friction };
				return { dx: e.v, dv: a(e) };
			}
			function c(c, d) {
				var e = { dx: c.v, dv: a(c) },
				    f = b(c, 0.5 * d, e),
				    g = b(c, 0.5 * d, f),
				    h = b(c, d, g),
				    i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
				    j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
				return c.x = c.x + i * d, c.v = c.v + j * d, c;
			}
			return function d(a, b, e) {
				var f,
				    g,
				    h,
				    i = { x: -1, v: 0, tension: null, friction: null },
				    j = [0],
				    k = 0,
				    l = 1e-4,
				    m = 0.016;
				for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * m) : g = m;;) {
					if (h = c(h || i, g), j.push(1 + h.x), k += 16, !(Math.abs(h.x) > l && Math.abs(h.v) > l)) break;
				}return f ? function (a) {
					return j[a * (j.length - 1) | 0];
				} : k;
			};
		}();
		t.Easings = {
			linear: function linear(a) {
				return a;
			},
			swing: function swing(a) {
				return 0.5 - Math.cos(a * Math.PI) / 2;
			},
			spring: function spring(a) {
				return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a);
			}
		}, m.each([['ease', [0.25, 0.1, 0.25, 1]], ['ease-in', [0.42, 0, 1, 1]], ['ease-out', [0, 0, 0.58, 1]], ['ease-in-out', [0.42, 0, 0.58, 1]], ['easeInSine', [0.47, 0, 0.745, 0.715]], ['easeOutSine', [0.39, 0.575, 0.565, 1]], ['easeInOutSine', [0.445, 0.05, 0.55, 0.95]], ['easeInQuad', [0.55, 0.085, 0.68, 0.53]], ['easeOutQuad', [0.25, 0.46, 0.45, 0.94]], ['easeInOutQuad', [0.455, 0.03, 0.515, 0.955]], ['easeInCubic', [0.55, 0.055, 0.675, 0.19]], ['easeOutCubic', [0.215, 0.61, 0.355, 1]], ['easeInOutCubic', [0.645, 0.045, 0.355, 1]], ['easeInQuart', [0.895, 0.03, 0.685, 0.22]], ['easeOutQuart', [0.165, 0.84, 0.44, 1]], ['easeInOutQuart', [0.77, 0, 0.175, 1]], ['easeInQuint', [0.755, 0.05, 0.855, 0.06]], ['easeOutQuint', [0.23, 1, 0.32, 1]], ['easeInOutQuint', [0.86, 0, 0.07, 1]], ['easeInExpo', [0.95, 0.05, 0.795, 0.035]], ['easeOutExpo', [0.19, 1, 0.22, 1]], ['easeInOutExpo', [1, 0, 0, 1]], ['easeInCirc', [0.6, 0.04, 0.98, 0.335]], ['easeOutCirc', [0.075, 0.82, 0.165, 1]], ['easeInOutCirc', [0.785, 0.135, 0.15, 0.86]]], function (a, b) {
			t.Easings[b[0]] = i.apply(null, b[1]);
		});
		var v = t.CSS = {
			RegEx: {
				isHex: /^#([A-f\d]{3}){1,2}$/i,
				valueUnwrap: /^[A-z]+\((.*)\)$/i,
				wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
				valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
			},
			Lists: {
				colors: ['fill', 'stroke', 'stopColor', 'color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'],
				transformsBase: ['translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotateZ'],
				transforms3D: ['transformPerspective', 'translateZ', 'scaleZ', 'rotateX', 'rotateY']
			},
			Hooks: {
				templates: {
					textShadow: ['Color X Y Blur', 'black 0px 0px 0px'],
					boxShadow: ['Color X Y Blur Spread', 'black 0px 0px 0px 0px'],
					clip: ['Top Right Bottom Left', '0px 0px 0px 0px'],
					backgroundPosition: ['X Y', '0% 0%'],
					transformOrigin: ['X Y Z', '50% 50% 0px'],
					perspectiveOrigin: ['X Y', '50% 50%']
				},
				registered: {},
				register: function register() {
					for (var a = 0; a < v.Lists.colors.length; a++) {
						var b = 'color' === v.Lists.colors[a] ? '0 0 0 1' : '255 255 255 1';
						v.Hooks.templates[v.Lists.colors[a]] = ['Red Green Blue Alpha', b];
					}
					var c, d, e;
					if (n) for (c in v.Hooks.templates) {
						d = v.Hooks.templates[c], e = d[0].split(' ');
						var f = d[1].match(v.RegEx.valueSplit);
						'Color' === e[0] && (e.push(e.shift()), f.push(f.shift()), v.Hooks.templates[c] = [e.join(' '), f.join(' ')]);
					}
					for (c in v.Hooks.templates) {
						d = v.Hooks.templates[c], e = d[0].split(' ');
						for (var a in e) {
							var g = c + e[a],
							    h = a;
							v.Hooks.registered[g] = [c, h];
						}
					}
				},
				getRoot: function getRoot(a) {
					var b = v.Hooks.registered[a];
					return b ? b[0] : a;
				},
				cleanRootPropertyValue: function cleanRootPropertyValue(a, b) {
					return v.RegEx.valueUnwrap.test(b) && (b = b.match(v.RegEx.valueUnwrap)[1]), v.Values.isCSSNullValue(b) && (b = v.Hooks.templates[a][1]), b;
				},
				extractValue: function extractValue(a, b) {
					var c = v.Hooks.registered[a];
					if (c) {
						var d = c[0],
						    e = c[1];
						return b = v.Hooks.cleanRootPropertyValue(d, b), b.toString().match(v.RegEx.valueSplit)[e];
					}
					return b;
				},
				injectValue: function injectValue(a, b, c) {
					var d = v.Hooks.registered[a];
					if (d) {
						var e,
						    f,
						    g = d[0],
						    h = d[1];
						return c = v.Hooks.cleanRootPropertyValue(g, c), e = c.toString().match(v.RegEx.valueSplit), e[h] = b, f = e.join(' ');
					}
					return c;
				}
			},
			Normalizations: {
				registered: {
					clip: function clip(a, b, c) {
						switch (a) {
							case 'name':
								return 'clip';
							case 'extract':
								var d;
								return v.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(v.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, ' ') : c), d;
							case 'inject':
								return 'rect(' + c + ')';
						}
					},
					blur: function blur(a, b, c) {
						switch (a) {
							case 'name':
								return t.State.isFirefox ? 'filter' : '-webkit-filter';
							case 'extract':
								var d = parseFloat(c);
								if (!d && 0 !== d) {
									var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
									d = e ? e[1] : 0;
								}
								return d;
							case 'inject':
								return parseFloat(c) ? 'blur(' + c + ')' : 'none';
						}
					},
					opacity: function opacity(a, b, c) {
						if (8 >= n) switch (a) {
							case 'name':
								return 'filter';
							case 'extract':
								var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
								return c = d ? d[1] / 100 : 1;
							case 'inject':
								return b.style.zoom = 1, parseFloat(c) >= 1 ? '' : 'alpha(opacity=' + parseInt(100 * parseFloat(c), 10) + ')';
						} else switch (a) {
							case 'name':
								return 'opacity';
							case 'extract':
								return c;
							case 'inject':
								return c;
						}
					}
				},
				register: function register() {
					9 >= n || t.State.isGingerbread || (v.Lists.transformsBase = v.Lists.transformsBase.concat(v.Lists.transforms3D));
					for (var a = 0; a < v.Lists.transformsBase.length; a++) {
						!function () {
							var b = v.Lists.transformsBase[a];
							v.Normalizations.registered[b] = function (a, c, e) {
								switch (a) {
									case 'name':
										return 'transform';
									case 'extract':
										return g(c) === d || g(c).transformCache[b] === d ? /^scale/i.test(b) ? 1 : 0 : g(c).transformCache[b].replace(/[()]/g, '');
									case 'inject':
										var f = !1;
										switch (b.substr(0, b.length - 1)) {
											case 'translate':
												f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);
												break;
											case 'scal':
											case 'scale':
												t.State.isAndroid && g(c).transformCache[b] === d && 1 > e && (e = 1), f = !/(\d)$/i.test(e);
												break;
											case 'skew':
												f = !/(deg|\d)$/i.test(e);
												break;
											case 'rotate':
												f = !/(deg|\d)$/i.test(e);
										}
										return f || (g(c).transformCache[b] = '(' + e + ')'), g(c).transformCache[b];
								}
							};
						}();
					}for (var a = 0; a < v.Lists.colors.length; a++) {
						!function () {
							var b = v.Lists.colors[a];
							v.Normalizations.registered[b] = function (a, c, e) {
								switch (a) {
									case 'name':
										return b;
									case 'extract':
										var f;
										if (v.RegEx.wrappedValueAlreadyExtracted.test(e)) f = e;else {
											var g,
											    h = {
												black: 'rgb(0, 0, 0)',
												blue: 'rgb(0, 0, 255)',
												gray: 'rgb(128, 128, 128)',
												green: 'rgb(0, 128, 0)',
												red: 'rgb(255, 0, 0)',
												white: 'rgb(255, 255, 255)'
											};
											/^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : v.RegEx.isHex.test(e) ? g = 'rgb(' + v.Values.hexToRgb(e).join(' ') + ')' : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, ' ');
										}
										return 8 >= n || 3 !== f.split(' ').length || (f += ' 1'), f;
									case 'inject':
										return 8 >= n ? 4 === e.split(' ').length && (e = e.split(/\s+/).slice(0, 3).join(' ')) : 3 === e.split(' ').length && (e += ' 1'), (8 >= n ? 'rgb' : 'rgba') + '(' + e.replace(/\s+/g, ',').replace(/\.(\d)+(?=,)/g, '') + ')';
								}
							};
						}();
					}
				}
			},
			Names: {
				camelCase: function camelCase(a) {
					return a.replace(/-(\w)/g, function (a, b) {
						return b.toUpperCase();
					});
				},
				SVGAttribute: function SVGAttribute(a) {
					var b = 'width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2';
					return (n || t.State.isAndroid && !t.State.isChrome) && (b += '|transform'), new RegExp('^(' + b + ')$', 'i').test(a);
				},
				prefixCheck: function prefixCheck(a) {
					if (t.State.prefixMatches[a]) return [t.State.prefixMatches[a], !0];
					for (var b = ['', 'Webkit', 'Moz', 'ms', 'O'], c = 0, d = b.length; d > c; c++) {
						var e;
						if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function (a) {
							return a.toUpperCase();
						}), p.isString(t.State.prefixElement.style[e])) return t.State.prefixMatches[a] = e, [e, !0];
					}
					return [a, !1];
				}
			},
			Values: {
				hexToRgb: function hexToRgb(a) {
					var b,
					    c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
					    d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
					return a = a.replace(c, function (a, b, c, d) {
						return b + b + c + c + d + d;
					}), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0];
				},
				isCSSNullValue: function isCSSNullValue(a) {
					return 0 == a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a);
				},
				getUnitType: function getUnitType(a) {
					return (/^(rotate|skew)/i.test(a) ? 'deg' : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? '' : 'px'
					);
				},
				getDisplayType: function getDisplayType(a) {
					var b = a && a.tagName.toString().toLowerCase();
					return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? 'inline' : /^(li)$/i.test(b) ? 'list-item' : /^(tr)$/i.test(b) ? 'table-row' : /^(table)$/i.test(b) ? 'table' : /^(tbody)$/i.test(b) ? 'table-row-group' : 'block'
					);
				},
				addClass: function addClass(a, b) {
					a.classList ? a.classList.add(b) : a.className += (a.className.length ? ' ' : '') + b;
				},
				removeClass: function removeClass(a, b) {
					a.classList ? a.classList.remove(b) : a.className = a.className.toString().replace(new RegExp('(^|\\s)' + b.split(' ').join('|') + '(\\s|$)', 'gi'), ' ');
				}
			},
			getPropertyValue: function getPropertyValue(a, c, e, f) {
				function h(a, c) {
					function e() {
						j && v.setPropertyValue(a, 'display', 'none');
					}
					var i = 0;
					if (8 >= n) i = m.css(a, c);else {
						var j = !1;
						if (/^(width|height)$/.test(c) && 0 === v.getPropertyValue(a, 'display') && (j = !0, v.setPropertyValue(a, 'display', v.Values.getDisplayType(a))), !f) {
							if ('height' === c && 'border-box' !== v.getPropertyValue(a, 'boxSizing').toString().toLowerCase()) {
								var k = a.offsetHeight - (parseFloat(v.getPropertyValue(a, 'borderTopWidth')) || 0) - (parseFloat(v.getPropertyValue(a, 'borderBottomWidth')) || 0) - (parseFloat(v.getPropertyValue(a, 'paddingTop')) || 0) - (parseFloat(v.getPropertyValue(a, 'paddingBottom')) || 0);
								return e(), k;
							}
							if ('width' === c && 'border-box' !== v.getPropertyValue(a, 'boxSizing').toString().toLowerCase()) {
								var l = a.offsetWidth - (parseFloat(v.getPropertyValue(a, 'borderLeftWidth')) || 0) - (parseFloat(v.getPropertyValue(a, 'borderRightWidth')) || 0) - (parseFloat(v.getPropertyValue(a, 'paddingLeft')) || 0) - (parseFloat(v.getPropertyValue(a, 'paddingRight')) || 0);
								return e(), l;
							}
						}
						var o;
						o = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), 'borderColor' === c && (c = 'borderTopColor'), i = 9 === n && 'filter' === c ? o.getPropertyValue(c) : o[c], ('' === i || null === i) && (i = a.style[c]), e();
					}
					if ('auto' === i && /^(top|right|bottom|left)$/i.test(c)) {
						var p = h(a, 'position');
						('fixed' === p || 'absolute' === p && /top|left/i.test(c)) && (i = m(a).position()[c] + 'px');
					}
					return i;
				}
				var i;
				if (v.Hooks.registered[c]) {
					var j = c,
					    k = v.Hooks.getRoot(j);
					e === d && (e = v.getPropertyValue(a, v.Names.prefixCheck(k)[0])), v.Normalizations.registered[k] && (e = v.Normalizations.registered[k]('extract', a, e)), i = v.Hooks.extractValue(j, e);
				} else if (v.Normalizations.registered[c]) {
					var l, o;
					l = v.Normalizations.registered[c]('name', a), 'transform' !== l && (o = h(a, v.Names.prefixCheck(l)[0]), v.Values.isCSSNullValue(o) && v.Hooks.templates[c] && (o = v.Hooks.templates[c][1])), i = v.Normalizations.registered[c]('extract', a, o);
				}
				if (!/^[\d-]/.test(i)) if (g(a) && g(a).isSVG && v.Names.SVGAttribute(c)) {
					if (/^(height|width)$/i.test(c)) try {
						i = a.getBBox()[c];
					} catch (p) {
						i = 0;
					} else i = a.getAttribute(c);
				} else i = h(a, v.Names.prefixCheck(c)[0]);
				return v.Values.isCSSNullValue(i) && (i = 0), t.debug >= 2 && console.log('Get ' + c + ': ' + i), i;
			},
			setPropertyValue: function setPropertyValue(a, c, d, e, f) {
				var h = c;
				if ('scroll' === c) f.container ? f.container['scroll' + f.direction] = d : 'Left' === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);else if (v.Normalizations.registered[c] && 'transform' === v.Normalizations.registered[c]('name', a)) v.Normalizations.registered[c]('inject', a, d), h = 'transform', d = g(a).transformCache[c];else {
					if (v.Hooks.registered[c]) {
						var i = c,
						    j = v.Hooks.getRoot(c);
						e = e || v.getPropertyValue(a, j), d = v.Hooks.injectValue(i, d, e), c = j;
					}
					if (v.Normalizations.registered[c] && (d = v.Normalizations.registered[c]('inject', a, d), c = v.Normalizations.registered[c]('name', a)), h = v.Names.prefixCheck(c)[0], 8 >= n) try {
						a.style[h] = d;
					} catch (k) {
						t.debug && console.log('Browser does not support [' + d + '] for [' + h + ']');
					} else g(a) && g(a).isSVG && v.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d;
					t.debug >= 2 && console.log('Set ' + c + ' (' + h + '): ' + d);
				}
				return [h, d];
			},
			flushTransformCache: function flushTransformCache(a) {
				function b(b) {
					return parseFloat(v.getPropertyValue(a, b));
				}
				var c = '';
				if ((n || t.State.isAndroid && !t.State.isChrome) && g(a).isSVG) {
					var d = {
						translate: [b('translateX'), b('translateY')],
						skewX: [b('skewX')],
						skewY: [b('skewY')],
						scale: 1 !== b('scale') ? [b('scale'), b('scale')] : [b('scaleX'), b('scaleY')],
						rotate: [b('rotateZ'), 0, 0]
					};
					m.each(g(a).transformCache, function (a) {
						/^translate/i.test(a) ? a = 'translate' : /^scale/i.test(a) ? a = 'scale' : /^rotate/i.test(a) && (a = 'rotate'), d[a] && (c += a + '(' + d[a].join(' ') + ') ', delete d[a]);
					});
				} else {
					var e, f;
					m.each(g(a).transformCache, function (b) {
						return e = g(a).transformCache[b], 'transformPerspective' === b ? (f = e, !0) : (9 === n && 'rotateZ' === b && (b = 'rotate'), void (c += b + e + ' '));
					}), f && (c = 'perspective' + f + ' ' + c);
				}
				v.setPropertyValue(a, 'transform', c);
			}
		};
		v.Hooks.register(), v.Normalizations.register(), t.hook = function (a, b, c) {
			var e = d;
			return a = f(a), m.each(a, function (a, f) {
				if (g(f) === d && t.init(f), c === d) e === d && (e = t.CSS.getPropertyValue(f, b));else {
					var h = t.CSS.setPropertyValue(f, b, c);
					'transform' === h[0] && t.CSS.flushTransformCache(f), e = h;
				}
			}), e;
		};
		var w = function w() {
			function a() {
				return h ? B.promise || null : i;
			}
			function e() {
				function a() {
					function a(a, b) {
						var c = d,
						    e = d,
						    g = d;
						return p.isArray(a) ? (c = a[0], !p.isArray(a[1]) && /^[\d-]/.test(a[1]) || p.isFunction(a[1]) || v.RegEx.isHex.test(a[1]) ? g = a[1] : (p.isString(a[1]) && !v.RegEx.isHex.test(a[1]) || p.isArray(a[1])) && (e = b ? a[1] : j(a[1], h.duration), a[2] !== d && (g = a[2]))) : c = a, b || (e = e || h.easing), p.isFunction(c) && (c = c.call(f, y, x)), p.isFunction(g) && (g = g.call(f, y, x)), [c || 0, e, g];
					}
					function l(a, b) {
						var c, d;
						return d = (b || '0').toString().toLowerCase().replace(/[%A-z]+$/, function (a) {
							return c = a, '';
						}), c || (c = v.Values.getUnitType(a)), [d, c];
					}
					function n() {
						var a = {
							myParent: f.parentNode || c.body,
							position: v.getPropertyValue(f, 'position'),
							fontSize: v.getPropertyValue(f, 'fontSize')
						},
						    d = a.position === I.lastPosition && a.myParent === I.lastParent,
						    e = a.fontSize === I.lastFontSize;
						I.lastParent = a.myParent, I.lastPosition = a.position, I.lastFontSize = a.fontSize;
						var h = 100,
						    i = {};
						if (e && d) i.emToPx = I.lastEmToPx, i.percentToPxWidth = I.lastPercentToPxWidth, i.percentToPxHeight = I.lastPercentToPxHeight;else {
							var j = g(f).isSVG ? c.createElementNS('http://www.w3.org/2000/svg', 'rect') : c.createElement('div');
							t.init(j), a.myParent.appendChild(j), m.each(['overflow', 'overflowX', 'overflowY'], function (a, b) {
								t.CSS.setPropertyValue(j, b, 'hidden');
							}), t.CSS.setPropertyValue(j, 'position', a.position), t.CSS.setPropertyValue(j, 'fontSize', a.fontSize), t.CSS.setPropertyValue(j, 'boxSizing', 'content-box'), m.each(['minWidth', 'maxWidth', 'width', 'minHeight', 'maxHeight', 'height'], function (a, b) {
								t.CSS.setPropertyValue(j, b, h + '%');
							}), t.CSS.setPropertyValue(j, 'paddingLeft', h + 'em'), i.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(v.getPropertyValue(j, 'width', null, !0)) || 1) / h, i.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(v.getPropertyValue(j, 'height', null, !0)) || 1) / h, i.emToPx = I.lastEmToPx = (parseFloat(v.getPropertyValue(j, 'paddingLeft')) || 1) / h, a.myParent.removeChild(j);
						}
						return null === I.remToPx && (I.remToPx = parseFloat(v.getPropertyValue(c.body, 'fontSize')) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(b.innerWidth) / 100, I.vhToPx = parseFloat(b.innerHeight) / 100), i.remToPx = I.remToPx, i.vwToPx = I.vwToPx, i.vhToPx = I.vhToPx, t.debug >= 1 && console.log('Unit ratios: ' + JSON.stringify(i), f), i;
					}
					if (h.begin && 0 === y) try {
						h.begin.call(o, o);
					} catch (r) {
						setTimeout(function () {
							throw r;
						}, 1);
					}
					if ('scroll' === C) {
						var u,
						    w,
						    z,
						    A = /^x$/i.test(h.axis) ? 'Left' : 'Top',
						    D = parseFloat(h.offset) || 0;
						h.container ? p.isWrapped(h.container) || p.isNode(h.container) ? (h.container = h.container[0] || h.container, u = h.container['scroll' + A], z = u + m(f).position()[A.toLowerCase()] + D) : h.container = null : (u = t.State.scrollAnchor[t.State['scrollProperty' + A]], w = t.State.scrollAnchor[t.State['scrollProperty' + ('Left' === A ? 'Top' : 'Left')]], z = m(f).offset()[A.toLowerCase()] + D), i = {
							scroll: {
								rootPropertyValue: !1,
								startValue: u,
								currentValue: u,
								endValue: z,
								unitType: '',
								easing: h.easing,
								scrollData: { container: h.container, direction: A, alternateValue: w }
							},
							element: f
						}, t.debug && console.log('tweensContainer (scroll): ', i.scroll, f);
					} else if ('reverse' === C) {
						if (!g(f).tweensContainer) return void m.dequeue(f, h.queue);
						'none' === g(f).opts.display && (g(f).opts.display = 'auto'), 'hidden' === g(f).opts.visibility && (g(f).opts.visibility = 'visible'), g(f).opts.loop = !1, g(f).opts.begin = null, g(f).opts.complete = null, s.easing || delete h.easing, s.duration || delete h.duration, h = m.extend({}, g(f).opts, h);
						var E = m.extend(!0, {}, g(f).tweensContainer);
						for (var F in E) {
							if ('element' !== F) {
								var G = E[F].startValue;
								E[F].startValue = E[F].currentValue = E[F].endValue, E[F].endValue = G, p.isEmptyObject(s) || (E[F].easing = h.easing), t.debug && console.log('reverse tweensContainer (' + F + '): ' + JSON.stringify(E[F]), f);
							}
						}i = E;
					} else if ('start' === C) {
						var E;
						g(f).tweensContainer && g(f).isAnimating === !0 && (E = g(f).tweensContainer), m.each(q, function (b, c) {
							if (RegExp('^' + v.Lists.colors.join('$|^') + '$').test(b)) {
								var e = a(c, !0),
								    f = e[0],
								    g = e[1],
								    h = e[2];
								if (v.RegEx.isHex.test(f)) {
									for (var i = ['Red', 'Green', 'Blue'], j = v.Values.hexToRgb(f), k = h ? v.Values.hexToRgb(h) : d, l = 0; l < i.length; l++) {
										var m = [j[l]];
										g && m.push(g), k !== d && m.push(k[l]), q[b + i[l]] = m;
									}
									delete q[b];
								}
							}
						});
						for (var H in q) {
							var K = a(q[H]),
							    L = K[0],
							    M = K[1],
							    N = K[2];
							H = v.Names.camelCase(H);
							var O = v.Hooks.getRoot(H),
							    P = !1;
							if (g(f).isSVG || 'tween' === O || v.Names.prefixCheck(O)[1] !== !1 || v.Normalizations.registered[O] !== d) {
								(h.display !== d && null !== h.display && 'none' !== h.display || h.visibility !== d && 'hidden' !== h.visibility) && /opacity|filter/.test(H) && !N && 0 !== L && (N = 0), h._cacheValues && E && E[H] ? (N === d && (N = E[H].endValue + E[H].unitType), P = g(f).rootPropertyValueCache[O]) : v.Hooks.registered[H] ? N === d ? (P = v.getPropertyValue(f, O), N = v.getPropertyValue(f, H, P)) : P = v.Hooks.templates[O][1] : N === d && (N = v.getPropertyValue(f, H));
								var Q,
								    R,
								    S,
								    T = !1;
								if (Q = l(H, N), N = Q[0], S = Q[1], Q = l(H, L), L = Q[0].replace(/^([+-\/*])=/, function (a, b) {
									return T = b, '';
								}), R = Q[1], N = parseFloat(N) || 0, L = parseFloat(L) || 0, '%' === R && (/^(fontSize|lineHeight)$/.test(H) ? (L /= 100, R = 'em') : /^scale/.test(H) ? (L /= 100, R = '') : /(Red|Green|Blue)$/i.test(H) && (L = L / 100 * 255, R = '')), /[\/*]/.test(T)) R = S;else if (S !== R && 0 !== N) if (0 === L) R = S;else {
									e = e || n();
									var U = /margin|padding|left|right|width|text|word|letter/i.test(H) || /X$/.test(H) || 'x' === H ? 'x' : 'y';
									switch (S) {
										case '%':
											N *= 'x' === U ? e.percentToPxWidth : e.percentToPxHeight;
											break;
										case 'px':
											break;
										default:
											N *= e[S + 'ToPx'];
									}
									switch (R) {
										case '%':
											N *= 1 / ('x' === U ? e.percentToPxWidth : e.percentToPxHeight);
											break;
										case 'px':
											break;
										default:
											N *= 1 / e[R + 'ToPx'];
									}
								}
								switch (T) {
									case '+':
										L = N + L;
										break;
									case '-':
										L = N - L;
										break;
									case '*':
										L = N * L;
										break;
									case '/':
										L = N / L;
								}
								i[H] = {
									rootPropertyValue: P,
									startValue: N,
									currentValue: N,
									endValue: L,
									unitType: R,
									easing: M
								}, t.debug && console.log('tweensContainer (' + H + '): ' + JSON.stringify(i[H]), f);
							} else t.debug && console.log('Skipping [' + O + '] due to a lack of browser support.');
						}
						i.element = f;
					}
					i.element && (v.Values.addClass(f, 'velocity-animating'), J.push(i), '' === h.queue && (g(f).tweensContainer = i, g(f).opts = h), g(f).isAnimating = !0, y === x - 1 ? (t.State.calls.push([J, o, h, null, B.resolver]), t.State.isTicking === !1 && (t.State.isTicking = !0, k())) : y++);
				}
				var e,
				    f = this,
				    h = m.extend({}, t.defaults, s),
				    i = {};
				switch (g(f) === d && t.init(f), parseFloat(h.delay) && h.queue !== !1 && m.queue(f, h.queue, function (a) {
					t.velocityQueueEntryFlag = !0, g(f).delayTimer = { setTimeout: setTimeout(a, parseFloat(h.delay)), next: a };
				}), h.duration.toString().toLowerCase()) {
					case 'fast':
						h.duration = 200;
						break;
					case 'normal':
						h.duration = r;
						break;
					case 'slow':
						h.duration = 600;
						break;
					default:
						h.duration = parseFloat(h.duration) || 1;
				}
				t.mock !== !1 && (t.mock === !0 ? h.duration = h.delay = 1 : (h.duration *= parseFloat(t.mock) || 1, h.delay *= parseFloat(t.mock) || 1)), h.easing = j(h.easing, h.duration), h.begin && !p.isFunction(h.begin) && (h.begin = null), h.progress && !p.isFunction(h.progress) && (h.progress = null), h.complete && !p.isFunction(h.complete) && (h.complete = null), h.display !== d && null !== h.display && (h.display = h.display.toString().toLowerCase(), 'auto' === h.display && (h.display = t.CSS.Values.getDisplayType(f))), h.visibility !== d && null !== h.visibility && (h.visibility = h.visibility.toString().toLowerCase()), h.mobileHA = h.mobileHA && t.State.isMobile && !t.State.isGingerbread, h.queue === !1 ? h.delay ? setTimeout(a, h.delay) : a() : m.queue(f, h.queue, function (b, c) {
					return c === !0 ? (B.promise && B.resolver(o), !0) : (t.velocityQueueEntryFlag = !0, void a(b));
				}), '' !== h.queue && 'fx' !== h.queue || 'inprogress' === m.queue(f)[0] || m.dequeue(f);
			}
			var h,
			    i,
			    n,
			    o,
			    q,
			    s,
			    u = arguments[0] && (arguments[0].p || m.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || p.isString(arguments[0].properties));
			if (p.isWrapped(this) ? (h = !1, n = 0, o = this, i = this) : (h = !0, n = 1, o = u ? arguments[0].elements || arguments[0].e : arguments[0]), o = f(o)) {
				u ? (q = arguments[0].properties || arguments[0].p, s = arguments[0].options || arguments[0].o) : (q = arguments[n], s = arguments[n + 1]);
				var x = o.length,
				    y = 0;
				if (!/^(stop|finish|finishAll)$/i.test(q) && !m.isPlainObject(s)) {
					var z = n + 1;
					s = {};
					for (var A = z; A < arguments.length; A++) {
						p.isArray(arguments[A]) || !/^(fast|normal|slow)$/i.test(arguments[A]) && !/^\d/.test(arguments[A]) ? p.isString(arguments[A]) || p.isArray(arguments[A]) ? s.easing = arguments[A] : p.isFunction(arguments[A]) && (s.complete = arguments[A]) : s.duration = arguments[A];
					}
				}
				var B = { promise: null, resolver: null, rejecter: null };
				h && t.Promise && (B.promise = new t.Promise(function (a, b) {
					B.resolver = a, B.rejecter = b;
				}));
				var C;
				switch (q) {
					case 'scroll':
						C = 'scroll';
						break;
					case 'reverse':
						C = 'reverse';
						break;
					case 'finish':
					case 'finishAll':
					case 'stop':
						m.each(o, function (a, b) {
							g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer), 'finishAll' !== q || s !== !0 && !p.isString(s) || (m.each(m.queue(b, p.isString(s) ? s : ''), function (a, b) {
								p.isFunction(b) && b();
							}), m.queue(b, p.isString(s) ? s : '', []));
						});
						var D = [];
						return m.each(t.State.calls, function (a, b) {
							b && m.each(b[1], function (c, e) {
								var f = s === d ? '' : s;
								return f === !0 || b[2].queue === f || s === d && b[2].queue === !1 ? void m.each(o, function (c, d) {
									d === e && ((s === !0 || p.isString(s)) && (m.each(m.queue(d, p.isString(s) ? s : ''), function (a, b) {
										p.isFunction(b) && b(null, !0);
									}), m.queue(d, p.isString(s) ? s : '', [])), 'stop' === q ? (g(d) && g(d).tweensContainer && f !== !1 && m.each(g(d).tweensContainer, function (a, b) {
										b.endValue = b.currentValue;
									}), D.push(a)) : ('finish' === q || 'finishAll' === q) && (b[2].duration = 1));
								}) : !0;
							});
						}), 'stop' === q && (m.each(D, function (a, b) {
							l(b, !0);
						}), B.promise && B.resolver(o)), a();
					default:
						if (!m.isPlainObject(q) || p.isEmptyObject(q)) {
							if (p.isString(q) && t.Redirects[q]) {
								var E = m.extend({}, s),
								    F = E.duration,
								    G = E.delay || 0;
								return E.backwards === !0 && (o = m.extend(!0, [], o).reverse()), m.each(o, function (a, b) {
									parseFloat(E.stagger) ? E.delay = G + parseFloat(E.stagger) * a : p.isFunction(E.stagger) && (E.delay = G + E.stagger.call(b, a, x)), E.drag && (E.duration = parseFloat(F) || (/^(callout|transition)/.test(q) ? 1e3 : r), E.duration = Math.max(E.duration * (E.backwards ? 1 - a / x : (a + 1) / x), 0.75 * E.duration, 200)), t.Redirects[q].call(b, b, E || {}, a, x, o, B.promise ? B : d);
								}), a();
							}
							var H = 'Velocity: First argument (' + q + ') was not a property map, a known action, or a registered redirect. Aborting.';
							return B.promise ? B.rejecter(new Error(H)) : console.log(H), a();
						}
						C = 'start';
				}
				var I = {
					lastParent: null,
					lastPosition: null,
					lastFontSize: null,
					lastPercentToPxWidth: null,
					lastPercentToPxHeight: null,
					lastEmToPx: null,
					remToPx: null,
					vwToPx: null,
					vhToPx: null
				},
				    J = [];
				m.each(o, function (a, b) {
					p.isNode(b) && e.call(b);
				});
				var K,
				    E = m.extend({}, t.defaults, s);
				if (E.loop = parseInt(E.loop), K = 2 * E.loop - 1, E.loop) for (var L = 0; K > L; L++) {
					var M = { delay: E.delay, progress: E.progress };
					L === K - 1 && (M.display = E.display, M.visibility = E.visibility, M.complete = E.complete), w(o, 'reverse', M);
				}
				return a();
			}
		};
		t = m.extend(w, t), t.animate = w;
		var x = b.requestAnimationFrame || o;
		return t.State.isMobile || c.hidden === d || c.addEventListener('visibilitychange', function () {
			c.hidden ? (x = function x(a) {
				return setTimeout(function () {
					a(!0);
				}, 16);
			}, k()) : x = b.requestAnimationFrame || o;
		}), a.Velocity = t, a !== b && (a.fn.velocity = w, a.fn.velocity.defaults = t.defaults), m.each(['Down', 'Up'], function (a, b) {
			t.Redirects['slide' + b] = function (a, c, e, f, g, h) {
				var i = m.extend({}, c),
				    j = i.begin,
				    k = i.complete,
				    l = { height: '', marginTop: '', marginBottom: '', paddingTop: '', paddingBottom: '' },
				    n = {};
				i.display === d && (i.display = 'Down' === b ? 'inline' === t.CSS.Values.getDisplayType(a) ? 'inline-block' : 'block' : 'none'), i.begin = function () {
					j && j.call(g, g);
					for (var c in l) {
						n[c] = a.style[c];
						var d = t.CSS.getPropertyValue(a, c);
						l[c] = 'Down' === b ? [d, 0] : [0, d];
					}
					n.overflow = a.style.overflow, a.style.overflow = 'hidden';
				}, i.complete = function () {
					for (var b in n) {
						a.style[b] = n[b];
					}k && k.call(g, g), h && h.resolver(g);
				}, t(a, l, i);
			};
		}), m.each(['In', 'Out'], function (a, b) {
			t.Redirects['fade' + b] = function (a, c, e, f, g, h) {
				var i = m.extend({}, c),
				    j = { opacity: 'In' === b ? 1 : 0 },
				    k = i.complete;
				i.complete = e !== f - 1 ? i.begin = null : function () {
					k && k.call(g, g), h && h.resolver(g);
				}, i.display === d && (i.display = 'In' === b ? 'auto' : 'none'), t(this, j, i);
			};
		}), t;
	}(window.jQuery || window.Zepto || window, window, document);
});