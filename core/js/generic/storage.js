(new function($R){

  /**
   * window.localStorage cookie-based implementation for old browsers.
   * 
   * @link https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Storage?redirectlocale=en-US&redirectslug=DOM%2FStorage
   */
  try {
   if (!window.localStorage) {
     window.localStorage = {
       getItem: function (sKey) {
         if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
         return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
       },
       key: function (nKeyId) {
         return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
       },
       setItem: function (sKey, sValue) {
         if(!sKey) { return; }
         var exp = new Date((new Date).getTime() + 365*24*60*60*1000);
         document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires="+exp.toGMTString()+"; path=/";
         this.length = document.cookie.match(/\=/g).length;
       },
       length: 0,
       removeItem: function (sKey) {
         if (!sKey || !this.hasOwnProperty(sKey)) { return; }
         document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
         this.length--;
       },
       hasOwnProperty: function (sKey) {
         return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
       }
     };
     window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
   }
  } catch (e) { console.log('The localStorage HTML5 feature is not available and can not to be emulated.'); };

 $R.storage = new function storage ()
  {

   var memory = {};
   var local = (window.localStorage == null) ? {} : window.localStorage;
   var remote = {};

   function __construct ()
    {
     
    }

   function makeKey (type, key)
    {
     var o = {'memory': '$R.m.', 'local': '$R.l.', 'remote': '$R.r.'};
     return o[type] + key;
    }

   function dispatchStorageEvent (key, newValue, storageArea)
    {
     $R.dispatchEvent('storage', {
       key: key,
       newValue: newValue,
       storageArea: storageArea
     }, this);
    }

   function set (key, value)
    {
     memory[makeKey('memory',key)] = value;
     dispatchStorageEvent(key, value, 'memory');
    };

   function get (key)
    {
     return (memory[makeKey('memory',key)] == null) ? null : memory[makeKey('memory',key)];
    };

   function localSet (key, value)
    {
     local.setItem(makeKey('local',key), JSON.stringify(value));
     dispatchStorageEvent(key, value, 'local');
    };

   function localGet (key)
    {
     return JSON.parse(local.getItem(makeKey('local',key)));
    };

   function remoteSet (key, value)
    {
     //TODO: Should to be implemented
     //STUB:
     local.setItem(makeKey('remote',key), JSON.stringify(value));
     dispatchStorageEvent(key, value, 'remote');
    };

   function remoteGet (key)
    {
     //TODO: Should to be implemented
     //STUB:
     return JSON.parse(local.getItem(makeKey('remote',key)));
    };

   this.set = set;
   this.get = get;
   this.permanent = {};
   // localStorage
   this.permanent.local = {};
   this.permanent.local.set = localSet;
   this.permanent.local.get = localGet;
   // serverStorage
   this.permanent.remote = {};
   this.permanent.remote.set = remoteSet;
   this.permanent.remote.get = remoteGet;

   __construct();
  };

}($R));