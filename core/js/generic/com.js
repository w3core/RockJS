(new function ($R) {

// Dependencies
$R.addEventListener('initConfig:ready:once initTools:ready:once', function(e){
 if ($R.config != null && $R.tools != null) $R.dispatchEvent('initCOM');
});

function object (name)
 {
  var name = (typeof name == STRING) ? name : '';
  return new Function(' return new function '+name+' (){}(); ')();
 }

/**
 * Component logic
 */

var Components = {};

function makeComponentURL (type, name)
 {
  var url = null;
  try
   {
    url = $R.config.generic[type + 's'].url + '/' + name;
   }
  catch (e)
   {
    var title = 'Invalid component type';
    var msg = 'The component type is not defined by configuration';
    $R.error($R.error.core(), [title,msg].join('. '), null, {
     type: type,
     name: name,
     stack: (typeof e.stack != UNDEFINED) ? e.stack : e
    });
    throw [title, msg, 'Type: ' + type, 'Name: ' + name].join('.\n');
   };
  return url;
 }

/**
 * {$R.config.generic[{type}].url}/{name}/script.js
 * 
 * @param type {string} Available values: 'layout', 'module'
 * @param name {string} Component name
 * @param callback {function}
 */
function getComponent (type, name, callback)
 {
  var URL = makeComponentURL(type, name);
  if (!URL) return;
  var url = URL + '/script.js';
  var key = type + '.' + name;
  
  if (Components[key] == null)
   {
    var fn = function (e)
     {
      if(e.data.type == type && e.data.name == name)
       {
        callback(e.data.body);
        $R.removeEventListener('componentLoad', fn);
       }
     };
    $R.addEventListener('componentLoad', fn);
    $R.require_once($R.url(url), function(s){
     try
      {
       Components[key] = new Function('return ('+s.replace(/;$/g, '')+')')();
       $R.dispatchEvent('componentLoad', {type:type, name:name, body:Components[key]});
      }
     catch(e)
      {
       $R.error($R.error.core(), 'Component parsing error', null, {
        message: e.message,
        type: type,
        name: name,
        stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
        source: s
       });
       throw e;
      };
    });
   }
  else
   {
    callback(Components[key]);
   }
 }

function Component (type, name, options, callback, id, onBeforeCreate)
 {
  var that = this;

  that.instance = null;
  that.options = null;

  var IS_READY = false;
  var IS_VISIBLE = false;

  var visibilityOnComponentCreate = null;
  var requestsOnComponentCreate = [];

  function isReady () { return !!IS_READY; }
  function isVisible () { return !!IS_VISIBLE; }  

  function opts (o)
   {
    return (o == null) ? {} : o;
   }  

  function extractNodes (dom, def) {
    var o = {};
    if (def) {
      if (typeof def == STRING) {
        var defs = def.split(/\s*;\s*/), def = {};
        for (var i=0; i<defs.length; i++) {
          var parts = defs[i].split(':');
          var name = parts.shift().trim();
          var selector = parts.join().trim();
          if (name) {
            def[name] = selector && selector.toLowerCase() != "true" ? selector : true;
          }
        }
      }
      if (typeof def == OBJECT) {
        for (var i in def) {
          o[i] = def[i] ? dom.querySelector(def[i] === true ? '.' + i : def[i]) : null;
        }
      }
    } 
    return o;
  }

  function $O ()
   {
    var that = this;
    this.type = type;
    this.name = name;
    this.options = opts(options);
    this.id = id;
    this.DOM = document.createElement('div');
    this.DOM.className = type+' '+type+'-'+name+' hidden';
    this.node = {};
    this.stylesheet = null;
    this.isReady = isReady;
    this.isVisible = isVisible;
    this.extractNodes = extractNodes;
    this.spin = new $R.spin(this.DOM);
    this.template = function template (id, DOM) {
      var tpl = DOM && typeof DOM == OBJECT ? getTemplate(id, DOM) : undefined;
      if (typeof tpl != STRING) tpl = getTemplate(id, that.DOM) || getTemplate(id);
      return tpl || '';
    };
   }

  function __construct()
   {
    that.options = new $O();
    // Show spinner while component not created
    that.options.spin.show();

    getComponent(type, name, function (cls){
     beforeCreate()(cls, $R, that.options, function (c, $r, $o){
      create(c, $r, $o);
     });
    });
   }

  function beforeCreate ()
   {
    if (typeof onBeforeCreate != FUNCTION)
     {
      var onBeforeCreate = function onBeforeCreateDefault (cls, $r, $o, callback)
       {
        callback(cls, $r, $o);
       };
     }
    return onBeforeCreate;
   }

  function create (cls, $r, $o)
   {
    try
     {
      that.instance = new cls($r, $o);
      prepareComponentUI(function(){
       if(that.instance.node && (typeof that.instance.node == STRING || typeof that.instance.node == OBJECT))
        {
         that.options.node = that.instance.node = extractNodes(that.options.DOM, that.instance.node);
        }
       if(typeof that.instance.onCreate == FUNCTION)
        {
         that.instance.onCreate(that.options.options);
        }
       processRequestsOnComponentCreate();
       processVisibilityOnComponentCreate();

       IS_READY = true;

       if (typeof callback == FUNCTION)
        {
         callback(that);
        }
       $R.dispatchEvent('componentCreate', {}, that);
      });
     }
    catch(e)
     {
      $R.error($R.error.core(), 'Component instance creating error', null, {
       message: e.message,
       name:name, 
       options:options,
       stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
       source: cls
      });
      throw e;
     };
   }

  function extractComponentInstanceUIEntity (key, callback)
   {
    var entities = {'html':'index.html', 'css':'style.css'};
    if (typeof entities[key] != STRING)
     {
      var title = 'Component UI entity type error';
      var msg = 'Not allowed UI entity type';
      $R.error($R.error.core(), title, null, {message: msg, type:key});
      throw [title, msg, 'Type: ' + key].join('.\n');
     }
    else if (typeof that.instance[key] == STRING)
     {
      callback(that.instance[key]);
     }
    else if (typeof that.instance[key] == BOOLEAN && that.instance[key] == true)
     {
      var URL = makeComponentURL(type, name);
      if (!URL) return;
      $R.require_once($R.url(URL + '/' + entities[key]), callback);
     }
    else callback('');
   }  

  function prepareComponentUI (callback)
   {
    var i = 2;
    function procCallback () { 
     i--; 
     if (!i)
      {
       // Hide spinner because component has content that can be showed straight away
       that.options.spin.hide();
       callback(); 
      }
    }

    extractComponentInstanceUIEntity('html', function(s){
     var nodes = $R.tools.makeHTMLCollectionByString(s);
     for(var i=0; i<nodes.length; i++)
      {
       that.options.DOM.appendChild(nodes[i]);
      }
     procCallback();
    });

    extractComponentInstanceUIEntity('css', function(s){
     var css = prepareStyleSheet(s);
     if (DEBUG) {
       var url = $R.url(makeComponentURL(that.options.type, that.options.name) + '/style.css');
       css = $R.makeSourceURL(url, true) + '\n' + css;
     }
     that.options.stylesheet = $R.tools.makeCSSNodeByString(css);
     procCallback();
    });
   }

  function prepareStyleSheet (s)
   {
    return s.replace(/(\#this)([^a-zA-Z0-9_-])/g, '.'+type+'-'+name+'$2') // #this => .type-name
             .replace(/(url\s*?\(\"?\'?)(\.\/)/g, '$1'+$R.url(makeComponentURL(type, name))+'/') // ./ => .../type/name/... 
            ;
   }

  function attachStyleSheet ()
   {
    if (that.options.stylesheet == null) return;
    document.body.appendChild(that.options.stylesheet);
   }

  function detachStyleSheet ()
   {
    var node = that.options.stylesheet;
    if (node != null && node.parentNode != null && node.parentNode.tagName != null)
     {
      node.parentNode.removeChild(node);
     }
   }

  function ready (fn)
   {
    if (typeof fn == FUNCTION)
     {
      if ( IS_READY ) fn(that);
      else
       {
        var event = 'componentCreate';
        var listener = function (e)
         {
          if (e.target == that)
           {
            fn(that);
            $R.removeEventListener(event, listener);
           }
         };
        $R.addEventListener(event, listener);
       }
     }
    return that;
   };

  function request (o, callback)
   {
    $R.dispatchEvent('componentRequest', opts(o), that);
    if (that.instance == null)
     {
      requestsOnComponentCreate.push([opts(o), callback]);
     }
    else
     {
      if (typeof that.instance.onRequest == FUNCTION)
       {
        that.instance.onRequest(opts(o), callback);
       }
     }
    return that;
   };

  function show (o, p)
   {
    $R.dispatchEvent('componentShow', opts(o), that, null, null, function (e) {
      IS_VISIBLE = e.returnValue;
      if (IS_VISIBLE) {
        if (!that.instance) visibilityOnComponentCreate = ['show', opts(o), opts(p)];
        else
         {
          attachStyleSheet();
          if (typeof that.instance.onShow == FUNCTION)
           {
            that.instance.onShow(opts(o), opts(p));
           }
         }
        $R.tools.removeClass(that.options.DOM, 'hidden');
      }
    });
    return that;
   };

  function hide (o, p)
   {
    IS_VISIBLE = false;
    $R.dispatchEvent('componentHide', opts(o), that);
    if (that.instance == null) visibilityOnComponentCreate = ['hide', opts(o), opts(p)];
    else
     {
      detachStyleSheet();
      if (typeof that.instance.onHide == FUNCTION)
       {
        that.instance.onHide(opts(o), opts(p));
       }
     }
    $R.tools.addClass(that.options.DOM, 'hidden');
    return that;
   };

  function processRequestsOnComponentCreate ()
   {
    if (typeof that.instance.onRequest == FUNCTION)
     {
      for(var i=0; i<requestsOnComponentCreate.length; i++)
       {
        that.instance.onRequest(
          requestsOnComponentCreate[i][0],
          requestsOnComponentCreate[i][1]
        );
       }
      requestsOnComponentCreate = [];
     }
   }

  function processVisibilityOnComponentCreate ()
   {
    var o = visibilityOnComponentCreate;
    if (o == null) return;
    
    if (o[0] == 'show')
     {
      attachStyleSheet();
      if (typeof that.instance.onShow == FUNCTION) that.instance.onShow(o[1], o[2]);
     }
    if (o[0] == 'hide')
     {
      detachStyleSheet();
      if (typeof that.instance.onHide == FUNCTION) that.instance.onHide(o[1], o[2]);
     }
    o = null;
   }

  __construct();

  that.isReady = isReady;
  that.isVisible = isVisible;
  that.ready = ready;
  that.request = request;
  that.show = show;
  that.hide = hide;
 }

function group ()
 {
  var that = this;
  var components = [];

  that.all = components;

  that.push = function push (COM, DOM)
   {
    if (COM == null || typeof COM != OBJECT) return false;
    if (COM instanceof Array)
     {
      for (var i=0; i<COM.length; i++)
       {
        that.push(COM[i], DOM);
       }
      return that;
     }

    components.push(COM);
    if (DOM != null && DOM.appendChild != null)
     {
      DOM.appendChild(COM.options.DOM);
     }
    return that;
   };

  that.eject = function eject (COM)
   {
    if (COM == null || typeof COM != OBJECT) return false;
    if (COM instanceof Array)
     {
      for (var i=0; i<COM.length; i++)
       {
        that.eject(COM[i]);
       }
      return that;
     }
    var o = [];
    var status = false;
    for (var i=0; i<components.length; i++)
     {
      if (components[i] == COM) status = true;
      else o.push(components[i]);
     }
    if (status) components = o;
    return that;
   };

  function exec (name, o, p)
   {
    function call (fn, o, p)
     {
      setTimeout(function(){ if (typeof fn == FUNCTION) fn(o, p); }, 0);
     }

    for (var i=0; i<components.length; i++)
     {
      call(components[i][name], o, p);
     }
   }

  that.show = function show (o, parent)
   {
    exec('show', o, parent);
    return that;
   };

  that.hide = function hide (o, parent)
   {
    exec('hide', o, parent);
    return that;
   };

  that.request = function request (o, processor)
   {
    exec('request', o, processor);
    return that;
   };

 }

//--------------------------------

var ComponentInstances = {};
ComponentInstances.all = [];
ComponentInstances.unique = {}; // Contains references to unique by id components

function makeComponentInstance (type, id, name, options, callback)
 {
  if (typeof id == STRING && ComponentInstances.unique[id] != null)
   {
    var msg = 'The component with id "'+id+'" already exists. Creating operation was canceled.';
    $R.error($R.error.core(), 'Component instance creating error', null, {
     message:msg,
     type:type,
     name:name,
     options:options,
     id:id
    });
    throw msg;
    return;
   }
  var com = new Component (type, name, options, callback, id);
  ComponentInstances.all.push(com);
  if (typeof id == STRING)
   {
    ComponentInstances.unique[id] = com;
   }
  return com;
 }

function getAllComponentsByType (type)
 {
  var r = [];
  for (var i=0; i<ComponentInstances.all.length; i++)
   {
    if 
     (
      type == null 
      || (type != null && ComponentInstances.all[i].options.type == type)
     ) r.push(ComponentInstances.all[i]);
   }
  return r;
 };

function getComponentById (id, type)
 {
  if 
   (
    ComponentInstances.unique[id] != null
    && (type == null || type == ComponentInstances.unique[id].options.type)
   ) return ComponentInstances.unique[id];
  return null;
 };

function getComponentInstanceById (type, id, name, options, callback)
 {
  var com = null;
  if (typeof type != STRING || typeof id != STRING) return false;

  com = getComponentById(id);
  if (com)
   {
    if (typeof callback == FUNCTION) callback(com);
    return com;
   }

  if (typeof callback == FUNCTION)
   {
    var listener = function (e)
     {
      if (e.target.options.id == id)
       {
        callback(e.target);
        $R.removeEventListener('componentCreate', listener);
       }
     };
    $R.addEventListener('componentCreate', listener);
   }

  com = makeComponentInstance(type, id, name, options);
  return com;
 };

function getComponentsByName (type, name)
 {
  var r = [];
  for (var i=0; i<ComponentInstances.all.length; i++)
   {
    if 
     (
      ComponentInstances.all[i].options.name == name
      && (type == null || type == ComponentInstances.all[i].options.type)
     ) r.push(ComponentInstances.all[i]);
   }
  return r;
 };

/*[include src="com.module.inc.js"]*/
/*[include src="com.page.inc.js"]*/

} ($R));