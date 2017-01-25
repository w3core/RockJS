# RockJS

The next generation single-page application framework.

## Table of contents
 - [Introduction](#introduction)
 - [Lineaments](#lineaments)
 - [Requirements](#requirements)
 - [Installation](#installation)
 - [Quick Start Guide](#quick-start-guide)
    - [CLI](#cli)
    - [Hello World!](#hello-world)
 - [Events system](#events-system)
    - [Event body](#event-body)
    - [Event prefix](#event-prefix)
    - [Event methods](#event-methods)
    - [Usage example](#usage-example)
 - [Module](#module)
    - [$O object structure](#o-object-structure)
 - [Module manager](#module-manager)
    - [$R.module.make(id, name, options, callback)](#rmodulemakeid-name-options-callback)
       - [Component instance structure](#component-instance-structure)
    - [$R.module.getById (id)](#rmodulegetbyid-id)
    - [$R.module.getInstanceById (id, name, options, callback)](#rmodulegetinstancebyid-id-name-options-callback)
    - [$R.module.getByName (name)](#rmodulegetbyname-name)
    - [$R.module.all ()](#rmoduleall)
    - [$R.module.group()](#rmodulegroup)
       - [$R.module.group().push (module, DOMNode)](#rmodulegrouppush-module-domnode)
       - [$R.module.group().eject(module)](#rmodulegroupejectmodule)
       - [$R.module.group().show (options)](#rmodulegroupshow-options)
       - [$R.module.group().hide (options)](#rmodulegrouphide-options)
       - [$R.module.group().request (options)](#rmodulegrouprequest-options)
 - [Layout](#layout)
 - [Page](#page)
    - [$R.page.make(name)](#rpagemakename)
       - [Page constructor structure](#page-constructor-structure)
       - [Page instance structure](#page-instance-structure)
    - [$R.page.all()](#rpageall)
    - [$R.page.define(name)](#rpagedefinename)
    - [$R.page.defined()](#rpagedefined)
    - [$R.page.get(name)](#rpagegetname)
    - [$R.page.url(name, options)](#rpageurlname-options)
 - [Routing](#routing)
    - [Route as a string](#route-as-a-string)
       - [Named segments](#named-segments)
       - [Optional segments](#optional-segments)
       - [Wildcards](#wildcards)
    - [Route as a regular expression](#route-as-a-regular-expression)
 - [Content delivery](#content-delivery)
 - [Embedding](#embedding)
 - [Templating and Precaching](#templating-and-precaching)
 - [System Events](#system-events)
 - [Bootstrap and loading progress](#bootstrap-and-loading-progress)
 - [Logging and Mobile debugging](#logging-and-mobile-debugging)


## Introduction

You can skip out this framework if you need some solution to create simple and
tiny business card site.

RockJS is a minimalistic, high-performance and intuitive SPA framework that allows
to create a powerful Desktop, Android or iOS native-like applications with a big
amount of UI components.

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


## Lineaments

RockJS never re-rendering no one component instance if it's not required.

Any resources of components such as DOM and stylesheets will be mounted to the
document only when component is defined in the page layout and the page is shown.
Otherwise, these resources will be unmounted from document when page will be hided.

RockJS allows to create manually and use single instance of component for many
pages at the same time.

RockJS is an event based framework that means that any component will be notified
about any changes of state and can handle these changes any time.


## Requirements

The only thing that you need is PHP command line interface which used for
application build process (see: [here][1]).


## Installation

Clone or download sources to something like `rockjs` directory.
This directory will be used for the building of all your projects.

Also, for best usability you can define value of
`/path/to/your/rockjs/cli` into the system `PATH` environment.


## Quick Start Guide

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


## Events system

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

### Usage example
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


## Module

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

Usually, most of your modules will contain UI components.
To define UI of module you can use the following properties:

* `{String | Boolean} this.html`- this property allows to define HTML markup of module.

* `{String | Boolean} this.css` - this property allows to define CSS stylesheets of module.

* `{String | Object} this.node` - this property helps you to select DOM nodes to the `$O.node`
  object for working with them.

A `this.html` and `this.css` properties can be defined by the following ways:

* As inline string. So, you can put as string some HTML strings or CSS properties;

* As Embedded content (more preffered way) by using special embedding tag `include`
  that provided by RockJS (see [here](#embedding)).

  For example:
  ```javascript
  this.html = String(/*[include src="index.html" format="STRING"]*/);
  this.css = String(/*[include src="style.css" format="STRING"]*/);
  ```

* As a `boolean` sign that means that `this.html`/`this.css` files should be loaded by
  RockJS from the `index.html`/`style.css` file that placed in the module directory.
  This way is less preffered, because requires to create an additional HTTP requests
  that increase loading time.

<a name="this-node"></a>
A `this.node` property allows to predefine any amount of DOM nodes from the module DOM
that helps working with them for a long time. This property can be defined by different ways:

* As `object` that should provide properties with a property name as an internal reference
  name and property value as a reference CSS selector in the module DOM.
  Also, you can define the property value as boolean `true`, that means that internal reference
  name it the same as element className.

  For example:
  ```javascript
  this.node = {
    "userName": ".user > input.name",
    "userForm": true // that means ".userForm"
  };
  ```

* As a special-formatted string that has similar to `object` way format.

  For example:
  ```javascript
  this.node = "userName: .user > input.name; userForm";
  ```
All predefined nodes will be available in the `$O.node` object at once when
the module will be created.

It will be something like that:
```javascript
// $O.node
{
  "userName": [DOM node],
  "userForm": [DOM node]
}
```

To handling the global environment changes a component can define the following
methods:

* `this.onRequest (options)` - This method can be used to communicate between components
  even when component instance was not created yet;

* `this.onCreate (options)` - This method will be called once when component instance
  has been created and environment of component `$O` is completely ready;

* `this.onShow (options, page)` - This method will be called every time when component
  instance should be shown;

* `this.onHide (options, page)` - This method will be called every time when component
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

### `$O` object structure

* `DOM {node}` Sandboxed DOM node of component instance;

* `node {object}` The object of named DOM nodes (see [details](#this-node));

* `id {string|null}` An unique identifier of component instance (see [details](#module-manager));

* `name {string}` The name of the component for which one was created instance (see [details](#module-manager));

* `options {object}` An object of instance options;

* `template (id[, DOM]) {function}` This function allows to extract template body by `id` of template and
  as an optional `DOM` node where it placed. By default, initially it tries to get template from the
  component DOM and then from the current `document.body` node.

  Template definition format: `<script type="text/template" id="{id}"> {template} </script>`

* `spin {spinner}` Own instance of spinner for the current instance of component;

* `stylesheet {style}` A DOM node of stylesheet for the current instance of component;

* `type {string}` A type of component (module/layout/etc.);

* `isReady {function}` This function allows to check is ready an instance of component or not at the moment;

* `isVisible {function}` This function allows to check is visible an instance of component or not at the moment;

* `extractNodes (dom, def) {function}` This function allows to create a reference object between module
  DOM nodes and them reference property names.

  * `dom {node}` The DOM node that contains nodes which are listed in `def`

  * `def {string|object}` Reference definition


## Module manager

To manipulate with modules inside an application (for example: getting a class or
instance of module, embed one module or group of modules to another one, etc.)
can be useful Module Manager `$R.module` that provides following features.

### $R.module.make(id, name, options, callback)
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

**For example:**
```javascript

var articleModule = $R.module.make(null, "article", {id: 12345}, function (article){
  console.log(article);
  // You can call any internal method of the module
  article.instance.anyInternalMethod();
});
```

#### Component instance structure

The component (layouts and modules) instance provides the following properties and methods.

| Name                        | Type     | Description
|-----------------------------|----------|-------------
| `ready(callback)`           | Function | Allows to define function to call if/when component instance will be completely ready.
| `show(options,page)`        | Function | Allows to show component instance even if instance is not ready yet. As optional arguments, it can take `options` object for showing and instance of `page`.
| `hide(options,page)`        | Function | Allows to hide component instance even if instance is not ready yet. As optional arguments, it can take `options` object for hiding and instance of `page`.
| `request(options,callback)` | Function | This method can be used to communicate between components even if component instance is not ready yet. As optional arguments, it can take `options` object and `callback` function.
| `isReady()`                 | Function | Returns a boolean to understand that instance of component is ready for showing (loaded and created) either not. Anyway an instance can be shown but it leads to showing of internal spinner of instance.
| `isVisible()`               | Function | Returns a boolean to understand that instance of component is visible at the moment either not.
| `instance`                  | Object   | An internal environment (methods and properties) of instance.
| `options`                   | Object   | An options of the component (see [$O](#o-object-structure)).

### $R.module.getById (id)
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

### $R.module.getInstanceById (id, name, options, callback)
Same as `$R.module.getById (id)` excluding the fact that the instance of the
module will be created if not exists yet.

### $R.module.getByName (name)
Returns an array of all instances of module by name that already exists.

### $R.module.all ()
Returns an array of all instances of modules that has created in application
at the moment.

The structure of instance of module you can find [here](#component-instance-structure).

### $R.module.group()
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

*Usage example:*

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


## Layout

Page layout is the part of graphic design that deals in the arrangement of visual elements
on a page. It generally involves organizational principles of composition to achieve specific
communication objectives.
The high-level page layout involves deciding on the overall arrangement of text and images,
and possibly on the size or shape of the medium.

Page layout might be described a greater or lesser degree as a page style which might be
implemented in a specific template.

Typical page layout decisions include:

* Generic font family and size
* Generic size of margins and paddings
* Generic colors
* Size and position of main areas such as header, body, footer and side pannels
* Some specific UI blocks, that can be used by different components, etc.

In terms of implementation, the layouts practically is same as modules because they
are both a components, but with different mission.

Basically, the most of your layout/s will not provides any javascript logic excluding
`this.html` and `this.css` definition and it's fine.

Feel free to describe some of extra-features by using javascript if you need.
It's a normally too.

An example of typical layout will be something like that.

`script.js`

```javascript
function layout_default ($R, $O) {
  this.html = String(/*[include src="index.html" format="STRING"]*/);
  this.css = String(/*[include src="style.css" format="STRING"]*/);
}
```

`index.html`

```xml
<header class="headerModulesArea"></header>
<content class="contentModulesArea"></content>
<!-- ... -->
<footer class="footerModulesArea"></footer>
```

`style.css`

```css
html, body {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: sans-serif;
  font-size: 16px;
}
header {
  z-index: 2;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 5em;
  background: rgba(0,0,0,.8);
  color: #fff;
}
content {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 5em 1em 3em;
}
footer {
  z-index: 2;
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3em;
  background: rgba(0,0,0,.8);
  color: #fff;
}
```


## Page

A page is a completely abstraction that composed by the layout and any amount of modules.
All these modules, except of background workers, should be placed into landing areas of
the layout. It should be described on the page level of abstraction for any individual page.
Any layout should provide one or more amount of landing areas that can be identified by
an unique className.

Different pages can contain both individually and as shared instance of module.
In this case the instance of module will be moved to the page which is showing at the moment.

To manage pages of SPA site, RockJS provides pages manager that named as `$R.page` and has
the following methods.

### $R.page.make(name)
This method returns a page constructor that allows completely describe (title,
layout, modules, routing, etc.) and immediately create a page.

> The `name` of page should be unique within the application.

#### Page constructor structure
All methods of the page constructor instance excluding `get()` and `exec()`
returns reference to this instance.

| Method                                             | Description
|----------------------------------------------------|------------
| name(name)                                         | Allows to define page name. The `name` of page should be unique within the application.
| title(title)                                       | Allows to define page title.
| options(options)                                   | Allows to define an options object that should be applied to create the page.
| route(route[,map])                                 | Allows to define page route (see [here](#routing)).
| layout(id,name,options,callback)                   | Allows to define custom layout that will be applied to the page. By default, will be used the default layout (`$R.config.generic.layout.default.name`) that can be configured in the `your/project/js/config.js` file.
| module(location,position,id,name,options,callback) | Creates and puts new instance of module to the page. For the module to be visible on the page should be defined an existing `location` (landing area - an unique className of HTML element) in the page layout and `position` (which one is order number in `location`). Rest of arguments has been described [here](#module-manager).
| module(location,position,instance)                 | Puts an existing `instance` of module to the page.
| get()                                              | Returns a definition object at the moment.
| exec()                                             | Creates and puts just created [instance](#page-instance-structure) of page in the pages collection.

*Usage example:*

```javascript
$R.page
  .make("user")
  .title("User Profile")
  .route("/user/:userId")
  .layout(null, "customLayout")
  .module("header", null, null, "profileMenu")
  .module("content", null, null, "userNavigation")
  .module("content", null, null, "userNotifications")
  .module("content", null, null, "userEditForm")
  .module("footer", null, null, "footerLinks")
  .options({"userId": 12345})
  .exec()
;
```

#### Page instance structure

The page instance provides the following properties and methods.

| Name            | Description
|-----------------|-------------
| isReady()       | Returns a boolean to understand that page is ready for showing (layout and modules has been loaded and created) either not. Anyway page can be shown but it leads to showing of page loading progress.
| isVisible()     | Returns a boolean to understand that page is visible at the moment either not.
| ready(callback) | Allows to define `callback` function to call if/when page instance will be completely ready.
| show(options)   | Allows to show page instance even if instance is not ready yet. As optional arguments, it can take `options` object for showing.
| hide(options)   | Allows to hide page instance even if instance is not ready yet. As optional arguments, it can take `options` object for hiding.
| title(title)    | Allows to change the `title` of the page instance.
| url(options)    | Returns URL string to the current page by an optional `options` object. The `options` that figured out in the page route will be placed there. Rest of `options` will be transformed to the query string.
| layout          | An instance of [layout](#component-instance-structure) that was defined for the page.
| module          | An array of instances of modules that has been placed to the page at the moment.
| options         | An object that contains the latest options that was applied to the page to `create`, `show` and `hide` an instance.
| route           | Low-level instance of route.

*Usage example:*

```javascript
$R.page
  .get("user")                 // Get instance of an existing page
  .title("Adam Smith Profile") // Set page title
  .show({                      // Show page instance with params
    "id": 12345
  })
;
```

### $R.page.all()
Returns an object of all instances of pages that has created in application
at the moment. The name of property in this object is an unique name of page.

An instance of page has structure that was [described earlier](#page-instance-structure).

### $R.page.define(name)
This is page constructor that is more prefered for usage than `$R.page.make`,
because it allows to define any amount of pages without of creation.
The pages will be automatically created only when will be required.
It allows to increase of loading speed.
This page constructor has the same structure that you can find [here](#page-constructor-structure).

### $R.page.defined()
Returns an object of all definitions of pages which was defined in application
at the moment. The name of property in this object is an unique name of page.

### $R.page.get(name)
Returns an instance of page by optional `name` parameter that was created earlier.
By default, returns an instance of current visible page.

### $R.page.url(name, options)
Returns a string representation of URL to any page by the page `name` and
optional `options` parameters.


## Routing

By default, all pages that was defined has own route that based on the page name.
But practically, you can overload it for make a pretty semantic URL considering
to one or more specific parameters.

Page routing can be described by two different ways.
For most of cases you can define route as a string with named segments.
But in some cases it can be not enough. Then route can be defined as regular expression.

### Route as a string

Definition of route as a string provides the following features.

```javascript
"/user/:id(/post/:postId(/*))"
```

#### Named segments

`:id` (in the example above) is a named segment.

A named segment starts with `:` followed by the name.
The name must be at least one character in the regex character set `a-zA-Z0-9`.
When matching, a named segment consumes all characters in the regex character set
`a-zA-Z0-9-_~ %`. A named segment match stops at `/`, `.` but not at `_`, `-`, `%`.
If a named segment name occurs more than once in the pattern string, then the multiple
results are stored in an array on the returned object.

#### Optional segments

`(/post/:postId(/*))` (in the example above) is an optional segment.

To make part of a pattern optional just wrap it in `(` and `)`.
Optional named segments are stored in the corresponding property only if they are present
in the source string.

#### Wildcards

`*` (in the example above) is a wildcard matches.
Wildcard matches will be collected to the `_` property.
If there is only one wildcard then `_` contains the matching string. Otherwise `_` contains
an array of matching strings.

### Route as a regular expression

If the pattern was created from a regex an array of the captured groups is returned on a match.
When making a pattern from a regex you can pass an array of keys as the second argument.
For this case will be returned an objects on match with each key mapped to a captured value.

```javascript
route(/^\/api\/([^\/]+)(?:\/(\d+))?$/, ["resource", "id"])

// For "/api/users" returns {resource: "users"}
// For "/api/users/5" returns {resource: "users", id: "5"}
// For "/api/users/foo" returns null because "id" should be "\d+"
```

## Content delivery
*TBD*

## Embedding
*TBD*

## Templating and Precaching
*TBD*

## System Events
*TBD*

## Bootstrap and loading progress
*TBD*

## Logging and Mobile debugging
*TBD*



[image.1]: http://image.prntscr.com/image/b97b2b928a8c46e9a2ec91297a0d815d.png
[image.2]: http://image.prntscr.com/image/36f21e387b464d1dbe5a5947c85bd9c4.png
[image.3]: http://image.prntscr.com/image/f1234ff6a246416f938ec9c8e2344809.png

[cli.example.sh]: https://github.com/w3core/RockJS/blob/master/cli.example.sh
[cli.example.bat]: https://github.com/w3core/RockJS/blob/master/cli.example.bat

[1]: https://secure.php.net/manual/en/features.commandline.usage.php

*to be continued...*
