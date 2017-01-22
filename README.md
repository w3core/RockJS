# RockJS

The next generation single-page application framework.

Table of contents
===

* [Introduction](#introduction)
* [Lineaments](#lineaments)
* [Requirements](#requirements)
* [Installation](#installation)
* [Quick Start Guide](#quick-start-guide)
  * [CLI](#cli)
  * [Hello World!](#hello-world)
* [Events system](#events-system)
  * [Event body](#event-body)
  * [Event prefix](#event-prefix)
  * [Event methods](#event-methods)
  * [Usage example](#usage-example)
* [Module](#module)
* [Module Manager](#module-manager)
* [Layout](#layout)
* [Page](#page)
* [Routing](#routing)
* [Content delivery](#content-delivery)
* [Embedding](#embedding)
* [Templating and Precaching](#templating-and-precaching)
* [System Events](#system-events)
* [Bootstrap and loading progress](#bootstrap-and-loading-progress)
* [Logging and Mobile debugging](#logging-and-mobile-debugging)


Introduction
---

You can skip out this framework if you need some solution to create simple and
tiny business card site.

RockJS is a high performance cross-browser framework that allows to create a
powerful Desktop, Android or iOS native-like applications with a big amount of
UI components.

This framework contains only those features that really needed.
It does not implements so popular things as observing, data-binding, etc.
because behind the scenes, implementation of this things requires invalidation
of all levels of object when only one property has been changed.
It's lead to low performance UI and rapid discharging of the battery on device.

RockJS has really small size that allows to decrease loading time and show
first screen.

![RockJS Size][image.1]

Let's check loading speed for minimal application.
Connection speed will be decreased to regular 2G (300ms, 250kbit/s, 50kbit/s)
to simulate real-world conditions for mobile devices.

![RockJS speed][image.2]

However, RockJS is well-structured modular framework that provides a list of
features from the box that really needed in any powerful application such as:
* Builtin lazy loading pattern;
* Cross-browser routing;
* Ability for precaching of any components in the main bundle;
* Builtin an application build system that supports uglification for HTML,JS and CSS too;
* Command line interface to create of new instances of application/layout/module;
* etc.


Basically, the page creation is based on the following structure:
* Modules aka Components (overwritable onCreate, onShow, onHide, etc.);
* Layouts (same as modules but used to describe page layout with areas for modules placements);
* Pages (simple definition what should be used: name, route, layout, modules with their location in layout);

Visually it can be shown as follow:
![RockJS Structure][image.3]


Lineaments
---

RockJS never re-rendering no one component instance if it's not required.

Any resources of components such as DOM and stylesheets will be mounted to the
document only when component is defined in the page layout and the page is shown.
Otherwise, these resources will be unmounted from document when page will be hided.

RockJS allows to create manually and use single instance of component for many
pages at the same time.

RockJS is an event based framework that means that any component will be notified
about any changes of state and can handle these changes any time.


Requirements
---
The only thing that you need is PHP command line interface which used for
application build process (see: [here][1]).


Installation
---
Clone or download sources to something like `rockjs` directory.
This directory will be used for the building of all your projects.

Also, for best usability you can define value of
`/path/to/your/rockjs/cli` into the system `PATH` environment.


Quick Start Guide
---

To create new application, layout, module or for the runing of build application
process you can use command line interface (CLI).

### CLI

1. To show CLI help dialog you can run:
   ```bash
   $ php rockjs/cli
   ```

   Returns something like that:

   ```bash
   RockJS v3.0.0
   =============
   Usage: php cli [command] <option> <value>

   Available commands:
   ------------------
    -h, --help               Show this dialog
    app <path>               Create new application in the <path> directory otherwise current directory
    layout <path>            Create new layout in the <path> directory otherwise current directory
    module <path>            Create new module in the <path> directory otherwise current directory
    deploy <option> <value>  Deploy an application
      -s, --source <path>       Path to the source codes directory otherwise current directory
      -d, --destination <path>  Path to the destination (deployment) directory
      -m, --minify <list>       Default: "html,js,css" Comma-separated list of file types to be minified otherwise "none"
   ```

2. Create new application in the <path> directory otherwise current directory if not defined.
   > Note that the directory should be empty!

   ```bash
   $ php rockjs/cli app <path>
   ```

3. Create new layout in the <path> directory otherwise current directory if not defined.
   > By default, you should create layouts in the `your/app/layouts` directory.
   > Note that layout name will be same as his directory name.

   ```bash
   $ php rockjs/cli layout <path>
   ```

4. Create new module in the <path> directory otherwise current directory if not defined.
   > By default, you should create modules in the `your/app/modules` directory.
   > Note that module name will be same as his directory name.

   ```bash
   $ php rockjs/cli module <path>
   ```

5. Deploy an application (see detals [here][cli]).

   ```bash
   $ php rockjs/cli deploy <option> <value>
   ```

> An example of usage you can find in [cli.example.sh][cli.example.sh]
> (for macOS/OS X and Linux) and [cli.example.bat][cli.example.bat] for Windows.

### Hello World!

An application should contain at least one `module`.
If you going to define one or more pages then you should to have
at least one `layout`.

*So, let's go!*

1. Open you console and run the following command to create an empty
   `awesome` application:
   ```bash
   $ php rockjs/cli app ./projects/awesome
   ```

  *Excellent!*
  Your `awesome` project has been created in the `projects` directory.

  As you can see `awesome` directory contains the following:

  * `[layouts]` - the directory where should be placed application layouts

  * `[modules]` - the directory where should be placed application modules

  * `[js]` - the directory where you can place some general scripts, some
     third-party `libs`, etc.
     Also you can see the following files in this directory:

     * `config.js` - an application configuration file;

     * `inc.js` - the file that will be placed to the main bundle
        and allows to control bootstrap logic;

     * `map.js` - the file where you can to define your pages

  * `index.html` - Point of entry to your application.

2. Create your first module from console:

   ```bash
   $ php rockjs/cli module ./projects/awesome/modules/hello
   ```

   Right now your first module `hello` has been created as a directory and
   contains the following files:

   * `script.js` - Module controller

   * `index.html` - Module markup

   * `style.css` - Module stylesheet

   > For now we will skip details.
   > More detailed documentation you can find below.

   Just put these strings to below files:

   `index.html`:
   ```xml
   <button class="clickMe">Click me!</button>
   ```

   `style.css`:
   ```css
   #this {text-align: center;}
   #this .clickMe {font-size: 3em;}
   ```

   `script.js`:
   ```javascript
   function module_hello ($R, $O) {
     this.html = String(/*[include src="index.html" format="STRING"]*/);
     this.css = String(/*[include src="style.css" format="STRING"]*/);
     this.node = {button: ".clickMe"};
     this.onCreate = onCreate;

     function onCreate (options) {
       $O.node.button.addEventListener("click", function(e){
         alert("Hello!");
       }, !1);
     }
   }
   ```

3. Create your first layout from console:

   ```bash
   $ php rockjs/cli layout ./projects/awesome/layouts/main
   ```

   > Layout structure and logic is the same as for modules, excluding some of
   > extra features.

   For the first time we should only to create the `landing area` where will
   be placed module(s). Practically, it should be HTML tag with unique `className`.
   The `className` will be used as identifier of landing area when you will
   define any page by using this layout.
   So, please open the `layouts/main/index.html` file from your favorite IDE
   and put there something like:
   ```xml
   <div class="area-1"></div>
   ```

4. Minimal configuration.
   Before you start to create your first page, you should to configure defaults
   for the page name and layout name that will be used as fallback.

   Open the `js/config.js` file and modify values for the following options:

   `js/config.js`
   ```javascript
   // any name as you wish
   generic.page["default"].name = "index";

   // the name of layout that you will use by default for all pages
   generic.layout["default"].name = "main";
   ```

   **At the moment, we have all that needed to define the page.**

5. Create your first (default) page.

   Open the `js/map.js` file and put there these strings:

   `js/map.js`:
   ```javascript
   $R.page
     .define($R.config.generic.page['default'].name) // the page name
     .title('Hello World!')
   //.layout(id, name, options, callback) // we will not to define layout because using default layout
     .module('area-1', null, null, 'hello') // our module
   //...
   ;
   ```

6. Build your application from console to any empty directory:
   ```bash
   $ php rockjs/cli deploy -s ./projects/awesome -d ./httpserver/public/awesome
   ```

   That's all. Your `awesome` application has been compiled to the static
   lazy-loading application in the `./httpserver/public/awesome` directory.


Events system
---

Internally, RockJS is an event-based asynchronous framework.
Any component can handle and emit internal and external events.

### Event body

An event is an object with the following structure:

|   Type   | Name                 | Default |
|----------|--------------------- |---------|
| String   | `type`               | ''      |
| Object   | `target`             | null    |
| Mixed    | `data`               | null    |
| Function | `preventDefault()`   | null    |
| Function | `stopPropagation()`  | null    |
| Boolean  | `defaultPrevented`   | false   |
| Boolean  | `propagationStopped` | false   |
| Boolean  | `returnValue`        | true    |


### Event prefix

An event system is extended by the special pseudo-prefixes such as
`:ready` and `:once`.

As for developer, these pseudo-prefixes, especially `:ready` allows
to solve most of the day-to-day issues and simplify the code.

The most often case for asynchronous system is when the component that
has handler for some event has been loaded after then the event
has been dispatched.

`:ready` - Indicates that the listener should be called even if the event
has been emitted before the listener was added.

`:once`  - Indicates that the listener should be unsubscribed at once event
will emitted.


### Event methods

To handle or emit an external events can be used these methods:

* `$R.on (types, listener)` - The method registers the specified listener for single
  or multiple space or comma separated events;
  Any event that passed as argument can contain any combination of pseudo-prefixes.

* `$R.off (types, listener)` - The method removes single or multiple space or comma
  separated events listener that was previously registered;

* `$R.emit (type, data, target, preventCallback, stopCallback, completeCallback)` - Asynchronously
  calls each of the listeners registered for the event `type`, passing the supplied `data` and
  `target` to each.

  Also, an emmiter can handle calling of `preventDefault()`, `stopPropagation()` and
  complete of execution process;

  > Note that only first argument `type` is required.

#### Usage example
```javascript

$R.emit("user.accepted", {
  "id": 12345,
  "email": "lorem.ipsum@dolor.sit"
});

//...

function listener (e) {
  console.log(e);
  e.stopPropagation();
}

$R.on("user.accepted:ready:once, user.rejected:ready, user.update", listener);

```


Module
---

What is the module?
Module is a component. In other words, a part or element of a larger whole and
logically allocated part of the page.

For the RockJS, component is a class that has independent DOM model and working
by using declaration of special public properties and methods.

Every instance of component will be created by passing of two arguments:

* `$R` - an instance of application that created by RockJS.
  This is an object that contains a many of global features within an anonymous
  environment (such as configuration, pages helper, modules helper, tools,
  and many many more);

* `$O` - an instance of environment for the component, that contains references
  to the DOM model, used by component DOM nodes (for the case when the component
  has defined `this.node` property), instance of spinner, templating helpers, etc.

To handling the global environment changes a component can define the following
methods:

* `onRequest (options)` - This method can be used to communicate between components
  even when component instance was not created yet;

* `onCreate (options)` - This method will be called once when component instance
  has been created and environment of component `$O` is completely ready;

* `onShow (options, page)` - This method will be called every time when component
  instance should be shown;

* `onHide (options, page)` - This method will be called every time when component
  instance should be hidden;

> Note that these methods can be called also by an another components that includes
> the component inside.

Also, component can handle and emit both internal and/or external events.
To create an internal event environment you can use `$R.eventFactory (this)` class,
that extends your `this` object with internal event system.

*For example:*

```javascript
function module_loremIpsum ($R, $O) {
  var that = this;

  constructor();

  function constructor () {
    new $R.eventFactory(that);
    // After this call your module will be extended with the following methods:
    // this.on(type, listener);
    // this.off(type, listener);
    // this.emit(type, data, target, preventCallback, stopCallback, completeCallback);
  }

}
```

Module manager
---

To manipulate with modules inside an application (for example: getting a class or
instance of module, embed one module or group of modules to another one, etc.)
can be useful Module Manager `$R.module` that provides following features.

#### $R.module.make(id, name, options, callback)
Creates and immediately returns an instance of module even if the module was
not loaded yet. It allows to show, hide or do any requests to the module
without waiting for loading.
The spinner inside the module will be shown while it's not available yet.
Any requests to the module will be added to queue and executed when the module
logic will be available.

| Argument   | Type                | Description
|------------|---------------------|-------------------------------
| `id`       | *optional* String   | An unique custom identifier that allows instance selection of the module by ID.
| `name`     | *required* String   | An unique name of the module that required for loading module.
| `options`  | *optional* Object   | An object of options that should be passed to the module to create instance of module with specific options. These options will be passed to `onCreate (options)` method of the module.
| `callback` | *optional* Function | The function that should be called when instance of the module will be created.

For example:
```javascript

var articleModule = $R.module.make(null, "article", {id: 12345}, function (article){
  console.log(article);
  // You can call any internal method of the module
  article.instance.anyInternalMethod();
});
```

#### $R.module.getById (id)
Return an instance of module that was created with specified ID.

> Considering to the fact that application has implementation of Lazy Loading
> pattern, the desired module can be not defined at the moment yet.
> In this case, you can add your handler for the `componentCreate` event.
> For example:

```javascript
var userModuleInstance = $R.module.getById("user");

if (!userModuleInstance) {
  $R.on("componentCreate:ready", listener);

  function listener (e) {
    if (e.target.options.id == id) {
      userModuleInstance = e.target;
      $R.off("componentCreate", listener);
    }
  }
}
```

#### $R.module.getInstanceById (id, name, options, callback)
Same as `$R.module.getById (id)` excluding the fact that the instance of the
module will be created if not exists yet.

#### $R.module.getByName (name)
Returns an array of all instances of module by name that already exists.

#### $R.module.all ()
Returns an array of all instances of modules that has created in application
at the moment.

#### $R.module.group()
This class allows to create a wrapper module to group any amount of module
instances and control them at the same time.
An instance of this class provides the following methods.

#### $R.module.group().push (module, DOMNode)
This method allows to push an instance or array of instances of modules
to the group. As optional, you can define the DOM node where an instance(s)
should be injected.

#### $R.module.group().eject(module)
This method ejects any instance of module from group.

#### $R.module.group().show (options)
This method turns on all instances of modules in group to show.
As optional, you can to define any options that will be passed for showing.

#### $R.module.group().hide (options)
This method turns off all instances of modules in group by calling of `onHide` method.
As optional, you can to define any options that will be passed for hiding.

#### $R.module.group().request (options)
This method allows to call `onRequest` method for all instances of modules
in group at same time.

** Usage example: **
```javascript
var myGroup = new $R.module.group();

myGroup.push(headerInstance)
       .push(footerInstance)
       .push([leftSide, rightSide], pannelsNode)
       .show({
       	 lorem: "Ipsum",
         sit: "Amet"
       });

setTimeout(function(){
  myGroup.hide().eject([leftSide, rightSide]);
}, 2e3);
```

Layout
---
*TBD*

Page
---
*TBD*

Routing
---
*TBD*

Content delivery
---
*TBD*

Embedding
---
*TBD*

Templating and Precaching
---
*TBD*

System Events
---
*TBD*

Bootstrap and loading progress
---
*TBD*

Logging and Mobile debugging
---
*TBD*



[image.1]: http://image.prntscr.com/image/b97b2b928a8c46e9a2ec91297a0d815d.png
[image.2]: http://image.prntscr.com/image/36f21e387b464d1dbe5a5947c85bd9c4.png
[image.3]: http://image.prntscr.com/image/f1234ff6a246416f938ec9c8e2344809.png

[cli.example.sh]: https://github.com/w3core/RockJS/blob/master/cli.example.sh
[cli.example.bat]: https://github.com/w3core/RockJS/blob/master/cli.example.bat

[1]: https://secure.php.net/manual/en/features.commandline.usage.php

*to be continued...*
