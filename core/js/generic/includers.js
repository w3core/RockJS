(new function($R){

 var files = {};

 function makeSourceURL (url, type) {
   var s = '';
   if (DEBUG && url) {
     s = !!type ? ('/*# sourceURL='+url+' */') : ('//# sourceURL='+url+' ');
   }
   return s;
 }

 function once (url, callback, loader)
  {
   if(files[url] == null || !files[url].status)
    {
     loader(url, function(err, resp){
      if (err) files[url].status = 0;
      else
       {
        files[url].content = resp || null;
        files[url].status = 2;
        while(files[url].callbacks.length)
         {
          files[url].callbacks.pop()(files[url].content);
         }
       }
     });
    }
   if(files[url] == null)
    {
     files[url] = {
      status: 1,
      content: null,
      callbacks: []
     };
    }
   if(typeof callback == FUNCTION)
    {
     if(files[url].status == 2) callback(files[url].content);
     else files[url].callbacks.push(callback);
    }
  }

 function makeQueryString (o)
  {
   var a = arguments, r = [];
   var n = (typeof a[1] == STRING) ? (a[1] + '[%s]') : '%s';
   for (var i in o)
    {
     if (typeof o[i] == OBJECT && o[i] != null) r.push(makeQueryString(o[i], n.replace('%s', i)));
     else r.push(n.replace('%s', i) + '=' + encodeURIComponent(o[i]));
    }
   return r.join('&');
  }

 function makeXHR(o)
  {
   var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

   xhr.hadError = !1;
   xhr.error = null;

   function getRequest () {return o;}
   xhr.getRequest = function () { return getRequest(); };

   function getResponse ()
    {
     var ok = !!(xhr.status >= 200 && xhr.status <= 399);
     var r = xhr.responseText || '';
     var type = o.url.match(/\.(js|css)$/i);
     if (type) type = type[1].toLowerCase();
     if (DEBUG && !!type)
      {
       var url = o.url;
       if (o.type == 'GET' && o.data != null)
        {
         url += (url.indexOf('?') >= 0) ? '&' : '?';
         url += makeQueryString(o.data);
        }
       r = makeSourceURL(url, type=="css") + '\n' + r;
      }
     if (!ok)
      {
       $R.log('HTTP Error '+xhr.status+': '+(xhr.statusText || xhr.error), {
        message: xhr.statusText || xhr.error,
        location: o.url,
        code: xhr.status,
        request: o
       });
       return r;
      }
     var t = xhr.getResponseHeader('Content-Type'),
         u = (o.url!=null) ? o.url : null,
         m = 'Responce transferred with Content-Type "'+t+'" but interpreted as other type';
     try { if (t.match(/json/i)) r = new Function('return ' + r)(); }
     catch (e)
      {
       $R.log('XHR responce parsing error', {
        details: m,
        message: e.message,
        location: u,
        stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
        data: r,
        request: o
       });
       e.message = '['+u+'] ' + e.message + ' (' + m + ')';
       throw e;
      };
     return r;
    }
   xhr.getResponse = function () { return getResponse(); };
   return xhr;
  }

 function xhr (/* [url,] options|callback */)
  {
   var o = null, a = arguments;
   if (a[0] != null && typeof a[0] == OBJECT) o = a[0]; // (o)
   else if (a[1] != null && typeof a[1] == OBJECT) o = a[1]; // (url, o)
   else if (typeof a[0] == FUNCTION || typeof a[1] == FUNCTION) // (callback) || (url, callback)
    {
     o = {};
     o.complete = a[0] || a[1];
    }
   if (o == null) return false;

   var q = {};
   q.url = (typeof o.url == STRING) ? o.url : (typeof a[0] == STRING ? a[0] : location.href.replace(/#.*$/, ''));
   q.type = (typeof o.type == STRING) ? o.type : 'GET';
   q.async = (typeof o.async == BOOLEAN) ? o.async : true;
   q.contentType = (typeof o.contentType == STRING) ? o.contentType : null; // application/x-www-form-urlencoded | multipart/form-data
   q.xRequestedWith = (typeof o.xRequestedWith == STRING) ? o.xRequestedWith : null; // XMLHttpRequest
   q.data = (typeof o.data == OBJECT && o.data != null) ? o.data : null;
   q.cache = (typeof o.cache == BOOLEAN) ? o.cache : true;
   q.headers = (typeof o.headers == OBJECT && o.headers != null) ? o.headers : {};
   q.timeout = (typeof o.timeout == NUMBER) ? o.timeout : 30 * 1000;
   q.error = (typeof o.error == FUNCTION) ? o.error : function(){};
   q.success = (typeof o.success == FUNCTION) ? o.success : function(){};
   q.complete = (typeof o.complete == FUNCTION) ? o.complete : function(){};

   if (q.cache && function(){
     var query = q.data ? makeQueryString(q.data) : '', 
         id = q.url + (!query ? '' : (q.url.indexOf('?') >= 0 ? '&' : '?') + query);
     var cache = getTemplate(id);
     if (typeof cache == STRING) {
       var xhr = {
         status: 302,
         statusText: 'Found',
         responseText: cache
       };
       setTimeout(function(){
         try {
           var r = q.url.match(/.+\.json$/i) ? new Function('return ' + cache)() : cache;
           q.success(r, xhr);
           q.complete(r, xhr);
         }
         catch(e) {
           $R.log('Javascript exception in cached XHR request callback execution process', {
             message: e.message,
             stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
             request: q
            });
         };
       }, 0);
       return true;
     }
     return;
   }()) return;

   var xhr = makeXHR(q);

   setTimeout(function(){
    var url = q.url;
    var data = null;
    if (q.data != null && typeof q.data == OBJECT)
     {
      if (q.contentType == null)
       {
        q.contentType = 'application/x-www-form-urlencoded';
        if (q.type.toUpperCase() == 'POST') data = makeQueryString(q.data);
        else if (q.type.toUpperCase() == 'GET')
         {
          url += (url.indexOf('?') >= 0) ? '&' : '?';
          url += makeQueryString(q.data);
         }
       }
      else data = q.data;
     }

    function onError (e, fn)
     {
      xhr.hadError = !0;
      xhr.error = 'error';
      if (e != null && e.message != null) xhr.error = e.message;
      else if (e != null && e.type != null) xhr.error = e.type;
      else if (!(xhr.status >= 200 && xhr.status <= 399) && xhr.status > 0) xhr.error = xhr.statusText;
      if (typeof fn == FUNCTION) fn(xhr);
     }

    var _executed = !1;
    function execCallbacks ()
     {
      if (_executed) return;
      _executed = !0;
      try {
       var request = xhr.getRequest(), response = xhr.getResponse();
       if (!xhr.hadError && xhr.status >= 200 && xhr.status <= 399) request.success(response, xhr);
       if (xhr.hadError) request.error(response, xhr);
       request.complete(response, xhr);
      }
      catch(e) {
       $R.log('Javascript exception in XHR request callback execution process', {
        message: e.message,
        stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
        request: xhr
       });
       throw e;
      };
     }
    try{xhr.open(q.type, url, q.async);}
    catch(e){onError(e, execCallbacks);};
    xhr.timeout = q.timeout;
    if (q.contentType != null) xhr.setRequestHeader('Content-type', q.contentType);
    if (q.xRequestedWith != null) xhr.setRequestHeader('X-Requested-With', q.xRequestedWith);
    for (var i in q.headers) xhr.setRequestHeader(String(i), String(q.headers[i]));
 
    xhr.ontimeout = function(e){onError(e, execCallbacks);};
    xhr.onerror = function(e){onError(e, execCallbacks);};
    xhr.onreadystatechange = function(e)
     {
      if (xhr.readyState == 4)
       {
        if (xhr.status >= 200 && xhr.status <= 399) execCallbacks();
        else if (xhr.status > 0) onError(null, execCallbacks);
       }
     };
    try{xhr.send(data);}
    catch(e){onError(e, execCallbacks);};
   }, 0);

   return xhr;
  }

 function include (type, url, callback, skipErrors)
  {
   if (type == 'css')
    {
     var o = document.createElement('link');
     o.rel   = 'stylesheet';
     o.type  = 'text/css';
     o.media = 'all';
     o.href  = url;
    }
   else if (type == 'js')
    {
     var o  = document.createElement('script');
     o.type = 'text/javascript';
     o.src  = url;
    }
   if (typeof o != UNDEFINED)
    {
     var procCallback = function()
      {
       if(typeof callback == FUNCTION)
        {
         setTimeout(function(){
          callback();
         },0);
        }
      };
     var handler = function(e)
      {
       if(e.type == 'error' && !skipErrors)
        {
         $R.log('HTTP request error', {
          message: 'Location unavailable',
          location: url,
          source: e.target.outerHTML
         });
         //TODO: throw error
        }
       procCallback();
      };
     o.onload = handler;
     o.onerror = handler;
     setTimeout(function(){
      document.getElementsByTagName('head')[0].appendChild(o);
     }, 0);
    }
  }

 function include_once (type, url, callback, skipErrors)
  {
   once(url, callback, function(url, processor){
    include (type, url, processor, skipErrors);
   });
  }

 function require (url, callback, complete)
  {
   xhr(url, {
    success: callback,
    complete: function (r, xhr) {
      if(typeof complete == FUNCTION)
      {
       complete(!(xhr.status>=200 && xhr.status<=399), r);
      }
    }
   });
  }

 function require_once (url, callback)
  {
   once(url, callback, function(url, processor){
    require(url, null, processor);
   });
  }

 function inject (url, callback)
  {
   require_once(url, function(str){
    try
     {
      var js = new Function('$R', str);
      js($R);
      if(typeof callback == FUNCTION)
       {
        setTimeout(function(){ callback(); },0);
       }
     }
    catch(e)
     {
      $R.log('Javascript exception', {
       message: e.message,
       location: url,
       stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
       source: str
      });
      e.message = '['+url+'] ' + e.message;
      throw e;
     };
   });
  }

 $R.xhr = xhr;
 $R.include = include; // Simple way for insert CSS or JS file (such as jQuery) to document
 $R.include_once = include_once; 
 $R.require = require; // Require any content from same domain
 $R.require_once = require_once; // Require any content once from same domain
 $R.inject = inject; // Inject any JS file from same domain to the private $R namespace
 $R.makeSourceURL = makeSourceURL;
}($R));