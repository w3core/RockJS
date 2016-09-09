(new function ($R) {
 
 function read ()
  {
   // http://{application.url}/#{page}[ ?{options} ]
   if (!$R.config.client.purl) return;
   var o = $R.tools.parseRequest(location.hash.substring(1));
   return {
    name: (o.path[0] && $R.page.defined()[String(o.path[0])]) ? String(o.path[0]) : $R.config.generic.page['default'].name,
    options: o.query
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
   var ie = !!(window.addEventListener == null);
   window[!ie?'addEventListener':'attachEvent'](!ie?'hashchange':'onhashchange', exec, false);
  }

 __construct();

 $R.router = new function router () {} ();
 $R.router.read = read;

} ($R));