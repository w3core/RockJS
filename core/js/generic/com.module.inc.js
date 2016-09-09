(new function ($R) {

 var Globals = new group();
 $R.addEventListener('pageShow', function(e){ Globals.show(e.target); });
 $R.addEventListener('pageHide', function(e){ Globals.hide(e.target); });
 //-------

 $R.module = new function module () {} ();

 $R.module.group = group;

 $R.module.all = function all ()
  {
   return getAllComponentsByType('module');
  };

 $R.module.getById = function getById (id)
  {
   return getComponentById(id, 'module');
  };

 $R.module.getInstanceById = function getInstanceById (id, name, options, callback)
  {
   return getComponentInstanceById('module', id, name, options, callback);
  };

 $R.module.getByName = function getByName (name)
  {
   return getComponentsByName('module', name);
  };

 $R.module.make = function make (id, name, options, callback)
  {
   return makeComponentInstance('module', id, name, options, callback);
  };

 $R.module.globals = Globals;

} ($R));