(new function($R){

 $R.eventFactory = function eventFactory (that)
  {
   var that = (typeof that == OBJECT && that != null) ? that : this;
   var __events = {};

   /**
    * Event object
    *
    * @param type
    *         {String} A string representing the event type to listen for
    * @param target
    *         {Object} An object representing the source that triggered the event
    * @param data
    *         {Object} An object representing the event data that was triggered
    * @param preventDefault
    *         {Function} Cancels the event if it is cancelable, without stopping
    *         further propagation of the event
    * @param stopPropagation
    *         {Function} Prevents further propagation of the current event.
    * @returns {Event}
    */
   function Event (type, target, data, preventDefault, stopPropagation)
   {
    var that = this;
    that.type = (typeof type == STRING) ? type : null;
    that.target = (typeof target == OBJECT) ? target : null;
    that.data = (typeof data != UNDEFINED) ? data : null;
    that.preventDefault = function(){ that.returnValue = false; that.defaultPrevented = true; __preventDefault(type, that, preventDefault); };
    that.stopPropagation = function(){ that.returnValue = false; that.propagationStopped = true;  __stopPropagation(type, that, stopPropagation); };
    that.defaultPrevented = false;
    that.propagationStopped = false;
    that.returnValue = true;
   }

   /**
    * Allows the registration of event listeners on the event or list of events
    *
    * @param type
    *         {String | Array} A string or array representing the event type or
    *         list of event types to listen for
    * @param listener
    *         {Function} A function that receives a notification when an event of
    *         the specified type occurs
    * @returns
    */
   function addEventListener (type, listener)
   {
    var e = parseEventTypeList(type);
    for(var i in e)
    {
     var evt = parseEventType(e[i]);
     if( evt.signs.toString().indexOf('once') >= 0 && evt.signs.toString().indexOf('ready') >= 0 )
     {
      _addReadyOnceEventListener(evt.name, listener);
     }
     else if( evt.signs.toString().indexOf('once') >= 0 )
     {
      _addOnceEventListener(evt.name, listener);
     }
     else if( evt.signs.toString().indexOf('ready') >= 0 )
     {
      _addReadyEventListener(evt.name, listener);
     }
     else
     {
      _addEventListener(evt.name, listener);
     }
    }
   };

   /**
    * Allows the removal of event listeners on the event or list of events
    *
    * @param type
    *         {String | Array} A string or array representing the event type or
    *         list of event types being removed
    * @param listener
    *         {Function} The listener parameter indicates the EventListener
    *         function to be removed
    * @returns
    */
   function removeEventListener (type, listener)
   {
    var e = parseEventTypeList(type);
    for(var i in e)
    {
     var evt = parseEventType(e[i]);
     var n = ns(evt.name);
     if
     (
      typeof listener == FUNCTION
      && typeof listener.__events == OBJECT
      && listener.__events != null
      && typeof listener.__events[n] == FUNCTION
     ) listener.__events[n]();
    }
   };

   /**
    * Allows to send the event to the subscribed event listeners
    *
    * @param type
    *         {String} A string representing the event type that should to be
    *         dispatched
    * @param data
    *         {Object} An object representing the event data that was triggered
    * @param target
    *         {Object} Custom event target. An object representing the source
    *         that triggered the event.
    * @param preventDefault
    *         {Function} The function which can be called by listener that
    *         cancels the event without stopping further propagation of the event
    * @param stopPropagation
    *         {Function} The function which can be called by listener that
    *         prevents further propagation of the current event
    * @param dispatchComplete
    *         {Function} The function that will called after event dispatching
    *         process will be completed
    * @returns
    */
   function dispatchEvent (type, data, target, preventDefault, stopPropagation, dispatchComplete)
   {
    var event = touch(type);
    // Select which event target will passed (custom target or target that was defined as default by addEvent method)
    var eventTarget = (typeof target == OBJECT && target != null) ? target : event.target;
    var e = new Event(type, eventTarget, data, preventDefault, stopPropagation);
    event.lastDispatched = e;

    function asyncExecDispatchComplete ()
    {
     setTimeout(function(){
      if(typeof dispatchComplete == FUNCTION)
       {
        dispatchComplete(e);
       }
       event.dispatchComplete(e);
     },0);
    }

    var c = 0;

    function asyncExecListener (fn)
    {
     c++;
     setTimeout(function(){
      if(e.propagationStopped === true)
      {
       return;
      }
      try
      {
       if(fn.__events != null && typeof fn.__events[ns(type)] == FUNCTION)
       {
        if(fn(e) === false)
        {
         e.returnValue = false;
        }
       }
      }
      catch(err)
      {
       throw err;
      };
      c--;
      if(c <= 0 || e.propagationStopped === true)
       {
        asyncExecDispatchComplete();
       }
     },0);
    }

    if (!event.listeners.length) asyncExecDispatchComplete();
    else
    {
     for(var i in event.listeners)
     {
      if(typeof event.listeners[i] == FUNCTION) asyncExecListener(event.listeners[i]);
     }      
    }

   };

   /**
    * Allows to define common event processing handlers for the specified event
    * type
    *
    * @param type
    *         {String} A string representing the event type
    * @param target
    *         {Object} Default event target. An object representing the source
    *         that triggered the event.
    * @param preventDefault
    *         {Function} The function which can be called by listener that
    *         cancels the event without stopping further propagation of the event
    * @param stopPropagation
    *         {Function} The function which can be called by listener that
    *         prevents further propagation of the current event
    * @param dispatchComplete
    *         {Function} The function that will called after event dispatching
    *         process will be completed
    * @returns
    */
   function addEvent (type, target, preventDefault, stopPropagation, dispatchComplete)
   {
    var e = touch(type);
    if(typeof target == OBJECT)
    {
     e.target = target;
    }
    if(typeof preventDefault == FUNCTION)
    {
     e.preventDefault = preventDefault;
    }
    if(typeof stopPropagation == FUNCTION)
    {
     e.stopPropagation = stopPropagation;
    }
    if(typeof dispatchComplete == FUNCTION)
    {
     e.dispatchComplete = dispatchComplete;
    }
   };

   // @private

   function _addOnceEventListener (type, listener)
   {
    var original = listener;
    listener = function(e)
    {
     original(e);
     removeEventListener(type, listener);
    };
    _addEventListener(type, listener);
   };

   function _addReadyEventListener (type, listener)
   {
    _addEventListener(type, listener);
    var e = touch(type);
    if(e.lastDispatched instanceof Event && typeof listener == FUNCTION)
    {
     _procListenerForLastDispatchedEvent(type, listener);
    }
   };

   function _addReadyOnceEventListener (type, listener)
   {
    var e = touch(type);
    if(e.lastDispatched instanceof Event && typeof listener == FUNCTION)
    {
     _procListenerForLastDispatchedEvent(type, listener);
    }
    else
    {
     _addOnceEventListener(type, listener);
    }
   };

   function _procListenerForLastDispatchedEvent (type, listener)
    {
     var e = touch(type);
     if(e.lastDispatched instanceof Event && typeof listener == FUNCTION)
     {
      // prepare initial state for last dispatched event
      e.lastDispatched.defaultPrevented = false;
      e.lastDispatched.propagationStopped = false;
      e.lastDispatched.returnValue = true;
      try
      {
       if(listener(e.lastDispatched) === false)
       {
        e.lastDispatched.returnValue = false;
       }
      }
      catch(err)
      {
       throw err;
      };
      e.dispatchComplete(e.lastDispatched);
     }
    };

   function _addEventListener (type, listener)
   {
    if(typeof listener != FUNCTION) return;
    var id = touch(type).listeners.length;
    var n = ns(type);
    listener.__events = (typeof listener.__events == OBJECT && listener.__events != null) ? listener.__events : {};
    listener.__events[n] = (typeof listener.__events[n] == FUNCTION) ? listener.__events[n] : function(){
     touch(type).listeners[id] = void(0);
     listener.__events = void(0);
    };
    touch(type).listeners[id] = listener;
   };

   function __preventDefault (type, event, preventDefault)
   {
    // Call custom defined (via dispatchEvent) for current preventDefault function
    if(typeof preventDefault == FUNCTION)
    {
     preventDefault(event);
    }
    // Call common defined (via addEvent function) for current type preventDefault function
    touch(type).preventDefault(event);
   };

   function __stopPropagation (type, event, stopPropagation)
   {
    // Call custom defined (via dispatchEvent) for current stopPropagation function
    if(typeof stopPropagation == FUNCTION)
    {
     stopPropagation(event);
    }
    // Call common defined (via addEvent function) for current type stopPropagation function
    touch(type).stopPropagation(event);
   };

   function ns (type)
   {
    return type.toLowerCase();
   };

   function touch (type)
   {
    var name = ns(type);
    __events[name] = (typeof __events[name] == OBJECT && __events[name] != null) ? __events[name] : {};
    __events[name]['target'] = (typeof __events[name]['target'] == OBJECT) ? __events[name]['target'] : null;
    __events[name]['preventDefault'] = (typeof __events[name]['preventDefault'] == FUNCTION) ? __events[name]['preventDefault'] : function(){};
    __events[name]['stopPropagation'] = (typeof __events[name]['stopPropagation'] == FUNCTION) ? __events[name]['stopPropagation'] : function(){};
    __events[name]['dispatchComplete'] = (typeof __events[name]['dispatchComplete'] == FUNCTION) ? __events[name]['dispatchComplete'] : function(){};
    __events[name]['listeners'] = (typeof __events[name]['listeners'] == OBJECT && __events[name]['listeners'] instanceof Array) ? __events[name]['listeners'] : [];
    __events[name]['lastDispatched'] = (typeof __events[name]['lastDispatched'] == OBJECT && __events[name]['lastDispatched'] instanceof Event) ? __events[name]['lastDispatched'] : null;
    return __events[name];
   };

   function parseEventTypeList (type)
   {
    var types = [];
    if (typeof type == OBJECT && type instanceof Array)
    {
     types = type;
    }
    else if (typeof type == STRING)
    {
     types = type.replace(/^\s+|\s+$/img, '').split(/[ ,]+/);
    }
    return types;
   };

   function parseEventType (type)
   {
    var signs = [];
    (typeof(type)==STRING?type:'')
    .replace(/^[^\:]+/, '')
    .replace(/\:([a-z]+)/g, function(a,b){signs.push(b);});

    var matchEvent = /^([^:]+)/.exec(type);

    return {
      name: (matchEvent == null || typeof matchEvent[1] != STRING) ? type : matchEvent[1],
      signs: signs
     };
   };
   
   // @public

   that.addEventListener = addEventListener;
   that.removeEventListener = removeEventListener;
   that.dispatchEvent = dispatchEvent;
   that.addEvent = addEvent;

   // aliases
   that.on = addEventListener;
   that.off = removeEventListener;
   that.emit = dispatchEvent;
 };

}($R));