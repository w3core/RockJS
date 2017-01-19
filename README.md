# RockJS

The next generation single-page application framework.

[TOC]

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
   or:
   ```bash
   $ php rockjs/cli -h
   ```
   or:
   ```bash
   $ php rockjs/cli --help
   ```
   Returns something like that:
   <a name="cli"></a>
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

Also, component can handle and emit global events by using of the following methods:

* `$R.on (types, listener)` - The method registers the specified listener on single
  or multiple space or comma separated events;

  Any event that passed as argument can contain any combination of pseudo-prefixes
  `:ready` and/or `:once`.

  * `:ready` - Indicates that the listener should be called even if the event has been
    emitted before the listener was added.

  * `:once`  - Indicates that the listener should be unsubscribed at once event will emitted.

* `$R.off (types, listener)` - The method removes single or multiple space or comma separated
  events listener that was previously registered;

* `$R.emit (type, data, target, preventCallback, stopCallback, completeCallback)` - Asynchronously
  calls each of the listeners registered for the event `type`, passing the supplied `data` and
  `target` to each.
  Also emmiter can handle calling of `preventDefault()`, `stopPropagation()` and
  complete of execution process;



[image.1]: http://image.prntscr.com/image/b97b2b928a8c46e9a2ec91297a0d815d.png
[image.2]: http://image.prntscr.com/image/36f21e387b464d1dbe5a5947c85bd9c4.png
[image.3]: http://image.prntscr.com/image/f1234ff6a246416f938ec9c8e2344809.png

[cli]: #cli
[cli.example.sh]: https://github.com/w3core/RockJS/blob/master/cli.example.sh
[cli.example.bat]: https://github.com/w3core/RockJS/blob/master/cli.example.bat

[1]: https://secure.php.net/manual/en/features.commandline.usage.php

*to be continued...*