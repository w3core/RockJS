(new function($R){

 $R.progressBar = function progressBar ()
  {
   var that = this;
   var autoDestruct = true;
   var html = progressBarMarkup.html;
   var node;
   var completeMessage = 'Process complete';
   var total = 0;
   var passed = 0;
   var signs = {};
   var stepCallback = null;
   var completeCallback = null;

   function __construct ()
    {
     var o = document.createElement('div');
     o.innerHTML = html;
     node = o.querySelector('.loading-progress');
     if (node != null) node.parentNode.removeChild(node);
    }

   function __destruct ()
    {
     that.hide();
     node = null;
    }

   function recalc()
    {
     var v = Math.round( (100 * passed) / total );
     if(v > 100) v = 100;
     if(node != null)
      {
       var s = v==100?100:v<10?0:((v+'').match(/^\d/)[0]+'0');
       node.id = 'v'+s;
       node.querySelector('.value').innerHTML = v + '%';
       node.querySelector('.progress').style.width = v + '%';
      }
    }

   function Sign (name)
    {
     if (typeof name != STRING || !name.length) return;
     if (signs[name] == null) signs[name] = {total:0, passed:0};
     return signs[name];
    }

   function exec (action, sign, amount, fn)
    {
     if (typeof fn == FUNCTION) fn(action, sign, amount, Sign(sign), total, passed, signs, that);
    }

   function process (action, sign, amount)
    {
     var v = Number(amount);
     if (!v) v = 1;
     if (action == 'push')
      {
       total += v;
       Sign(sign).total += v;
      }
     else if (action == 'do')
      {
       passed += v;
       Sign(sign).passed += v;
      }
     recalc();
     exec(action, sign, v, stepCallback);
     if (total == passed)
      {
       that.setMessage(completeMessage);
       if (autoDestruct) __destruct();
       exec(action, sign, v, completeCallback);
      }
    }

   that.auto = function auto (bool)
    {
     if (typeof bool == BOOLEAN) autoDestruct = bool;
     if (total == passed && autoDestruct) __destruct();
     return that;
    };

   that.show = function show ()
    {
     if(node != null)
      {
       document.body.appendChild(node);
      }
     return that;
    };

   that.hide = function hide ()
    {
     if(node != null && node.parentNode != null)
      {
       node.parentNode.removeChild(node);
      }
     return that;
    };

   that.setMessage = function setMessage (msg)
    {
     if(node != null)
      {
       var o = node.querySelector('.message');
       while (o.firstChild) {o.removeChild(o.firstChild);}
       if (msg != null && typeof msg == OBJECT && typeof msg.nodeType == NUMBER) o.appendChild(msg);
       else o.innerHTML = String(msg);
      }
     return that;
    };

   that.setCompleteMessage = function setCompleteMessage (msg)
    {
     completeMessage = msg;
     return that;
    };

   that.setCompleteCallback = function setCompleteCallback (fn)
    {
     if(typeof fn == FUNCTION)
      {
       completeCallback = fn;
      }
     return that;
    };

   that.setStepCallback = function setDoStepCallback (fn)
    {
     if(typeof fn == FUNCTION)
      {
       stepCallback = fn;
      }
     return that;
    };

   that.pushStep = function pushStep (sign, num)
    {
     process('push', sign, num);
     return that;
    };

   that.doStep = function doStep (sign, num)
    {
     process('do', sign, num);
     return that;
    };

    __construct();
    that.destroy = function(){__destruct();};
    that.isAuto = function(){return !!autoDestruct;};
    that.node = node;
  };

 $R.spinners = new function spinners () {} ();

 $R.spinners['default'] = function ()
  {
   var o = document.createElement('div');
   o.className = 'spinner default';
   o.innerHTML = 'Please wait...';
   return o;
  };

 $R.spinners.defaultLight = function ()
  {
   var o = $R.spinners['default']();
   o.className += ' light';
   return o;
  };

 $R.spinners.defaultDark = function ()
  {
   var o = $R.spinners['default']();
   o.className += ' dark';
   return o;
  };

 $R.spin = function spin (DOMNode, spinNode)
  {
   var that = this;
   var DOM = (DOMNode != null && DOMNode.appendChild != null) ? DOMNode : null;
   var node = (spinNode != null && spinNode.tagName != null) ? spinNode : $R.spinners['default']();

   function isVisible ()
    {
     return (node != null && node.parentNode != null && node.parentNode.tagName != null) ? true : false;
    }

   function Node (spinNode)
    {
     if (spinNode != null && spinNode.tagName != null)
      {
       var wasVisible = isVisible();
       if (wasVisible) hide();
       node = spinNode;
       if (wasVisible) show();
      }
     return node;
    }

   function owner (DOMNode)
    {
     if (DOMNode != null && DOMNode.appendChild != null)
      {
       var wasVisible = isVisible();
       if (wasVisible) hide();
       DOM = DOMNode;
       if (wasVisible) show();
      }
     return DOM;
    }

   function show (DOMNode)
    {
     if (DOMNode != null && DOMNode.appendChild != null) owner(DOMNode);
     //if (!isVisible()) DOM.insertBefore(node, DOM.firstChild);
     if (!isVisible()) DOM.appendChild(node);
    }

   function hide ()
    {
     if (isVisible()) node.parentNode.removeChild(node);
    }

   that.node = Node;
   that.owner = owner;
   that.isVisible = isVisible;
   that.show = show;
   that.hide = hide;
  };

}($R));