import{e as a,i,a as I,r as x,b as O,c as h,d as k,g as w,h as A,j as S,k as y,m as g}from"./header.042d82ff.js";import{j as l,h as L,O as f,i as j,k as E}from"./tap.3b5cc1bd.js";function m(e,n){return n===void 0&&(n=0),l(function(r,t){r.subscribe(L(t,function(o){return a(t,e,function(){return t.next(o)},n)},function(){return a(t,e,function(){return t.complete()},n)},function(o){return a(t,e,function(){return t.error(o)},n)}))})}function v(e,n){return n===void 0&&(n=0),l(function(r,t){t.add(e.schedule(function(){return r.subscribe(t)},n))})}function F(e,n){return i(e).pipe(v(n),m(n))}function P(e,n){return i(e).pipe(v(n),m(n))}function R(e,n){return new f(function(r){var t=0;return n.schedule(function(){t===e.length?r.complete():(r.next(e[t++]),r.closed||this.schedule())})})}function T(e,n){return new f(function(r){var t;return a(r,n,function(){t=e[I](),a(r,n,function(){var o,u,c;try{o=t.next(),u=o.value,c=o.done}catch(d){r.error(d);return}c?r.complete():r.next(u)},0,!0)}),function(){return j(t==null?void 0:t.return)&&t.return()}})}function s(e,n){if(!e)throw new Error("Iterable cannot be null");return new f(function(r){a(r,n,function(){var t=e[Symbol.asyncIterator]();a(r,n,function(){t.next().then(function(o){o.done?r.complete():r.next(o.value)})},0,!0)})})}function G(e,n){return s(x(e),n)}function M(e,n){if(e!=null){if(O(e))return F(e,n);if(h(e))return R(e,n);if(k(e))return P(e,n);if(w(e))return s(e,n);if(A(e))return T(e,n);if(S(e))return G(e,n)}throw y(e)}function p(e,n){return n?M(e,n):i(e)}function q(e){return e===void 0&&(e=1/0),g(E,e)}export{p as f,q as m};
