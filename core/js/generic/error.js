(new function($R){

 var Prefixes = {core:'r:', system:'s:', component:'c:', application:'a:'}; 

 var Errors = new function Errors (){}();
 for (var i in Prefixes) Errors[i] = [];

 function type (code)
  {
   var t = 'system';
   if (typeof code == STRING)
    {
     for (var i in Prefixes)
      {
       if (code.toLowerCase().indexOf(Prefixes[i]) === 0)
        {
         t = i;
         break;
        }
      }
    }
   return t;
  }

 function code (str)
  {
   var v = 0;
   if (Number(str) >= 0) v = str;
   else
    {
     var m = String(str).match(/^[a-z]\:([0-9]+)$/i);
     if (!!m) v = m[1];     
    }
   return Number(v);
  }

 $R.error = function error (code, message, target, dump)
  {
   var o = (Error != null) ? new Error : new function Error(){}();
   o.code = code; o.type = type(code); o.message = message; o.target = target; o.dump = dump;
   Errors[o.type].push(o);
   var t = 'Error';
   if (code != null) t += ' '+code;
   if (typeof message == STRING) t += ': '+message;
   $R.log(t, o);
   if ($R.dispatchEvent != null) $R.dispatchEvent('error', o, target);
   return o;
  };

 $R.error.type = type;
 $R.error.code = code;

 function makeCodeBuilder (type)
  {
   $R.error[type] = function (code) {return Prefixes[type] + (Number(code) || 0);};
  }

 for (var i in Prefixes) makeCodeBuilder(i);

 $R.errors = function errors () {return Errors;};
}($R));