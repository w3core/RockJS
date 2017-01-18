# RockJS

The next generation single-page application framework.

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
   ```
   $ php rockjs/cli
   ```
   or:
   ```
   $ php rockjs/cli -h
   ```
   or:
   ```
   $ php rockjs/cli --help
   ```
   Returns something like that:
   <a name="cli"></a>
   ```
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

   ```
   $ php rockjs/cli app <path>
   ```

3. Create new layout in the <path> directory otherwise current directory if not defined.
   > By default, you should create layouts in the `your/app/layouts` directory.
   > Note that layout name will be same as his directory name.

   ```
   $ php rockjs/cli layout <path>
   ```

4. Create new module in the <path> directory otherwise current directory if not defined.
   > By default, you should create modules in the `your/app/modules` directory.
   > Note that module name will be same as his directory name.

   ```
   $ php rockjs/cli module <path>
   ```


5. Deploy an application (see detals [here][cli]).

   ```
   $ php rockjs/cli deploy <option> <value>
   ```


[image.1]: http://image.prntscr.com/image/b97b2b928a8c46e9a2ec91297a0d815d.png
[image.2]: http://image.prntscr.com/image/36f21e387b464d1dbe5a5947c85bd9c4.png
[image.3]: http://image.prntscr.com/image/f1234ff6a246416f938ec9c8e2344809.png

[cli]: #cli

[1]: https://secure.php.net/manual/en/features.commandline.usage.php

*to be continued...*