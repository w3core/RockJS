(new function(e){(function(e,t){typeof exports==='object'&&typeof module!=='undefined'?module.exports=t():typeof define==='function'&&define.amd?define(t):(e.Swipe=t())}(this,(function(){return e;function e(e,t){var r='ontouchstart' in window,s=r?'touchstart':'mousedown',h=r?'touchmove':'mousemove',l=r?'':'dragover',v=r?'touchend':'mouseup',w=r?'touchcancel':'dragend',y=Math.round,i,c,o,a,u,n,d;E();function E(){window.addEventListener(s,f,!0);window.addEventListener(h,f,!0);if(l)window.addEventListener(l,f,!0);window.addEventListener(v,f,!0);window.addEventListener(w,f,!0)};function f(e){if(e.type==s){var y=M(e);if(y)i=y};if(i){var t=L(e);if(e.type==s){c=o=t.x;a=u=t.y;p('start',e)}
else if(e.type==h||e.type==l){if(!n){var r=g(c,t.x),f=g(a,t.y);if(r==f)return;n=r>f?'x':'y'};d=n=='x'?(o>t.x?'left':'right'):(u>t.y?'top':'bottom');o=t.x;u=t.y;p('move',e)}
else if(e.type==v||e.type==w){p('end',e);i=null;n=d=null}}};function M(t){if(typeof e=='string')return m(t.target,e,!0);else return x(t.target,e)};function S(e,t){if(e==window||e==document)return!1;var n=Element.prototype,r=n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||function(e){return[].indexOf.call(document.querySelectorAll(e),this)!==-1};return r.call(e,t)};function m(e,t,n){if(S(e,t))return e;if(!n)return!1;return e.parentNode?m(e.parentNode,t,n):!1};function x(e,t){if(e==t)return e;return e.parentNode?x(e.parentNode,t):!1};function g(e,t){return Math.max(e,t)-Math.min(e,t)};function L(e){var t=e.touches&&e.touches[0]?e.touches[0]:e;return{x:y(t.clientX||t.pageX||t.x),y:y(t.clientY||t.pageY||t.y)}};function X(e){var t={x:o,y:u,startX:c,startY:a,diffX:o-c,diffY:u-a};if(e)t.originalEvent=e;if(n){t.way=n;t.diffWay=n=='x'?t.diffX:t.diffY};if(d)t.direction=d;return t};function p(e,n){var r='swipe'+e,o=X(n),u=Y(i,r,o);if(typeof t=='function')t.call(i,u)};function Y(e,t,n){var r=document.createEvent('HTMLEvents');if(n)for(var i in n)r[i]=n[i];r.initEvent(t,!0,!0);e.dispatchEvent(r);return r}}})));e.Swipe=this.Swipe;function t(e,t){var u=/<%([^%>]+)?%>/g,f=/(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,r='var r=[];\n',i=0,n,o=function(e,t){t?(r+=e.match(f)?e+'\n':'r.push('+e+');\n'):(r+=e!=''?'r.push("'+e.replace(/"/g,'\\"')+'");\n':'');return o}
while(n=u.exec(e)){o(e.slice(i,n.index))(n[1],!0);i=n.index+n[0].length};o(e.substr(i,e.length-i));r+='return r.join("");';return new Function(r.replace(/[\r\t\n]/g,'')).apply(t)};e.template=t}($R));