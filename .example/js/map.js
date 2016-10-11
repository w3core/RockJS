/**
 * Application pages mapping
 * 
 * Usage example:
 * --------------
 *  $R.page
 *    .define(name)
 *    .name (name)
 *    .title(title)
 *    .options(options)
 *    .layout(id, name, options, callback)
 *    .module(location, position, id, name, options, callback)
 *  ;
 */

$R.page.define($R.config.generic.page['default'].name)
  .title('Example')
  .module('area-example', 0, null, 'example')
  // ...
  // .module('area-content', 20, null, 'example')
  ;