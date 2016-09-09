(function(){
  var generic = {};

  generic.debug = {};
  generic.debug.status = true;
  /**
   * Indicates that HTML & CSS code will minified on fly.
   * It allows to see how it will on production, but without static bundle creation.
   * But also this option has negative affect to performance for debug mode only.
   * NOTE: When HTML code is minified the spaces around of HTML tags is removed, 
   * that have affect UI
   */
  generic.debug.minify = false;

  generic.environment = {};

  generic.environment.modes = {};
  generic.environment.modes.MASTER = 'master';
  generic.environment.modes.SLAVE = 'slave';

  /**
   * Available modes:
   *
   *  generic.environment.modes.MASTER:
   *   Self-contained mode - that means the engine uses
   *   pages and layouts which was predefined by configuration
   *
   *  generic.environment.modes.SLAVE:
   *   Slave mode - that means the engine will driven by other
   *   environment. The engine provides only module logic for this case
   *
   * SLAVE mode usage example:
   * 
   * [body]
   * [script type="text/javascript" src="http(s)://path.to.slave.app.host/bootstrap.js"][/script]
   * 
   * [script type="text/javascript"]
   *  $R$.ready(function(){
   *
   *   console.log($R$);
   *
   *   var moduleExample = $R$.module.make(null, 'example', {});
   *   document.body.appendChild(moduleExample.options.DOM);
   *   moduleExample.show({a:1});
   *
   *  });
   * [/script]
   *
   */
  generic.environment.mode = generic.environment.modes.MASTER;

  generic.bootstrap = {};
  generic.bootstrap.progress = true; // Enable/disable bootstrap progress bar

  generic.modules = {};
  generic.modules.url = '/modules';

  generic.layouts = {};
  generic.layouts.url = '/layouts';

  generic.page = {};
  generic.page["default"] = {};
  generic.page["default"].name = 'example';

  generic.layout = {};
  generic.layout["default"] = {};
  generic.layout["default"].name = 'example';

  var client = {};

  //External URL
  client.url = './';
  
  //Allows use URL for page requests [ http://.../#pageName/?var1=val1&...&varN=valN ]
  client.purl = true;

  return {generic:generic, client:client};
}());