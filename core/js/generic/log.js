(new function($R){

 var LOG_STATUS = DEBUG;
 var LOG_HOLDER_ID = '_log';

 // -----------------------------------
 $R.log = function log (title, value){

  if (LOG_STATUS && typeof console != UNDEFINED)
   {
    if(typeof console.groupCollapsed == FUNCTION) console.groupCollapsed(title);
    if(typeof console.groupCollapsed == FUNCTION) console[console.dir!=null?'dir':'log'](value);
    else console[console.dir!=null?'dir':'log'](title, value);
    if(typeof console.groupEnd == FUNCTION) console.groupEnd();
   }

  var itemClass = '_log';
  var expandClass = '_e';
  var closerClass = '_c';

  var h = document.getElementById(LOG_HOLDER_ID);
  if (!h)
   {
    h = document.createElement('div');
    h.style.display = (LOG_STATUS || Number(getCookie('__log'))) ? 'block' : 'none';
    h.id = LOG_HOLDER_ID;
    document.body.insertBefore(h, document.body.firstChild);
   }
  var t = (typeof title == STRING) ? title : '...';
  var v = (arguments.length == 2) ? print_r(value) : '';

  var c = document.createElement('h4');
  c.className = '_t';
  c.innerHTML = t;

  var n = document.createElement('div');
  n.className = itemClass;
  n.innerHTML = v;
  c.onclick = function()
   {
    n.className = (n.className == itemClass) ? (itemClass +' '+ expandClass) : itemClass;
   };
  n.insertBefore(c, n.firstChild);
  h.appendChild(n);

  var c = document.createElement('div');
  c.className = closerClass;
  c.onclick = function(e)
   {
    h.removeChild(n);
   };
  n.insertBefore(c, n.firstChild);
 };

 function getCookie (k)
  {
   return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(k).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  }

 function setCookie (k,v)
  {
   var e = new Date((new Date).getTime() + 365*24*60*60*1000);
   document.cookie = escape(k) + "=" + escape(v) + "; expires="+e.toGMTString()+"; path=/";
  }

 function getSafeString(str)
  {
   var textarea = document.createElement("textarea");
   textarea.innerHTML = str;
   return textarea.innerHTML;
  }

 function isNode(o)
  {
   return (
    typeof Node === OBJECT ? o instanceof Node : 
    o && typeof o === OBJECT && typeof o.nodeType === NUMBER && typeof o.nodeName===STRING
   );
 }

 function getType(v)
  {
   var type = typeof v;
   if (isNode(v)) type = 'node';
   else if (typeof v == OBJECT && v instanceof Array) type = 'array';
   else if (typeof v == OBJECT && v != null) type = OBJECT;
   else if (v == null) type = UNDEFINED;
   return type;
  }

 function getName(v)
  {
   var name = '';
   if (getType(v) == OBJECT && v.constructor != null)
    {
     if (v.constructor.name != null) name = v.constructor.name;
     else if (v.constructor.prototype != null && v.constructor.prototype.name != null) name = v.constructor.prototype.name;
    }
   if (getType(v) == FUNCTION && v.name != null) name = v.name;
   return name;
  }

 function print_r(theObj, isProperty)
  {
   var arrow = '<span class="_a">:</span>';
   var str = '';
    str += '<ul class="_l">';
    if(!isProperty) str += '<li><span class="_pt">'+getType(theObj)+' '+getName(theObj)+' </span> '+arrow+' <span class="_pv">';
    if(getType(theObj) == OBJECT || getType(theObj) == 'array')
     {
      if(!isProperty) str += '<ul class="_l">';
      for(var p in theObj)
       {
        var v;
        if(getType(theObj[p]) == 'node') v = theObj[p].nodeName + (theObj[p].id && theObj[p].id.length ? '#'+theObj[p].id : '') + (theObj[p].className && theObj[p].className.length ? '.'+theObj[p].className.replace(/\s+/mg, '.') : '');
        else if(getType(theObj[p]) == OBJECT || getType(theObj[p]) == 'array') v = print_r(theObj[p], true);
        else if(getType(theObj[p]) == STRING || getType(theObj[p]) == FUNCTION) v = getSafeString(theObj[p]);
        else v = theObj[p];
        str += '<li><span class="_pt">'+getType(theObj[p])+' '+getName(theObj[p])+' </span>  <span class="_pn">'+p+'</span> '+arrow+' <span class="_pv">'+v+'</span></li>';
       }
      if(!isProperty) str += '</ul>';
     }
    else
     {
      str += getSafeString(theObj);
     }
    if(!isProperty) str += '</span></li>';
    str += '</ul>';
   return str;
  }

 var ie = !!(window.addEventListener == null);

 function enable ()
  {
   setCookie('__log', 1);
   var e = document.getElementById(LOG_HOLDER_ID);
   if (e) e.style.display = 'block';
  }

 function disable ()
  {
   setCookie('__log', 0);
   var e = document.getElementById(LOG_HOLDER_ID);
   if (e) e.style.display = 'none';
  }

 function toggle () {
  if (Number(getCookie('__log'))) disable();
  else enable();
 }

 function initHotKeysListener ()
  {
   document[!ie?'addEventListener':'attachEvent'](!ie?'keyup':'onkeyup', function(e){
    var evt = window.event ? event : e;
    if ( evt.keyCode == 123 && evt.ctrlKey && evt.altKey && evt.shiftKey ) toggle();
   }, false);   
  }

 function initTouchListener ()
  {
   var timer = 5000, touches = 20;
   var _timeout, _count;

   function reset () {clearTimeout(_timeout); _count = 0;}
   
   reset ();

   function onTimeout ()
    {
     if (_count && _count >= touches) toggle();
     reset();
    }

   document.addEventListener('touchstart', function(e){
    _count++;
    if (_count > 1) return;
    _timeout = setTimeout(onTimeout, timer);
   }, false);
  }

 initHotKeysListener();
 if (!ie) initTouchListener();
 
}($R));