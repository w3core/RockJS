(new function ($R) {

 var CurrentPage = null;

 function Page (settings)
  {
   var that = this;

   var IS_READY = false;
   var IS_VISIBLE = false;

   var Progress = null;
   var Title = '';

   that.name = null;
   that.route = null;
   that.options = object('options');
   that.options.create = null; // reserved for title, description, etc.
   that.options.show = null;
   that.options.hide = null;
   that.layout = null;
   that.module = object('module');
   that.module.all = {};

   function __construct ()
    {
     initEventListeners();
     makeProgress();
     defineSettings();
     makeLayout(
      $R.config.generic.layout["default"].name
     ,$R.config.generic.layout["default"].options
     );
     makeModules();
    }

   function makeProgress ()
    {
     Progress = new $R.progressBar();
     Progress
       .setMessage('Page loading...')
       .setCompleteMessage('Page loading complete')
       .setCompleteCallback(onProgressComplete)
     ;
     Progress.pushStep('layout');
     if (typeof settings.module == OBJECT && settings.module.length)
      {
       Progress.pushStep('module', settings.module.length);
      }
    }

   function defineSettings ()
    {
     if (typeof settings.name != STRING || !settings.name.length)
      {
       var caption = 'Invalid page name ('+settings.name+')';
       var msg = 'The name of page should be string';
       $R.error($R.error.core(), caption, null, {message:msg, name:settings.name});
       throw [caption, msg].join('. ');
      }
     that.name = settings.name;
     that.route = settings.route || null;
     that.url = function url (options) {
       return URL(that.name, options || that.options.show);
     };
     if (settings.title != null) title(settings.title);
     if (typeof settings.options == OBJECT) that.options.create = settings.options;
    }

   function initEventListeners ()
    {
     if ($R.config.client.purl == true)
      {
       $R.addEventListener('execPageShow:ready', function (e) {
        if (e.returnValue == true && e.target == that) execShow(e.data);
       });
      }
    }

   function makeLayout (defaultName, defaultOptions)
    {
     var id = (settings.layout != null && typeof settings.layout.id == STRING) ? settings.layout.id : null;
     var name, options;
     if (settings.layout != null && typeof settings.layout.name == STRING)
      {
       name = settings.layout.name;
       options = (settings.layout != null && settings.layout.options != null) ? settings.layout.options : null;
      }
     else
      {
       name = defaultName;
       options = defaultOptions || null;
      }

     that.layout = makeComponentInstance('layout', id, name, options, function(){
      Progress.setMessage('Page layout loaded').doStep('layout');
     });

     if (settings.layout != null && typeof settings.layout.callback == FUNCTION)
      {
       that.layout.ready(settings.layout.callback);
      }
    }

   function makeModules ()
    {
     if (settings.module == null || typeof settings.module != OBJECT || !settings.module.length) return;
     var o = settings.module;
     for (var i=0; i<o.length; i++)
      {
       addModule(o[i].location, o[i].position, o[i].id, o[i].name, o[i].options, function (){ Progress.doStep('module'); }).ready(o[i].callback);
      }
    }

   function onProgressComplete ()
    {
     IS_READY = true;
     $R.dispatchEvent('pageCreate', null, that);
    }

   function isReady ()
    {
     return IS_READY;
    }

   function isVisible ()
    {
     return IS_VISIBLE;
    }

   function showTitle ()
    {
     if (typeof Title == STRING) document.title = Title;
     that.layout.ready(function(){
      if (typeof that.layout.instance.title == STRING)
       {
        var o = that.layout.options.DOM.querySelector(that.layout.instance.title);
        if (o != null) o.innerHTML = $R.tools.escapeHTML(Title);
       }
      else if (typeof that.layout.instance.title == FUNCTION) that.layout.instance.title(Title, that);
     });
    }

   function title (str)
    {
     if (typeof str == STRING)
      {
       Title = str;
       $R.dispatchEvent('titleChange', Title, that);
       if (IS_VISIBLE) showTitle();
       return that;
      }
     else return Title;
    }

   function ready (fn)
    {
     if (typeof fn == FUNCTION)
      {
       if ( IS_READY ) fn(that);
       else
        {
         var event = 'pageCreate';
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
    }

   function addPageClass ()
    {
     $R.tools.addClass(document.querySelector('html'), 'page-' + that.name);
    }

   function removePageClass ()
    {
     $R.tools.removeClass(document.querySelector('html'), 'page-' + that.name);
    }

   function modulePlaceClassString (module, location)
    {
     var s = 'module-exists-' + module.options.name;
     if (typeof location == STRING && location != '*') s += ' ' + location + '-module-' + module.options.name;
     return s;
    }

   function addModulePlaceClass (module, location)
    {
     setTimeout(function(){
      $R.tools.addClass(that.layout.options.DOM, modulePlaceClassString(module, location));
     },0);
    }

   function removeModulePlaceClass (module, location)
    {
     setTimeout(function(){
      $R.tools.removeClass(that.layout.options.DOM, modulePlaceClassString(module, location));
     },0);
    }

   function touch (name)
    {
     var n = (typeof name == STRING) ? name : '*';
     if (that.module.all[n] == null) that.module.all[n] = [];
     return that.module.all[n];
    }

   function resort (name)
    {
     var sort = function(ma,mb)
      {
       var a = (typeof ma.position == NUMBER) ? ma.position : 1000;
       var b = (typeof mb.position == NUMBER) ? mb.position : 1000;
       return (a - b);
      };
     touch(name).sort(sort);
    }

   function getDOMNestedModules (DOM)
    {
     // To avoid module-in-module nesting
     var o = [];
     for (var i=0; i<DOM.children.length; i++)
      {
       if
        (
          DOM.children[i].tagName
          && $R.tools.hasClass(DOM.children[i], 'module')
        ) o.push(DOM.children[i]);
      }
     return o;
    }

   function setModuleDOMPosition (DOM, position, module)
    {
     if (DOM == null) return;
     if (typeof position != NUMBER)
      {
       if (module.options.DOM.parentNode != DOM) DOM.appendChild(module.options.DOM);
       return;
      }
     var modules = getDOMNestedModules(DOM);
     if (modules.length <= position) DOM.appendChild(module.options.DOM);
     else DOM.insertBefore(module.options.DOM, modules[position]);
    }

   function placeModule (location, position, module)
    {
     // The location that defined as (*) or (null) is using for background modules
     if (location == '*' || location == null)
      {
       if (module.options.DOM.parentNode != null && module.options.DOM.parentNode.tagName)
        {
         module.options.DOM.parentNode.removeChild(module.options.DOM);
        }
       return;
      }
     that.layout.ready(function(){
      var DOM = that.layout.options.DOM.querySelector('.' + location);
      setModuleDOMPosition(DOM, position, module);
     });
    }

   function addModule (location, position, id, name, options, callback)
    {
     var o = {};
     o.position = (typeof position == NUMBER) ? position : null;
     o.object = (id != null && id instanceof Component) ? id : makeComponentInstance('module', id, name, options);
     if (typeof callback == FUNCTION) o.object.ready(callback);
     resort(location);
     if (typeof position != NUMBER) touch(location).push(o);
     else touch(location).splice(position, 0, o);
     if (IS_VISIBLE) doModuleShow (location, o.position, o.object, that.options.show);
     return o.object;
    }

   function doModuleShow (location, position, module, options)
    {
     that.layout.ready(function(){
      placeModule(location, position, module);
      if (IS_VISIBLE)
       {
        addModulePlaceClass(module, location);
        module.show(options, that);
       }
     });
    }

   function doModuleHide (location, module, options)
    {
     that.layout.ready(function(){
      removeModulePlaceClass(module, location);
      module.hide(options, that);
     });
    }

   function doPageShow ()
    {
     addPageClass();
     if (that.layout.options.DOM.parentNode == null || that.layout.options.DOM.parentNode.tagName == null)
      {
       document.body.appendChild(that.layout.options.DOM);
      }
     for (var i in that.module.all)
      {
       for (var j=0; j<that.module.all[i].length; j++)
        {
         doModuleShow (i, that.module.all[i][j].position, that.module.all[i][j].object, that.options.show);
        }
      }
     that.layout.show(that.options.show, that);
     $R.dispatchEvent('pageShow', that.options.show, that);
    }

   function doPageHide ()
    {
     removePageClass();
     for (var i in that.module.all)
      {
       for (var j=0; j<that.module.all[i].length; j++)
        {
         doModuleHide (i, that.module.all[i][j].object, that.options.hide);
        }
      }
     that.layout.hide(that.options.hide, that);
     $R.dispatchEvent('pageHide', that.options.hide, that);
    }

   function execShow (o)
    {
     if (CurrentPage != null && CurrentPage.name != name) CurrentPage.hide();
     CurrentPage = that;
     that.options.show = o ? $R.tools.normalize(o) : null;

     IS_VISIBLE = true;
     showTitle();
     if ( !IS_READY ) Progress.show();
     ready(function(){
      if (IS_VISIBLE)
       {
        Progress.hide();
        doPageShow();
       }
     });
    }

   function show (o)
    {
     if ($R.config.client.purl == true) location.hash = URL(that.name, o);
     else execShow(o);
     return that;
    }

   function execHide (o)
    {
     that.options.hide = o ? $R.tools.normalize(o) : null;
     IS_VISIBLE = false;
     if (IS_READY) doPageHide();
     else Progress.hide();
    }

   function hide (o)
    {
     execHide(o);
     return that;
    }

   __construct();

   that.isReady = isReady;
   that.isVisible = isVisible;
   that.title = title;
   that.ready = ready;
   that.show = show;
   that.hide = hide;
  }

 function PageFactory (name)
  {
   var that = this;

   var o =
    {
     name: (typeof name == STRING) ? name : null
    ,title: null
    ,options: null
    ,layout: null
    ,module: []
    };
   if (typeof name == STRING) $route(name);

   that.name = function setname (str)
    {
     if (typeof str == STRING) {
       o.name = str;
       if (!o.route) $route(str);
     }
     return that;
    };

   that.route = function route (route, params)
    {
     if (route) $route(route, params);
     return that;
    };

   that.title = function title (str)
    {
     if (typeof str == STRING) o.title = str;
     return that;
    };

   that.options = function options (obj)
    {
     if (typeof obj == OBJECT) o.options = obj;
     return that;
    };

   that.layout = function layout (id, name, options, callback)
    {
     o.layout = {
       id:id
      ,name:name || null
      ,options:options || null
      ,callback:callback || null
     };
     return that;
    };

   that.module = function module (location, position, id, name, options, callback)
    {
     o.module.push({
       location:location
      ,position:position
      ,id:id // or instance of module exist component
      ,name:name || null
      ,options:options || null
      ,callback:callback || null
     });
     return that;
    };

   that.exec = function exec ()
    {
     return new Page(o);
    };

   that.get = function get () {
     return o;
   };

   function $route (route, params) {
     if (route) {
       if (typeof route == STRING) {
         var route = route;
         if (name == $R.config.generic.page['default'].name) route = '/';
         else {
           if (route[0] != '/') route = '/' + route;
           if (route[route.length-1] == '/') route = route.substr(0, route.length-1);
           route = route.replace(/\/+/g, '/');
         }
       }
       o.route = new $R.UrlPattern(route, params);
       o.route.origin = {route:route, params:params};
     }
   }
  }

 //------------------------------------------------------------------------------
 var Definitions = object('definitions');
 var Pages = object('all');

 function URL (name, options) {
   var page = name && Definitions[name] ? Definitions[name].get() : null;
   var url;
   if (page) {
     try {
       url = page.route.stringify(options);
       if (options && typeof options == OBJECT) {
         var o = {}, count=0;
         for (var i in options) {
           if (page.route.names.indexOf(i) < 0) {
             count++;
             o[i] = options[i];
           }
         }
         if (count) url += '?' + $R.tools.makeQueryString(o);
       }
     }
     catch (e){
       $R.error(null, "Page URL building error", null, {page: page, options: options});
       throw e;
     };
   }
   return '#' + (url ? url : '');
 }

 function getPredefinedPageByName (name)
  {
   if (Definitions[name] == null) return null;
   if (Pages[name] == null) Pages[name] = Definitions[name].exec();
   return Pages[name];
  }

 $R.page = object('page');

 $R.page.url = URL;

 $R.page.all = function all ()
  {
   return Pages;
  };

 $R.page.defined = function defined ()
  {
   return Definitions;
  };

 $R.page.define = function define (name)
  {
   Definitions[name] = new PageFactory (name);
   return Definitions[name];
  };

 $R.page.make = function make (name)
  {
   if (Pages[name] != null)
    {
     var title = 'Page creating process error';
     var msg = 'The page with name "'+name+'" already exists';
     $R.error($R.error.core(), title, null, {message:msg});
     throw [title, msg].join('. ');
    }
   var o = new PageFactory (name);
   var e = o.exec;
   o.exec = function exec ()
    {
     Pages[name] = e();
    };
   return o;
  };

 $R.page.get = function get (name)
  {
   if (name == null && CurrentPage != null) return CurrentPage;
   if (Pages[name] != null) return Pages[name];
   return getPredefinedPageByName(name);
  };

} ($R));