/**
 * Module script __NAME__
 *
 * All properties that will provided by module are optional!!!
 *
 * COM structure
 * -------------------
 *
 * The list of available properties that can be processed by system:
 * @property html {string|boolean} COM HTML markup that can be showed straight
 *                         away. Can be preprocessed by constructor if it needed.
 *                         The "index.html" file will be loaded by system if this
 *                         property will defined as (boolean) true.
 * @property css {string|boolean} COM CSS styles that can be showed straight
 *                        away. Can be preprocessed by constructor if it needed.
 *                        The "style.css" file will be loaded by system if this
 *                        property will defined as (boolean) true
 * @property node {string} The coma-separated names of CSS classes 
 *                          (without dot), that is presented in HTML as single 
 *                          elements and should be presented to $O.node object 
 *                          as named properties of DOM nodes
 * @property onCreate {function} The method that will be executed when module
 *                                instance will created
 * @property onRequest {function} The method for some exclusive requests, such
 *                                 as COM->COM or system->COM
 * @property onShow {function} The method that will be executed when the page
 *                              that contains this COM will be shown
 * @property onHide {function} The method that will be executed when the page
 *                              that contains this COM will be hided
 *
 * @param $R {object} System namespace
 * @param $O {object} COM instance options:
 *                     DOM {node} The COM instance DOM sandbox
 *                     node {object} The object of named DOM nodes. See @property node
 *                     id {string|null} The COM instance ID
 *                     name {string} The COM name
 *                     options {object} The COM instance options
 *                     spin {spinner} The COM spinner object
 *                     stylesheet {style} The COM stylesheet node
 *                     type {string} The COM type (module/layout/etc.)
 *                     isReady {function} Returns (boolean) COM current ready state
 *                     isVisible {function} Returns (boolean) COM current visibility state
 *                     extractNodes (dom, str) {function} Returns (object) DOM nodes
 *                          @param dom {node} The DOM node that contains nodes which are
 *                                             listed in @param str
 *                          @param str {string} The coma-separated names of CSS classes
 *                                               (without dot), that is presented in @param dom 
 *                                               as single elements
 *
 * @returns {COM __NAME__}
 */
function __NAME__ ($R, $O)
 {
  this.html = String(/*[include src="index.html" format="STRING"]*/);
  this.css = String(/*[include src="style.css" format="STRING"]*/);
  //this.node = 'wait,error,empty,data,list,item';
 }