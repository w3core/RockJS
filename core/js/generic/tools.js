$R.tools = (new function tools ($R){
  var that = this;

  that.on = on;
  that.off = off;
  that.render = render;
  that.isObject = isObject;
  that.forObject = forObject;
  that.isList = isList;
  that.forList = forList;
  that.each = each;
  that.JSONP = JSONP;
  that.Callback = Callback;
  that.normalize = normalize;
  that.basename = basename;
  that.parseRequest = parseRequest;
  that.makeQueryString = makeQueryString;
  that.parseQueryString = parseQueryString;
  that.escapeHTML = escapeHTML;
  that.getRandom = getRandom;
  that.extend = extend;
  that.pregQuote = pregQuote;
  that.assignStringValues = assignStringValues;
  that.trim = trim;
  that.makeClassListByString = makeClassListByString;
  that.hasClass = hasClass;
  that.hasClassParents = hasClassParents;
  that.addClass = addClass;
  that.removeClass = removeClass;
  that.getParentNodebyClass = getParentNodebyClass;
  that.detachDOMNode = detachDOMNode;
  that.detachDOMNodes = detachDOMNodes;
  that.makeHTMLCollectionByString = makeHTMLCollectionByString;
  that.browser = new Browser;
  that.blank = blank;

  function isObject (o)
   {
    return !!(o != null && typeof o == OBJECT);
   }

  function forObject (object, callback)
   {
    if (!object || typeof list != OBJECT || typeof callback != FUNCTION) return;
    for (var i in object)
     {
      if (callback(object[i], i, object) === false) break;
     }      
   }

  function isList (o)
   {
    return !!(isObject(o) && typeof o.length == NUMBER && o != window);
   }

  function forList (list, callback, reverse)
   {
    if (!list || typeof list != OBJECT || typeof list.length != NUMBER || typeof callback != FUNCTION) return;
    if (reverse)
     {
      for (var i=list.length; i-->0;) if (callback(list[i], i, list) === false) break;
     }
    else for (var i=0; i<list.length; i++) if (callback(list[i], i, list) === false) break;
   }

  function each (object, callback)
   {
    if (isList(object)) forList(object, callback);
    else if (isObject(object)) forObject(object, callback);
   }

  function listener (type, event, node, fn, sign)
   {
    if (typeof type != STRING || typeof event != STRING || !event.length || !node || typeof fn != FUNCTION) return;
    if (typeof node == OBJECT && typeof node.length == NUMBER && !node.nodeName && node != window)
     {
      for(var i=0; i<node.length; i++) listener(type, event, node[i], fn, sign);
      return;
     }
    var method = (type == 'on') ? 'addEventListener' : 'removeEventListener';
    var e = event.replace(/^\s+|\s+$/img, '').split(/[ ,]+/);
    if (e.length == 1)
     {
      if (e[0].length) node[method](e[0], fn, !!sign);
      return;
     }
    for(var i=0; i<e.length; i++) listener(type, e[i], node, fn, sign);
   }
  
  function on (event, node, fn, sign) { listener('on', event, node, fn, sign) }
  function off (event, node, fn, sign) { listener('off', event, node, fn, sign) }

  function escapeHTML (s)
   {
    var n = document.createElement("textarea");
    n.innerHTML = s;
    return n.innerHTML;
   }

  function normalize (o)
   {
    var t = {'true':true, 'false':false, 'null':null, 'undefined':undefined, 'NaN':NaN};
    if (o != null && typeof o == OBJECT)
     {
      for (var i in o) if (o.hasOwnProperty(i)) o[i] = normalize(o[i]);
     }
    else if (typeof o == STRING)
     {
      for (var i in t)
       {
        if (i == o) return t[i];
       }
      if(/^-?\d+\.?\d*$/mg.test(o))
       {
        return o*1;
       }
     }
    return o;
   }

  function basename (filename, noExt)
   {
    var s = String(filename).split(/[\?#]/);
    s = s[0].split(/[\\/]/);
    s = s[s.length-1];
    if (noExt) s = s.replace(/(\.[^.]+)$/, '');
    return s;
   }

  function parseRequest (string, pathSeparator)
   {
    // Pattern: 'path0/path1/path2/path3?argv1=1&argv2=2&argv3=3#sub0/sub1/sub2/sub3?arg1=1&arg2=2&arg3=3'
    var r = {path:[], query:{}, hash:{}};
    var s = (typeof pathSeparator == 'string' && pathSeparator) ? pathSeparator : '/';
    if (typeof string != 'string') string = '';
    var m;
    m = string.split('#');
    if (m[1]) r.hash = parseRequest(m[1], s);
    m = m[0].split('?');
    if (m[1]) r.query = parseQueryString(m[1]);
    r.path = m[0].split(s);
    for(var i=0; i<r.path.length; i++) r.path[i] = decodeURIComponent(r.path[i].replace(/\+/g, '%20'));
    r.path = normalize(r.path);
    return r;
   }

  function makeQueryString (o)
   {
    var a = arguments, r = [];
    var n = (typeof a[1] == STRING) ? (a[1] + '[%s]') : '%s';
    for ( var i in o)
     {
      if (typeof o[i] == OBJECT && o[i] != null)
       r.push(makeQueryString(o[i], n.replace('%s', i)));
      else
       r.push(n.replace('%s', i) + '=' + encodeURIComponent(o[i]));
     }
    return r.join('&');
   }

  function parseQueryString (str)
   {
    var array = {},
        strArr = String(str).replace(/^&/, '').replace(/&$/, '').split('&'),
        sal = strArr.length,
        i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value, postLeftBracketPos, keys, keysLen,
        fixStr = function(str) {return decodeURIComponent(str.replace(/\+/g, '%20')); },
        fixVal = normalize;

    for (i = 0; i < sal; i++)
     {
      tmp = strArr[i].split('=');
      key = fixStr(tmp[0]);
      value = (tmp.length < 2) ? '' : fixVal(fixStr(tmp[1]));

      while (key.charAt(0) === ' ')
       {
        key = key.slice(1);
       }
      if (key.indexOf('\x00') > -1)
       {
        key = key.slice(0, key.indexOf('\x00'));
       }
      if (key && key.charAt(0) !== '[')
       {
        keys = [];
        postLeftBracketPos = 0;
        for (j = 0; j < key.length; j++)
         {
          if (key.charAt(j) === '[' && !postLeftBracketPos)
           {
            postLeftBracketPos = j + 1;
           }
          else if (key.charAt(j) === ']')
           {
            if (postLeftBracketPos)
             {
              if (!keys.length)
               {
                keys.push(key.slice(0, postLeftBracketPos - 1));
               }
              keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
              postLeftBracketPos = 0;
              if (key.charAt(j + 1) !== '[')
               {
                break;
               }
             }
           }
         }
        if (!keys.length)
         {
          keys = [
           key
          ];
         }
        for (j = 0; j < keys[0].length; j++)
         {
          chr = keys[0].charAt(j);
          if (chr === ' ' || chr === '.' || chr === '[')
           {
            keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
           }
          if (chr === '[')
           {
            break;
           }
         }

        obj = array;
        for (j = 0, keysLen = keys.length; j < keysLen; j++)
         {
          key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
          lastIter = j !== keys.length - 1;
          lastObj = obj;
          if ((key !== '' && key !== ' ') || j === 0)
           {
            if (obj[key] === undef)
             {
              obj[key] = {};
             }
            obj = obj[key];
           }
          else
           { // To insert new dimension
            ct = -1;
            for (p in obj)
             {
              if (obj.hasOwnProperty(p))
               {
                if (+p > ct && p.match(/^\d+$/g))
                 {
                  ct = +p;
                 }
               }
             }
            key = ct + 1;
           }
         }
        lastObj[key] = value;
       }
     }
    return array;
   }

  function getRandom ()
   {
    return Math.random().toString().substr(2) + (new Date).getTime();
   }

  function JSONP (o){
    if(typeof o != OBJECT) return false;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.async = true;

    var options = {
      'URL': (typeof o.URL == STRING) ? o.URL : (location.origin + location.pathname + location.search ),
      'callbackName': '__' + getRandom(),
      'timeout': (typeof o.timeout == NUMBER) ? o.timeout : 30*1000,
      'data': (typeof o.data != UNDEFINED) ? o.data : {},
      'callback': (typeof o.callback == FUNCTION) ? o.callback : function(response){}
    };

    window[options.callbackName] = function(result){
      options.callback( (typeof result != UNDEFINED) ? result : undefined );
      if(script.parentNode != null) script.parentNode.removeChild(script);
      if(typeof window[options.callbackName] == FUNCTION) window[options.callbackName] = void(0);
    };

    var __construct = function(){
      script.onload = script.onerror = function(){
        if (typeof window[options.callbackName] == FUNCTION) window[options.callbackName](undefined);
      };
      setTimeout(function(){
        if (typeof window[options.callbackName] == FUNCTION) window[options.callbackName](undefined);
      }, options.timeout);
      script.src = options.URL + (options.URL.indexOf('?')>=0 ? '&' : '?')
                 + 'callback=' + encodeURIComponent(options.callbackName)
                 + '&' + makeQueryString(options.data);
      head.appendChild(script);
    };
    __construct();
  }

  function pregQuote (string)
   {
    return string.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
   }

  function assignStringValues (string, values, clear, opener, closer)
   {
    var opener = pregQuote(typeof opener == STRING ? opener : '$');
    var closer = pregQuote(typeof closer == STRING ? closer : '$');
    var string = (typeof string == STRING) ? string : '';
    var values = (typeof values == OBJECT && values != null) ? values : {};
    var clear = (typeof clear == BOOLEAN) ? clear : false;
    for(var i in values)
    {
     var key = opener + pregQuote(i) + closer;
     var value = values[i];
     if(typeof values[i] == FUNCTION)
     {
      try
      {
       value = values[i](i);
      }
      catch(e) { value = undefined; };
     }
     string = string.replace(new RegExp('('+key+')','mg'), String(value));
    }
    if(clear)
    {
     string = string.replace(new RegExp('('+opener+'\S*?'+closer+')','mg'), '');
    }
    return string;
   }

  function extend (a, b)
   {
    if (b && typeof b == OBJECT && (!a || typeof a != OBJECT))
     {
      a = (typeof b.length == NUMBER && b != window) ? [] : {};
      if (typeof b.length == NUMBER) var b = Array.prototype.slice.call(b);
     }
    for(var p in b)
     {
      try
       {
        if(b[p] && typeof b[p] == OBJECT) a[p] = extend(a[p], b[p]);
        else a[p] = b[p];
       }
      catch(e)
       {
        a[p] = b[p];
       };
     }
    return a;
   }

  function trim (s)
   {
    return String(s).replace(/^\s+|\s+$/mg, '');
   }

  function makeClassListByString (s)
   {
    var s = trim(s);
    return (s.length > 0) ? s.split(/\s+/mg) : [];
   }

  function matchClass (mask, name)
   {
    var m = String(name).match(new RegExp('^' + (String(mask).replace(/\?/g,'[^ ]').replace(/\*/g, '[^ ]+')) + '$', 'g'));
    return !!m?m[0]:null;
   }

  function hasClass (node, name)
   {
    return (typeof name == STRING && typeof node.className == STRING) ? !!node.className.match(new RegExp('(\\s|^)'+name+'(\\s|$)')) : false;
   }

  function addClass (node, name)
   {
    var nodes = [];
    var nm = name;
    if (arguments.length > 2)
     {
      nodes = Array.prototype.slice.call(arguments, 0);
      nm = nodes.pop();
     }
    else if (isList(node)) nodes = node;
    if (nodes.length)
     {
      for (var i=0; i<nodes.length; i++) addClass(nodes[i], nm);
      return;      
     }
    if (node == null || !trim(name).length) return;
    var o = makeClassListByString(node.className);
    var n = (typeof name == OBJECT && name != null) ? name : makeClassListByString(name);
    for(var i=0; i<n.length; i++)
     {
      var s = !1;
      for(var j=0; j<o.length; j++) if (o[j] == n[i]) s = !0;
      if (!s) o.push(n[i]);
     }
    node.className = o.join(' ');
   }

  function removeClass (node, name)
   {
    var nodes = [];
    var nm = name;
    if (arguments.length > 2)
     {
      nodes = Array.prototype.slice.call(arguments, 0);
      nm = nodes.pop();
     }
    else if (isList(node)) nodes = node;
    if (nodes.length)
     {
      for (var i=0; i<nodes.length; i++) removeClass(nodes[i], nm);
      return;      
     }
    if (node == null || !trim(name).length) return;
    var o = makeClassListByString(node.className);
    var n = (typeof name == OBJECT && name != null) ? name : makeClassListByString(name);
    var r = [];
    for(var i=0; i<o.length; i++)
     {
      var s = !1;
      for(var j=0; j<n.length; j++) if(o[i] == n[j] || matchClass(n[j], o[i])) s = !0;
      if (!s) r.push(o[i]);
     }
    node.className = r.join(' ');
   }

  function getParentNodebyClass (node, name)
   {
    var r = null, p = node.parentNode;
    while (p)
     {
      if (hasClass(p, name)) r = p;
      if (r || !p.parentNode || p.tagName.toLowerCase() == 'html') break;
      p = p.parentNode;
     }
    return r;
   }

  function hasClassParents (node, name)
   {
    return (getParentNodebyClass(node, name)) ? true : false;
   }

  function detachDOMNode (node, DOM)
   {
    if (node == null) return null;
    var n = null;
    if (typeof node == OBJECT) n = node;
    if (typeof node == STRING && DOM != null) n = DOM.querySelector(node);
    if (n && n.parentNode != null) n.parentNode.removeChild(n);
    return n;
   }

  function detachDOMNodes (nodes, DOM)
   {
    if (nodes == null || !nodes.length) return [];
    var n = [];
    if (typeof nodes == OBJECT) n = nodes;
    if (typeof nodes == STRING && DOM != null) n = DOM.querySelectorAll(nodes);
    for (var i=0; i<n.length; n++) n[i] = detachDOMNode(n[i]);
    return n;
   }

  function makeHTMLCollectionByString (str)
   {
    var d = document.createElement('div');
    d.innerHTML = str;
    var r = [], o = d.childNodes;
    for (var i=0; i<o.length; i++) r.push(o[i].nodeType === 3 ? o[i].cloneNode(false) : o[i]);
    //d.innerHTML = ''; Not working for IE
    for (var i=r.length-1; i>=0; i--) if (r[i].parentNode) r[i].parentNode.removeChild(r[i]);
    return r;
   }

  function Callback (ctx)
   {
   var that = this;
   var __QUEUE__ = {};

   var push = function (fn, key, permanent)
    {
     if (typeof fn != FUNCTION) return false;
     var key = (typeof key == STRING) ? key : 'cb_'+getRandom();
     var permanent = (typeof permanent == BOOLEAN) ? permanent : false;
     __QUEUE__[key] = { 'fn':fn, 'permanent':permanent };
     return key;
    };

   var fire = function (key, args)
    {
     if (typeof key != STRING || typeof __QUEUE__[key] == UNDEFINED || typeof __QUEUE__[key]['fn'] != FUNCTION) return false;
     __QUEUE__[key]['fn'].apply(ctx, args instanceof Array ? args : []);
     if (!__QUEUE__[key]['permanent']) delete __QUEUE__[key];
     return true;
    };

   var remove = function(key)
    {
     if (typeof key != STRING || typeof __QUEUE__[key] == UNDEFINED || typeof __QUEUE__[key]['fn'] != FUNCTION) return false;
     delete __QUEUE__[key];
     return true;
    };

   that.push = push;
   that.fire = fire;
   that.remove = remove;
  }

  function Browser ()
   {
    function agent (s) {return (s!=null && typeof s==STRING) ? s : navigator.userAgent;}

    function isMobile (ua) {
     var OS = os(ua);
     return !!(agent(ua).toLowerCase().indexOf('mobile') >= 0 || OS == 'android' || OS == 'ios');
    }

    function engine (ua)
     {
      var s = agent(ua).toLowerCase(), n = 'presto,trident,webkit,gecko'.split(',');
      for (var i=0; i<n.length; i++) if (s.indexOf(n[i]) >= 0) return n[i];
      return (s.indexOf(' msie ') >= 0) ? 'trident' : '';
     }

    function os (ua)
     {
      var s = agent(ua).toLowerCase();
      if (s.indexOf('android') >= 0) return 'android';
      if (s.match(/ip(hone|od|ad).*Mac OS X.*Mobile/img)) return 'ios';
      if (s.indexOf('mac os x') >= 0) return 'osx';
      if (s.indexOf('windows') >= 0) return 'windows';
      if (s.indexOf('linux') >= 0) return 'linux';
      if (s.indexOf('symbian') >= 0) return 'symbian';
      if (s.indexOf(' rim ') >= 0 || s.match(/\(bb[0-9]+;.*mobile/mg)) return 'blackberry';
      return '';
     }

    this.engine = engine;
    this.isMobile = isMobile;
    this.os = os;
   }

  function blank () {return 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='}

  function render (DOM, value, fn)
    {
     function __construct ()
      {
       renderValue (DOM, value);
      }

     function isObject (v)
      {
       return (v != null && typeof v == 'object');
      }

     function isArray (v)
      {
       return (isObject(v) && v.length != null);
      }

     function handle (key, value, node, object)
      {
       if (typeof fn == 'function') fn(key, value, node, object);
      }

     function renderPrimitive (DOM, value)
      {
       if (!isObject(DOM) || isObject(value)) return;
       var v = escapeHTML(String(value));
       if (typeof DOM.value != 'undefined') DOM.value = v;
       else if (typeof DOM.innerHTML != 'undefined') DOM.innerHTML = v;
      }

     function renderArray (DOM, array)
      {
       if (!isObject(DOM) || !isArray(array)) return;
       var item = DOM.querySelector('.Item');
       if (!item) return;

       var parent = item.parentNode;
       item.parentNode.removeChild(item);

       function render (parent, node, value, key)
        {
         renderValue(node, value);
         handle(key, value, node, array);
         parent.appendChild(node);
        }

       for (var i in array) render(parent, item.cloneNode(true), array[i], i);
      }

     function renderObject (DOM, object)
      {
       if (!isObject(DOM) || !isObject(object)) return;
       
       function render (key, value)
        {
         if (typeof key != 'string') return;
         var node = DOM.querySelector('.' + key);
         if (!node) return;
         renderValue(node, value);
         handle(key, value, node, object);
        }
       
       for (var i in object) render(i, object[i]);
      }

     function renderValue (DOM, value)
      {
       if (!isObject(DOM)) return;
       if (isArray(value)) renderArray(DOM, value);
       else if (isObject(value)) renderObject(DOM, value);
       else renderPrimitive(DOM, value);    
      }

     __construct();
    }

  /* MSIE DOM Events compability */
  (function() {
   if (!Event.prototype.preventDefault) {
     Event.prototype.preventDefault=function() {
       this.returnValue=false;
     };
   }
   if (!Event.prototype.stopPropagation) {
     Event.prototype.stopPropagation=function() {
       this.cancelBubble=true;
     };
   }
   if (!Element.prototype.addEventListener) {
     var eventListeners=[];
     
     var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
       var self=this;
       var wrapper=function(e) {
         e.target=e.srcElement;
         e.currentTarget=self;
         if (listener.handleEvent) {
           listener.handleEvent(e);
         } else {
           listener.call(self,e);
         }
       };
       if (type=="DOMContentLoaded") {
         var wrapper2=function(e) {
           if (document.readyState=="complete") {
             wrapper(e);
           }
         };
         document.attachEvent("onreadystatechange",wrapper2);
         eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
         
         if (document.readyState=="complete") {
           var e= (document.createEventObject) ? document.createEventObject() : new Event();
           e.srcElement=window;
           wrapper2(e);
         }
       } else {
         this.attachEvent("on"+type,wrapper);
         eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
       }
     };
     var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
       var counter=0;
       while (counter<eventListeners.length) {
         var eventListener=eventListeners[counter];
         if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
           if (type=="DOMContentLoaded") {
             this.detachEvent("onreadystatechange",eventListener.wrapper);
           } else {
             this.detachEvent("on"+type,eventListener.wrapper);
           }
           break;
         }
         ++counter;
       }
     };
     Element.prototype.addEventListener=addEventListener;
     Element.prototype.removeEventListener=removeEventListener;
     if (HTMLDocument) {
       HTMLDocument.prototype.addEventListener=addEventListener;
       HTMLDocument.prototype.removeEventListener=removeEventListener;
     }
     if (Window) {
       Window.prototype.addEventListener=addEventListener;
       Window.prototype.removeEventListener=removeEventListener;
     }
   }
  })();

}($R));