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

![RockJS Size](http://image.prntscr.com/image/b97b2b928a8c46e9a2ec91297a0d815d.png)

Let's check loading speed for minimal application.
Connection speed will be decreased to regular 2G (300ms, 250kbit/s, 50kbit/s)
to simulate real-world conditions for mobile devices.

![RockJS speed](http://image.prntscr.com/image/36f21e387b464d1dbe5a5947c85bd9c4.png)

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
![RockJS Structure](http://image.prntscr.com/image/f1234ff6a246416f938ec9c8e2344809.png)
