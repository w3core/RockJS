(new function ($R) {

 var ie = !window.addEventListener, tools = $R.tools;

 function read () {
   if (!$R.config.client.purl) return;
   var page, url = location.hash.substring(1), si = url.indexOf('?'), pages = $R.page.defined(),
       path = si >= 0 ? url.substr(0, si) : url,
       qs = si >= 0 ? tools.normalize(tools.parseQueryString(url.substr(si+1, url.length))) : {}
   ;
   if (path[path.length-1] == '/') path = path.substr(0, path.length-1);
   for (var i in pages) {
     var opts = pages[i].get().route.match(path);
     if (opts) {
       page = {inf:pages[i], opts:tools.extend(opts, qs)};
       break;
     }
   }

   return {
     name: page ? page.inf.get().name : $R.config.generic.page['default'].name,
     options: page ? page.opts : qs
   };
 }

 function exec ()
  {
   var o = read();
   if (o == null)
    {
     if ($R.page.defined()[$R.config.generic.page['default'].name] == null)
      {
       (new $R.progressBar).pushStep('routerExecPageShow').show()
       .setMessage ('The application did not configured yet for master mode.<br />The reason - default page did not described.');
       return;
      }
     o = {
       name: $R.config.generic.page['default'].name,
       options: {}
     };
    }
   $R.dispatchEvent('execPageShow', o.options, $R.page.get(o.name));
  }

 function __construct ()
  {
   if (!$R.config.client.purl) return;
   exec();
   window[!ie?'addEventListener':'attachEvent'](!ie?'hashchange':'onhashchange', exec, false);
  }

 __construct();

 $R.router = new function router () {} ();
 $R.router.read = read;

} ($R));