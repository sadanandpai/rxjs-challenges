import{j as f,h as u,m as a,t as d}from"./tap.3b5cc1bd.js";import{i as p,f as s}from"./header.42500b50.js";import{i as S,t as k}from"./takeUntil.0b0fd414.js";import"./isScheduler.b11c038e.js";function m(n,c){return c?function(i){return i.pipe(m(function(t,o){return p(n(t,o)).pipe(a(function(e,r){return c(t,e,o,r)}))}))}:f(function(i,t){var o=0,e=null,r=!1;i.subscribe(u(t,function(l){e||(e=u(t,void 0,function(){e=null,r&&t.complete()}),p(n(l,o++)).subscribe(e))},function(){r=!0,!e&&t.complete()}))})}const v=document.querySelector("#timer"),C=document.querySelector("#start"),b=document.querySelector("#stop"),h=s(C,"click"),q=s(b,"click");let x=S(100).pipe(k(q));h.pipe(m(()=>x),a(n=>n/10),d(n=>{v.textContent=n+"s"})).subscribe();