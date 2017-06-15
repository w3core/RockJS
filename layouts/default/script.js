function layout_default(e,a){this.html=String('<header class="header-area"><\/header><main class="main-area"><sidebar class="sidebar-area"><\/sidebar><content class="content-area"><\/content><\/main><footer class="footer-area"><\/footer>');this.css=String(':focus{outline:none}::-moz-focus-inner{border:0}*,:before,:after{box-sizing:border-box;vertical-align:middle;text-overflow:ellipsis;-webkit-overflow-scrolling:touch;-webkit-tap-highlight-color:transparent}html,body{display:block;position:relative;margin:0;padding:0;height:100%;text-align:left;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;text-rendering:optimizeLegibility;background-color:#282c34;color:#abb2bf}img{border:0 none}a{text-decoration:none;color:#31a0e7}a:hover{color:#98c379}a:active,a.active{color:#fff}h1,h2,h3,h4,h5{color:#fff;font-weight:normal!important;max-width:100%;overflow:hidden}#this{display:flex;flex-direction:column;position:relative;height:100%;width:100%;overflow:hidden}header,main,sidebar,content,footer{position:relative}header,footer{z-index:10;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}footer{box-shadow:0 0 1em #000}main{overflow:auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}sidebar{-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;overflow-x:visible;overflow-y:auto;z-index:2;padding-right:.3em}content{-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1;overflow:auto;padding:1em}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-thumb{border:3px solid transparent;border-radius:5px;background:transparent;background-clip:padding-box}:hover::-webkit-scrollbar-thumb{min-height:40px;border:3px solid transparent;background:rgba(255,255,255,.1);background-clip:padding-box}::-webkit-scrollbar-thumb:horizontal:hover,::-webkit-scrollbar-thumb:vertical:hover{background-color:#31a0e7}::-webkit-scrollbar-thumb:horizontal:active,::-webkit-scrollbar-thumb:vertical:active{background-color:#98c379}::-webkit-scrollbar-corner{background:transparent}@media (max-width:800px){sidebar{will-change:transform,opacity;position:absolute;height:100%;max-width:90%;transform:translate(-100%,0)}sidebar.show{transition:transform .3s,opacity .3s;transform:translate(0,0)!important;opacity:1!important}sidebar.hide{transition:transform .3s linear,opacity .3s linear;transform:translate(-100%,0)!important;opacity:0!important}}@media (min-width:800px){sidebar{transform:none!important;opacity:1!important}}.logo-search:after{content:"";display:inline-block;min-width:64px;min-height:21px;background-image:url(.\/img\/logo-algolia.png);background-repeat:no-repeat;background-position:center center}');this.node='sidebar:sidebar';var r=e.tools,l=document,b=800,i=50,d=0,o=0,n=0,t=0,s=!1;this.onCreate=function(){var t=a.node.sidebar;if(t){e.Swipe(l);r.on('swipestart swipemove swipeend',l,m);e.on('menu.toggle',function(){var r=f(t),i=!(r.tx*1);e.tools[i?'addClass':'removeClass'](t,'hide');e.tools[!i?'addClass':'removeClass'](t,'show')})}};function m(l){var c=a.node.sidebar;if(l.type=='swipestart'){d=document.body.offsetWidth;o=c.offsetWidth;n=t=f(c).tx};if(l.way!='x'||d>b||(n<0&&l.startX>i))return;var h=l.startX<=i;if(l.type=='swipemove'){t=l.diffWay+n;t=t<-o?-o:t>0?0:t;p(c,{tx:t});c.style.opacity=Math.round(100-Math.abs(t*100/o))/100;if(!s){s=!0;r.removeClass(c,'show hide')}};if(l.type=='swipeend'){if((l.direction=='left'&&l.diffWay<-i)||(l.direction=='right'&&l.diffWay<i))r.addClass(c,'hide');else if((l.direction=='left'&&l.diffWay>=-i)||(l.direction=='right'&&l.diffWay>=i))r.addClass(c,'show');e.vibrate();s=!1}};function f(t){try{var i=window.getComputedStyle(t)[h('transform')],e=/^matrix\(([^\)]+)\)$/.exec(i)[1].split(/[ ,]+/);return{a:e[0]*1,b:e[1]*1,c:e[2]*1,d:e[3]*1,tx:e[4]*1,ty:e[5]*1}}catch(r){return{a:1,b:0,c:0,d:1,tx:0,ty:0}}};function p(t,e){var i=[e.a||1,e.b||0,e.c||0,e.d||1,e.tx||0,e.ty||0];t.style[h('transform')]='matrix('+i.join(', ')+')'};function c(){var e=c;if(!('result' in e)){var r=/^(Moz|ms|Webkit|Khtml|O|Icab)(?=[A-Z])/,t=document.createElement('i');for(var i in t.style){if(r.test(i)){e.result=i.match(r)[0];break}};if(!('result' in e)&&'WebkitOpacity' in t.style)e.result='Webkit';if(!('result' in e)&&'KhtmlOpacity' in t.style)e.result='Khtml';if(!('result' in e))e.result=''};return e.result};function h(e){var t=c();if(t==='')return e;e=e.charAt(0).toUpperCase()+e.substr(1);return t+e}};