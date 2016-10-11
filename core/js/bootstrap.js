(new function $R (window, document, location, Array, Number, String) {
 var $R = this;

 $R.config = function(){return /*[include src="js/config.js" default="{generic:{}, client:{}}"]*/;}();

 var DEBUG = ($R.config.generic.debug && $R.config.generic.debug.status);

 if (DEBUG)
  {
   window.$R = $R;
  }

 var NUMBER = 'number', STRING = 'string', OBJECT = 'object', FUNCTION = 'function', UNDEFINED = 'undefined', BOOLEAN = 'boolean'; // For typeof checking

 var makeCSSNodeByString = function(str)
  {
   var o = document.createElement("style");
   o.type = "text/css";
   if(o.styleSheet) o.styleSheet.cssText = str;
   else o.appendChild(document.createTextNode(str));
   return o;
  };

 var progressBarMarkup = {
   html: String(/*[include src="sources/progressbar/index.html" format="STRING"]*/),
   css: String(/*[include src="sources/progressbar/style.css" format="STRING"]*/)
 };

 function initBootstrapStyles ()
  {
   var node;
   node = makeCSSNodeByString(/*[include src="core/css/bootstrap.css" format="STRING"]*/);
   document.querySelector('head').appendChild(node);

   node = makeCSSNodeByString(progressBarMarkup.css);
   document.querySelector('head').appendChild(node);
  }
 initBootstrapStyles();

 /*[include src="generic/progressbar.js"]*/

 // Create and show boot progress
 $R.bootProgress = new $R.progressBar();
 $R.bootProgress.setMessage('Initial loading...')
                .setCompleteMessage('Loading complete');

 if ($R.config.generic.bootstrap && $R.config.generic.bootstrap.progress)
  {
   $R.bootProgress.show();
  }

 // [script type="text/template" id="{id}"] {template} [/script]
 function getTemplate (id, DOM) {
   var DOM = DOM && typeof DOM == OBJECT ? DOM : document, url = $R.config.client.url;
   if (typeof id == STRING) {
     if (id.indexOf($R.config.client.url) == 0) var id = id.substr(url.length);
     var mask = 'script[type="text/template"][id="%s"]';
     var node = DOM.querySelector(mask.replace('%s', id));
     if (node) return node.innerHTML.trim();
   }
 }

 /*[include src="generic/log.js"]*/
 /*[include src="generic/error.js"]*/
 /*[include src="generic/includers.js"]*/

 // Ready ---------------------------------------------------------------------

 var _ready = [], _isReady = false;

 function ready (fn)
  {
   if (typeof fn != FUNCTION) return;
   if (_isReady) fn();
   else _ready.push(fn);
  }

 function _procReady ()
  {
   _isReady = true;
   for (var i=0; i<_ready.length; i++) _ready[i]();
   _ready = [];
  }

 // Bootstrap -----------------------------------------------------------------
 // $R.bootProgress.setStepCallback(function(action, sign, amount, signObj, total, passed, signs, o){console.log(action, sign, amount, signObj, total, passed, signs);});
 function __construct ()
  {
   // Boot progress steps limit definition
   $R.bootProgress
     .pushStep('initConfig')
     .pushStep('initTools')
     .pushStep('initCOM')
     .pushStep('initStorage')
     .pushStep('onEventLoad')
   ;
   $R.bootProgress.setMessage('Retrieving system modules...');

   initConfig(); //NOTE: It should be synchronius only!!!

   if ( isSlaveMode() )
    {
     window.$R$ = new function $R$ () {} ();
     window.$R$.ready = ready;
    }

   var onEventLoad = function onEventLoad (){

    !new $R.eventFactory($R);

    if ( isSlaveMode() )
     {
      window.$R$.addEventListener = $R.addEventListener;
      window.$R$.removeEventListener = $R.removeEventListener;
      window.$R$.dispatchEvent = $R.dispatchEvent;
     }

    $R.dispatchEvent ('initConfig');

    $R.bootProgress.setCompleteCallback(function(){
     // System loading complete
     $R.dispatchEvent ('bootComplete');

     if ( isMasterMode() )
      {
       $R.addEventListener('initCOMMap:ready:once', function(){
        if ($R.config.client.purl == true) initRouter();
        else renderInitialPage();        
       });
      }

     if ( isSlaveMode() )
      {
       window.$R$.module = $R.module;
       _procReady();
      }
    });

    initTools();
    initCOM();

    initStorage();
    initBrowser();
    initCOMDefinitions();
    procOnBoot();

    $R.bootProgress.doStep('onEventLoad').setMessage('System event provider loaded');
   };
   /*[include src="generic/event.js"]*/
   onEventLoad();
  };

 function initConfig ()
  {
   $R.url = function url (path)
    {
     var a = $R.config.client.url;
     var b = (typeof path == STRING) ? path : '';
     var c = a + ( (a.substr(a.length-1,1) == '/' && b.substr(0,1) == '/') ? b.substr(1) : b );
     return c;
    };
   $R.bootProgress.doStep('initConfig').setMessage('System config loaded');
  }

 function initTools ()
  {
   var onToolsLoad = function onToolsLoad () {
    $R.tools.makeCSSNodeByString = makeCSSNodeByString;
    $R.dispatchEvent ('initTools');
    $R.bootProgress.doStep('initTools').setMessage('System tools loaded');
   };
   /*[include src="generic/tools.js"]*/
   onToolsLoad();
  }

 function initCOM ()
  {
   var onCOMLoad = function onCOMLoad () {
    $R.bootProgress.doStep('initCOM').setMessage('COM logic loaded');
   };
   /*[include src="generic/com.js"]*/
   onCOMLoad();
  }

 function initStorage ()
  {
   var onStorageLoad = function onStorageLoad () {
    $R.dispatchEvent ('initStorage');
    $R.bootProgress.doStep('initStorage').setMessage('System storage init process complete');
   };
   /*[include src="generic/storage.js"]*/
   onStorageLoad();
  };

 function isMasterMode ()
  {
   var env = $R.config.generic.environment;
   return (env.mode == env.modes.MASTER);
  };
 $R.isMasterMode = isMasterMode;

 function isSlaveMode ()
  {
   var env = $R.config.generic.environment;
   return (env.mode == env.modes.SLAVE);
  };
 $R.isSlaveMode = isSlaveMode;

 function initRouter ()
  {
   /*[include src="generic/router.js"]*/
  }

 function renderInitialPage ()
  {
   if ($R.page.defined()[$R.config.generic.page['default'].name] == null)
    {
     (new $R.progressBar).pushStep('renderInitialPage').show()
     .setMessage ('The application did not configured yet for master mode.<br />The reason - default page did not described.');
     return;
    }
   $R.page.get($R.config.generic.page['default'].name).show();
  }

 var _onBoot = [];

 function procOnBoot ()
  {
   for (var i=0; i<_onBoot.length; i++)
    {
     try
      {
       _onBoot[i]();
       $R.bootProgress.doStep('onBoot');
      }
     catch(e)
      {
       $R.error($R.error.core, 'Javascript exception in boot process', null, {
        message: e.message,
        stack: (typeof e.stack != UNDEFINED) ? e.stack : e,
        source: _onBoot[i]
       });
       throw e;
      };
    }
   _onBoot = [];
  }

 function onBoot (fn)
  {
   $R.bootProgress.pushStep('onBoot');
   if(typeof fn == FUNCTION)
    {
     _onBoot.push(fn);
    }
   else
    {
     $R.error($R.error.core, 'Boot process definition error', null, {
      message: 'Boot process is not a function',
      source: fn
     });
     throw 'Boot process is not a function';
    }
  }

 function initBrowser ()
  {
   onBoot(function(){
    var node = document.getElementsByTagName('html')[0];
    var b = $R.tools.browser;
    $R.tools.addClass(node, [b.isMobile() ? 'mobile' : '', b.engine(), b.os()]);    
   });
  }

 function initCOMDefinitions ()
  {
   onBoot(function(){
    $R.addEventListener('initCOM:ready:once', function(){
     /*[include src="js/map.js"]*/
     $R.dispatchEvent('initCOMMap');
    });
   });
  }

 /*[include src="js/inc.js" default="'done';"]*/

 __construct();
} (window, document, location, Array, Number, String));